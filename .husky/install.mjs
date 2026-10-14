// Skip Husky install in production and CI/Vercel environments
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true' || process.env.CI === '1' || process.env.VERCEL) {
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  husky();
} catch {
  process.exit(0);
}
