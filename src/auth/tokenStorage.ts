import * as SecureStore from 'expo-secure-store';

// Tokens live in the encrypted keychain/keystore, never in plain KV.
const ACCESS = 'auth.accessToken';
const REFRESH = 'auth.refreshToken';

export const tokenStorage = {
  getAccessToken: () => SecureStore.getItemAsync(ACCESS),
  getRefreshToken: () => SecureStore.getItemAsync(REFRESH),
  async setTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync(ACCESS, accessToken);
    await SecureStore.setItemAsync(REFRESH, refreshToken);
  },
  async clear() {
    await SecureStore.deleteItemAsync(ACCESS);
    await SecureStore.deleteItemAsync(REFRESH);
  },
};
