import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Landing2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/idea.png')} style={styles.image} />
      <Text style={styles.title}>Bitkilerinizi Akıllı Takip Edin</Text>
      <Text style={styles.subtitle}>Nem, sıcaklık ve toprak verimliliğini anlık takip ederek bitkilerinize en iyi bakımı sağlayın.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Landing3')}>
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f9f4' },
  image: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  subtitle: { fontSize: 16, color: '#34495e', marginBottom: 30, textAlign: 'center', paddingHorizontal: 30 },
  button: { backgroundColor: '#27ae60', padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { marginTop: 10 },
  linkText: { color: '#27ae60', fontSize: 15 },
});
