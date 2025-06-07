import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Header from "../components/Header";
import { colors } from "./styles/BottomTabNavigatorStyles";

import { useNavigation } from '@react-navigation/native';

import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserSession, getPotSession, savePotSession } from '../utils/session';

const AyarlarScreen = () => {
  const navigation = useNavigation();
  // State'ler
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [potName, setPotName] = useState("");
  const [potLocation, setPotLocation] = useState("");
  const [plantType, setPlantType] = useState("");

  // Düzenleme Modal state'leri ve geçici inputlar
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [potModalVisible, setPotModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPotName, setTempPotName] = useState(potName);
  const [tempPotLocation, setTempPotLocation] = useState(potLocation);
  const [tempPlantType, setTempPlantType] = useState(plantType);
  const [notifWater, setNotifWater] = useState(true);
  const [notifTemp, setNotifTemp] = useState(false);
  const [notifHumidity, setNotifHumidity] = useState(true);
  const [notifLight, setNotifLight] = useState(false);

  const [deviceConnected, setDeviceConnected] = useState(true);

  // Placeholder fonksiyonlar
  const handleLogout = () => {
    // Oturum bilgileri tutuluyorsa burada temizlenebilir
    navigation.reset({
      index: 0,
      routes: [{ name: 'Landing1' }],
    });
  };
  const handlePairDevice = () => Alert.alert("Cihaz Eşleştir", "Cihaz eşleştirildi!");
  const handleEditProfile = () => {
    setTempName(name);
    setTempEmail(email);
    setProfileModalVisible(true);
  };

  const handleEditPot = () => {
    setTempPotName(potName);
    setTempPotLocation(potLocation);
    setTempPlantType(plantType);
    setPotModalVisible(true);
  };

  const handleSaveProfile = () => {
    setName(tempName);
    setEmail(tempEmail);
    setProfileModalVisible(false);
  };
  const handleSavePot = async () => {
    setPotName(tempPotName);
    setPotLocation(tempPotLocation);
    setPlantType(tempPlantType);
    setPotModalVisible(false);
    await savePotSession({ potName: tempPotName, potLocation: tempPotLocation, plantType: tempPlantType });
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const user = await getUserSession();
        if (user) {
          setName(user.name || "");
          setEmail(user.email || "");
        }
        const pot = await getPotSession();
        if (pot) {
          setPotName(pot.potName || "");
          setPotLocation(pot.potLocation || "");
          setPlantType(pot.plantType || "");
        }
      };
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Ayarlar" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profil Bilgileri */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
          <Text style={styles.infoText}>Ad: {name}</Text>
          <Text style={styles.infoText}>E-posta: {email}</Text>
        </View>
        {/* Saksı Bilgileri */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Saksı Bilgileri</Text>
          <Text style={styles.infoText}>Saksı Adı: {potName}</Text>
          <Text style={styles.infoText}>Konum: {potLocation}</Text>
          <Text style={styles.infoText}>Bitki Türü: {plantType}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPot}>
            <Text style={styles.editButtonText}>Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* Profil Düzenle Modal */}
        <Modal visible={profileModalVisible} animationType="slide" transparent onRequestClose={()=>setProfileModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profil Bilgilerini Düzenle</Text>
              <TextInput
                style={styles.input}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Ad"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="E-posta"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={()=>setProfileModalVisible(false)}>
                  <Text style={styles.modalCancelText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveProfile}>
                  <Text style={styles.modalSaveText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Saksı Düzenle Modal */}
        <Modal visible={potModalVisible} animationType="slide" transparent onRequestClose={()=>setPotModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Saksı Bilgilerini Düzenle</Text>
              <TextInput
                style={styles.input}
                value={tempPotName}
                onChangeText={setTempPotName}
                placeholder="Saksı Adı"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                value={tempPotLocation}
                onChangeText={setTempPotLocation}
                placeholder="Konum"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.input}
                value={tempPlantType}
                onChangeText={setTempPlantType}
                placeholder="Bitki Türü"
                placeholderTextColor="#aaa"
              />
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.modalCancelButton} onPress={()=>setPotModalVisible(false)}>
                  <Text style={styles.modalCancelText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveButton} onPress={handleSavePot}>
                  <Text style={styles.modalSaveText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Bildirim Ayarları */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          <View style={styles.rowBetween}><Text style={styles.infoText}>Sulama Bildirimi</Text><Switch value={notifWater} onValueChange={setNotifWater} /></View>
          <View style={styles.rowBetween}><Text style={styles.infoText}>Sıcaklık Bildirimi</Text><Switch value={notifTemp} onValueChange={setNotifTemp} /></View>
          <View style={styles.rowBetween}><Text style={styles.infoText}>Nem Bildirimi</Text><Switch value={notifHumidity} onValueChange={setNotifHumidity} /></View>
          <View style={styles.rowBetween}><Text style={styles.infoText}>Işık Bildirimi</Text><Switch value={notifLight} onValueChange={setNotifLight} /></View>
        </View>

        {/* Cihaz Bağlantısı */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cihaz Bağlantısı</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.infoText}>Durum: {deviceConnected ? "Bağlı" : "Bağlı Değil"}</Text>
            <TouchableOpacity style={styles.pairButton} onPress={handlePairDevice}>
              <Text style={styles.pairButtonText}>{deviceConnected ? "Yeniden Bağlan" : "Eşleştir"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Hakkında ve Çıkış */}
        <View style={[styles.sectionContainer, {marginBottom: 48}]}> 
          <TouchableOpacity style={styles.aboutButton} onPress={() => Alert.alert("Hakkında", "Akıllı Saksı Uygulaması v1.0\n© 2025 Kutay Koray") }>
            <Text style={styles.aboutButtonText}>Hakkında</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.secondaryBackground,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C5E1A",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  pairButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  pairButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  aboutButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  aboutButtonText: {
    color: "#2C5E1A",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2C5E1A',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
    backgroundColor: '#f9f9f9',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  modalCancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 10,
  },
  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalSaveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  modalSaveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AyarlarScreen;
