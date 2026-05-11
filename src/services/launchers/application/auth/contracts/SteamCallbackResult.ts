export interface SteamCallbackResult {
  success: boolean;
  redirectUrl?: string;
  message?: string;
  error?: string;
}