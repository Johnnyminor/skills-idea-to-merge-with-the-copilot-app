import assert from 'node:assert/strict';
import test from 'node:test';
import { formatBookmark, normalizeUrl, parseBookmarks } from '../src/lib/bookmarks.js';

test('normalizes URLs with and without https to the same value', () => {
  assert.equal(
    normalizeUrl('www.example.com/path'),
    normalizeUrl('https://www.example.com/path'),
  );
});

test('recovers gracefully from empty, corrupted, legacy, and non-array storage values', () => {
  for (const raw of [null, '', 'not json', '"legacy value"', '{"url":"https://example.com"}']) {
    assert.doesNotThrow(() => parseBookmarks(raw));
    assert.deepEqual(parseBookmarks(raw), []);
  }
});

test('drops malformed entries while retaining valid bookmarks', () => {
  const bookmarks = parseBookmarks(JSON.stringify([
    { url: 'https://www.example.com', slug: 'mona-7fk2' },
    { url: 'javascript:alert(1)', slug: 'mona-bad1' },
    { url: 'https://example.com', slug: 'invalid' },
    null,
  ]));

  assert.deepEqual(bookmarks, [
    { url: 'https://www.example.com/', slug: 'mona-7fk2' },
  ]);
});

test('formats a bookmark with the exact visible separator', () => {
  assert.equal(
    formatBookmark({ url: 'https://www.example.com', slug: 'mona-7fk2' }),
    'https://www.example.com :: mona-7fk2',
  );
});
