import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Landing3({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/molecule.png')} style={styles.image} />
      <Text style={styles.title}>Kolay Kurulum ve Kullanım</Text>
      <Text style={styles.subtitle}>SmartPod'u kolayca kurun, cihazınızı ekleyin ve hemen kullanmaya başlayın!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Zaten Hesabın Var mı?</Text>
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
