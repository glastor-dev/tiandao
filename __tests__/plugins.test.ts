import { describe, it, expect } from 'vitest';
import { fetchAchievementsData } from '@/plugins/achievements';
import { fetchSponsorsData } from '@/plugins/sponsors';
import { fetchLiveStatusData } from '@/plugins/livestatus';
import { fetchPageSpeedData } from '@/plugins/pagespeed';

describe('Plugins Data Fetchers', () => {
  it('fetchAchievementsData returns mocked achievements', async () => {
    const data = await fetchAchievementsData('ricsg');
    expect(data.achievements).toBeInstanceOf(Array);
    expect(data.achievements.length).toBeGreaterThan(0);
  });

  it('fetchSponsorsData handles null username and returns valid sponsors', async () => {
    const nullData = await fetchSponsorsData('');
    expect(nullData).toBeNull();

    const data = await fetchSponsorsData('ricsg');
    expect(data).not.toBeNull();
    expect(data?.totalSponsors).toBe(14);
    expect(data?.sponsors.length).toBeGreaterThan(0);
  });

  it('fetchLiveStatusData calculates status for valid timezone', async () => {
    const nullData = await fetchLiveStatusData('');
    expect(nullData).toBeNull();

    const data = await fetchLiveStatusData('UTC');
    expect(data).not.toBeNull();
    expect(data?.timezone).toBe('UTC');
    expect(['online', 'asleep', 'away']).toContain(data?.status);
  });

  it('fetchPageSpeedData handles empty URL gracefully', async () => {
    const nullData = await fetchPageSpeedData('');
    expect(nullData).toBeNull();
  });
});
