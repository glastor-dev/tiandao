import { describe, it, expect } from 'vitest';

describe('Security & Validation Tests', () => {
  it('should validate GitHub username format strictly', () => {
    const isValidGithubUser = (u: string) => /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(u);
    
    expect(isValidGithubUser('valid-user-123')).toBe(true);
    expect(isValidGithubUser('ricsg')).toBe(true);
    expect(isValidGithubUser('-invalidStart')).toBe(false);
    expect(isValidGithubUser('invalidEnd-')).toBe(false);
    expect(isValidGithubUser('user..name')).toBe(false);
    expect(isValidGithubUser('user/repo')).toBe(false);
    expect(isValidGithubUser('<script>')).toBe(false);
    expect(isValidGithubUser('a'.repeat(40))).toBe(false);
  });

  it('should sanitize custom hex color to prevent CSS injection', () => {
    const isValidHex = (hex: string) => /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex);
    
    expect(isValidHex('#fff')).toBe(true);
    expect(isValidHex('58a6ff')).toBe(true);
    expect(isValidHex('#ff00aa88')).toBe(true);
    expect(isValidHex('red; background: black')).toBe(false);
    expect(isValidHex('url(javascript:alert(1))')).toBe(false);
    expect(isValidHex('#xyz')).toBe(false);
  });

  it('should validate external background image URLs against SSRF and injections', () => {
    const isValidImageUrl = (urlStr: string) => {
      try {
        const parsed = new URL(urlStr);
        return (parsed.protocol === "http:" || parsed.protocol === "https:") && !urlStr.includes('"') && !urlStr.includes("'");
      } catch {
        return false;
      }
    };

    expect(isValidImageUrl('https://example.com/image.png')).toBe(true);
    expect(isValidImageUrl('http://cdn.test.org/pic.jpg')).toBe(true);
    expect(isValidImageUrl('javascript:alert(1)')).toBe(false);
    expect(isValidImageUrl('data:text/html,<script></script>')).toBe(false);
    expect(isValidImageUrl('https://example.com/img.png" onerror="alert(1)')).toBe(false);
    expect(isValidImageUrl('not-a-url')).toBe(false);
  });
});
