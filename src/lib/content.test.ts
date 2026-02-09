// Smoke tests for core content loaders.

import { describe, expect, it } from 'vitest';
import { getResourceBySlug, getSocials, getSponsors, getTeamData } from './content';

describe('content loaders', () => {
  it('loads team data with mission statement', async () => {
    const team = await getTeamData();
    expect(team.missionStatement.length).toBeGreaterThan(10);
  });

  it('confirms sponsor tiers exist', async () => {
    const sponsors = await getSponsors();
    expect(sponsors.tiers.length).toBeGreaterThan(0);
  });

  it('finds a handbook resource', async () => {
    const resource = await getResourceBySlug('handbook');
    expect(resource?.downloadUrl).toContain('handbook');
  });

  it('loads validated social links', async () => {
    const socials = await getSocials();
    expect(socials.instagram?.startsWith('https://')).toBe(true);
  });
});
