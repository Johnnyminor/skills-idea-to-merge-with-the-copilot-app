const SLUG_PATTERN = /^mona-[0-9A-Za-z]{1,12}$/;

export function normalizeUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError('Enter a URL to save.');
  }

  const trimmed = value.trim();
  const candidate = trimmed.startsWith('//')
    ? `https:${trimmed}`
    : /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
  const url = new URL(candidate);

  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) {
    throw new TypeError('Enter a valid web URL.');
  }

  return url.href;
}

export function parseBookmarks(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') {
    return [];
  }

  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    return [];
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (
      entry === null ||
      typeof entry !== 'object' ||
      typeof entry.url !== 'string' ||
      typeof entry.slug !== 'string' ||
      !SLUG_PATTERN.test(entry.slug)
    ) {
      return [];
    }

    try {
      return [{ url: normalizeUrl(entry.url), slug: entry.slug }];
    } catch {
      return [];
    }
  });
}

export function formatBookmark({ url, slug }) {
  return `${url} :: ${slug}`;
}

export function createSlug(cryptoProvider = globalThis.crypto) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const bytes = new Uint8Array(4);
  cryptoProvider.getRandomValues(bytes);
  return `mona-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')}`;
}
