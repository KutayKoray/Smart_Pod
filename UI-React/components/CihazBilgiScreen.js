import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { colors } from "./styles/BottomTabNavigatorStyles";
import { Ionicons } from '@expo/vector-icons';

const CihazBilgiScreen = () => {
  // Mock cihaz bilgileri (gerçek entegrasyon ileride yapılabilir)
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(76); // yüzde
  const [wifiName, setWifiName] = useState("SmartPod_WIFI");
  const [ipAddress, setIpAddress] = useState("192.168.1.42");
  const [lastSeen, setLastSeen] = useState("2025-05-24 22:10:00");

  // Yenile fonksiyonu (şu an mock)
  const handleRefresh = () => {
    // Burada gerçek cihazdan veri çekme kodu olabilir
    setIsConnected(Math.random() > 0.2); // %80 bağlı, %20 değil
    setBatteryLevel(Math.floor(Math.random() * 100));
    setWifiName(["SmartPod_WIFI", "EvModem_2.4G", "OfisWifi"][Math.floor(Math.random()*3)]);
    setIpAddress(`192.168.1.${Math.floor(Math.random()*100+10)}`);
    setLastSeen(new Date().toLocaleString("tr-TR"));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Cihaz Bilgileri" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ESP32 Akıllı Saksı</Text>
          <View style={styles.infoRow}>
            <Ionicons name={isConnected ? "wifi" : "wifi-off"} size={28} color={isConnected ? "#4CAF50" : "#d9534f"} style={{marginRight: 10}} />
            <Text style={[styles.infoText, {color: isConnected ? "#4CAF50" : "#d9534f"}]}>Bağlantı: {isConnected ? "Bağlı" : "Bağlı Değil"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="battery-half" size={28} color="#2C5E1A" style={{marginRight: 10}} />
            <Text style={styles.infoText}>Batarya: %{batteryLevel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="wifi" size={24} color="#2C5E1A" style={{marginRight: 10}} />
            <Text style={styles.infoText}>WiFi: {wifiName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cloud-outline" size={24} color="#6a6a6a" style={{marginRight: 10}} />
            <Text style={styles.infoText}>IP: {ipAddress}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color="#6a6a6a" style={{marginRight: 10}} />
            <Text style={styles.infoText}>Son Bağlantı: {lastSeen}</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.refreshButtonText}>Yenile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
    padding: 20,
    paddingTop: 90,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C5E1A",
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 18,
  },
  refreshButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CihazBilgiScreen;
