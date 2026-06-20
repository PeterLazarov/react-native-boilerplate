import Constants from 'expo-constants';
import ky, { type KyInstance } from 'ky';
import { tokenStorage } from '@/auth/tokenStorage';

const prefixUrl =
  (Constants.expoConfig?.extra?.apiBaseUrl as string | undefined) ??
  'http://localhost:4000';

// Raw client with no interceptors — used to refresh tokens without recursing
// through the auth retry logic below.
const raw = ky.create({ prefixUrl });

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (!refreshToken) return null;
  try {
    const res = await raw
      .post('auth/refresh', { json: { refreshToken } })
      .json<{ accessToken: string; refreshToken: string }>();
    await tokenStorage.setTokens(res.accessToken, res.refreshToken);
    return res.accessToken;
  } catch {
    await tokenStorage.clear();
    return null;
  }
}

/**
 * Shared HTTP client. Attaches the bearer token, and on a 401 transparently
 * refreshes once and retries. Repositories receive this instance — they never
 * construct their own.
 */
export const http: KyInstance = ky.create({
  prefixUrl,
  retry: 0, // we own the refresh-and-retry logic explicitly
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await tokenStorage.getAccessToken();
        if (token) request.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status !== 401) return response;
        const newToken = await refreshAccessToken();
        if (!newToken) return response; // give up; caller/AuthContext handles sign-out
        request.headers.set('Authorization', `Bearer ${newToken}`);
        return raw(request);
      },
    ],
  },
});

export type Http = KyInstance;
