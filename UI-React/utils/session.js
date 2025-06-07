import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserSession = async (user) => {
  try {
    await AsyncStorage.setItem('userProfile', JSON.stringify(user));
  } catch (e) {
    // Hata yönetimi
  }
};

export const getUserSession = async () => {
  try {
    const user = await AsyncStorage.getItem('userProfile');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const removeUserSession = async () => {
  try {
    await AsyncStorage.removeItem('userProfile');
  } catch (e) {}
};

export const savePotSession = async (pot) => {
  try {
    await AsyncStorage.setItem('potInfo', JSON.stringify(pot));
  } catch (e) {}
}; // pot: { potName, potLocation, plantType }

export const getPotSession = async () => {
  try {
    const pot = await AsyncStorage.getItem('potInfo');
    return pot ? JSON.parse(pot) : { potName: '', potLocation: '', plantType: '' };
  } catch (e) {
    return { potName: '', potLocation: '', plantType: '' };
  }
};
