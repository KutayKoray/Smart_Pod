import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveUserSession, savePotSession } from '../../utils/session';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const url = 'http://213.14.135.179:11111/login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const profileRes = await fetch('http://213.14.135.179:11111/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (profileRes.ok) {
          const userProfile = await profileRes.json();
          await saveUserSession(userProfile);
          navigation.replace('MainTabs');
        } else {
          Alert.alert('Hata', 'Profil bilgileri alınamadı.');
        }
      } else {
        Alert.alert('Hata', 'Giriş başarısız.');
      }
    } catch (e) {
      Alert.alert('Hata', 'Bir hata oluştu.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
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
