import AsyncStorage from '@react-native-async-storage/async-storage';

export const XStatePersist = {
  async persistState<T extends Record<string, any>>(value: T, key: string) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async getStateForHydration<T extends Record<string, any>>(
    key: string,
    defaultValue: T,
  ) {
    const storageData = await AsyncStorage.getItem(key);
    if (!storageData) {
      return defaultValue;
    }
    return JSON.parse(storageData) as T;
  },
};
