import { fetchFreelancerData } from '@/plugins/freelancer';
import { describe, it, expect } from 'vitest';

describe('Freelancer Plugin', () => {
  it('should fetch upwork stats properly', async () => {
    const data = await fetchFreelancerData('upwork', 'john_doe');
    
    expect(data).not.toBeNull();
    expect(data?.platform).toBe('upwork');
    expect(data?.username).toBe('john_doe');
    expect(data?.rating).toBe(4.9);
    expect(data?.topRated).toBe(true);
  });

  it('should handle fiverr stats properly', async () => {
    const data = await fetchFreelancerData('fiverr', 'jane_doe');
    
    expect(data).not.toBeNull();
    expect(data?.platform).toBe('fiverr');
    expect(data?.username).toBe('jane_doe');
  });

  it('should return null if no username is provided', async () => {
    const data = await fetchFreelancerData('upwork', '');
    expect(data).toBeNull();
  });
});
