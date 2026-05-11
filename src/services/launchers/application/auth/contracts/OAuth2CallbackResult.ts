export interface OAuth2CallbackResult {
  success: boolean;
  redirectUrl?: string;
  message?: string;
  error?: string;
}