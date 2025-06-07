import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serial, setSerial] = useState('');

  const handleRegister = async () => {
    // Dummy backend URL
    const url = 'http://213.14.135.179:11111/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, serial }),
      });
      if (response.ok) {
        Alert.alert('Başarılı', 'Kayıt başarılı! Giriş yapabilirsiniz.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Hata', 'Kayıt başarısız.');
      }
    } catch (e) {
      Alert.alert('Hata', 'Bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput style={styles.input} placeholder="Ad Soyad" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Cihaz Seri Numarası" value={serial} onChangeText={setSerial} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Zaten hesabın var mı?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#2c3e50' },
  input: { width: '80%', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#27ae60', padding: 15, borderRadius: 8, width: '80%', alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { marginTop: 10 },
  linkText: { color: '#27ae60', fontSize: 15 },
});
