const DESKTOP_RETURN_PROTOCOL = 'launcher-of-launchers:';

export function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isDesktopAppUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === DESKTOP_RETURN_PROTOCOL;
  } catch {
    return false;
  }
}

export function isAllowedReturnUrl(value: string): boolean {
  return isHttpUrl(value) || isDesktopAppUrl(value);
}

export function appendQuery(baseUrl: string, query: Record<string, string>): string {
  const url = new URL(baseUrl);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}