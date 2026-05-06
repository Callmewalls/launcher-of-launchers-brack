export class Logger {
  static log(message: string, data?: any) {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`, data || '');
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
  }

  static info(message: string, data?: any) {
    console.info(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
  }
}
