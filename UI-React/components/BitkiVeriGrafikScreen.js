import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Header from './Header';

const chartColors = [
  '#FF6384', // sıcaklık
  '#36A2EB', // toprak nem
  '#FFCE56', // co2
  '#4BC0C0', // ışık
  '#9966FF', // nem
];

const chartLabels = {
  sicaklik: 'Sıcaklık (°C)',
  toprakNem: 'Toprak Nem (%)',
  co2: 'CO₂ (ppm)',
  isik: 'Işık (lux)',
  nem: 'Hava Nem (%)',
};

const veriKeys = ['sicaklik', 'toprakNem', 'co2', 'isik', 'nem'];

export default function BitkiVeriGrafikScreen({ route }) {
  const [veri, setVeri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { getPotSession } = await import('../utils/session');
        const pot = await getPotSession();
        const device_id = pot?.device_id;
        const response = await fetch('http://213.14.135.179:11111/plant-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ device_id }),
        });
        if (!response.ok) throw new Error('Veriler alınamadı.');
        const json = await response.json();
        setVeri(json);
        setLoading(false);
      } catch (e) {
        setError('Veriler alınamadı.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}><ActivityIndicator size="large" color="#4CAF50" /><Text>Veriler yükleniyor...</Text></View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}><Text>{error}</Text></View>
    );
  }

  // Veri kontrolü: diziler boşsa veya eksikse gösterme
  const isDataAvailable = veri && veri.saatler && veri.saatler.length > 0 && veriKeys.every(key => Array.isArray(veri[key]) && veri[key].length > 0);
  if (!isDataAvailable) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f8f3' }}>
        <Header title="Bitkinizin Son 1 Günkü Verileri" />
        <View style={styles.centered}><Text>Veri bulunamadı.</Text></View>
      </SafeAreaView>
    );
  }

  // Tüm veri dizilerini sayıya çevir, sayı olmayanları 0 yap
  const cleanData = {};
  veriKeys.forEach(key => {
    cleanData[key] = veri[key].map(v => {
      const n = Number(v);
      return isFinite(n) ? n : 0;
    });
  });
  const cleanSaatler = veri.saatler.map((s, i) => i % 3 === 0 ? s : '');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f8f3' }}>
      <Header title="Bitkinizin Son 1 Günkü Verileri" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {veriKeys.map((key, idx) => {
          let yMin = 0, yMax = 100;
          if (key === 'sicaklik') {
            const minVal = Math.min(...cleanData[key]);
            const maxVal = Math.max(...cleanData[key]);
            const range = maxVal - minVal;
            yMin = Math.floor(minVal - range * 0.1);
            yMax = Math.ceil(maxVal + range * 0.1);
            // Güvenlik: negatif sıcaklık olmasın
            if (yMin < 0) yMin = 0;
          }
          return (
            <View key={key} style={styles.chartContainer}>
              <Text style={styles.chartTitle}>{chartLabels[key]}</Text>
              <LineChart
                data={{
                  labels: cleanSaatler,
                  datasets: [
                    {
                      data: cleanData[key],
                      color: () => chartColors[idx],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 48}
                height={220}
                yAxisSuffix={key === 'sicaklik' ? '°C' : '%'}
                yAxisInterval={1}
                yAxisMin={yMin}
                yAxisMax={yMax}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 1,
                  color: (opacity = 1) => chartColors[idx],
                  labelColor: () => '#222',
                  propsForDots: {
                    r: '3',
                    strokeWidth: '2',
                    stroke: chartColors[idx],
                  },
                  propsForLabels: {
                    fontSize: 11,
                    fontWeight: 'bold',
                  },
                }}
                bezier
                style={styles.chart}
                verticalLabelRotation={0}
                fromZero={false}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    padding: 12,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C5E1A',
  },
  chart: {
    borderRadius: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f8f3',
  },
});
