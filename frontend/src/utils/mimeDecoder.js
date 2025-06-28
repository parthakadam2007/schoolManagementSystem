export function decodeMimeWords(str) {
  return str.replace(/(=\?[^?]+\?[BQbq]\?[^?]+\?=)/g, (chunk) => {
    const match = chunk.match(/^=\?([^?]+)\?([BQbq])\?([^?]+)\?=$/);
    if (!match) return chunk;

    const [, charset, encoding, text] = match;

    if (encoding.toUpperCase() === 'Q') {
      // Decode "quoted-printable" style
      return text
        .replace(/_/g, ' ')
        .replace(/=([A-Fa-f0-9]{2})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        );
    }

    if (encoding.toUpperCase() === 'B') {
      try {
        const binary = atob(text);
        const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
        return new TextDecoder(charset).decode(bytes);
      } catch {
        return chunk;
      }
    }

    return chunk;
  });
}

import DOMPurify from 'dompurify'; // For safe HTML rendering

function cleanUrlsInString(str) {
  return str.replace(/https?:\/\/[^\s<>'")]+/g, (url) => {
    try {
      const parsed = new URL(url);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return url;
    }
  });
}

export function formatEmailBody(rawBody) {
  const mimeDecoded = decodeMimeWords(rawBody);
  const urlCleaned = cleanUrlsInString(mimeDecoded);
  const withLineBreaks = urlCleaned.replace(/\n/g, '<br>');
  return DOMPurify.sanitize(withLineBreaks);
}
