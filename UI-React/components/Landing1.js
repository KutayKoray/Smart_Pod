import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Landing1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>SmartPod'a Hoşgeldiniz!</Text>
      <Text style={styles.subtitle}>Bitkileriniz için akıllı takip ve bakım çözümleri burada.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Landing2')}>
        <Text style={styles.buttonText}>Devam Et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f9f4' },
  logo: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  subtitle: { fontSize: 16, color: '#34495e', marginBottom: 30, textAlign: 'center', paddingHorizontal: 30 },
  button: { backgroundColor: '#27ae60', padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { marginTop: 10 },
  linkText: { color: '#27ae60', fontSize: 15 },
});
