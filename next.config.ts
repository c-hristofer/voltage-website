import type { NextConfig } from 'next';

const legacyYearSlugs: Record<string, string> = {
  '2025-reefscape': '2025',
  '2024-crescendo': '2024',
  '2023-charged-up': '2023',
  '2022-rapid-react': '2022',
  '2021-infinite-recharge-2': '2021',
  '2020-infinite-recharge': '2020',
  '2019-destination-deep-space': '2019',
  '2018-power-up': '2018',
  '2017-steamworks': '2017',
  '2016-stronghold': '2016',
  '2015-recycle-rush': '2015',
  '2014-aerial-assist': '2014',
  '2013-ultimate-ascent': '2013',
  '2012-rebound-rumble': '2012',
  '2011-logo-motion': '2011',
  '2010-breakaway': '2010',
  '2009-lunacy': '2009',
  '2008-first-overdrive': '2008',
  '2007-rack-rsquon-roll': '2007',
  '2006-aim-high': '2006',
  '2005-triple-play': '2005',
  '2004-first-frenzy': '2004',
  '2003-stack-attack': '2003',
  '2002-zone-zeal': '2002',
  '2001-diabolical-dynamics': '2001',
  '2000-co-opertition': '2000'
};

const repoPath = '/voltage-website';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repoPath,
  assetPrefix: `${repoPath}/`,
  images: { unoptimized: true }
};

export default nextConfig;
