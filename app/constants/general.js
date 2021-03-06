export const LOCK_INTERVAL = 1800000; // 30 minutes miliseconds
export const weiPerEth = 1000000000000000000;

export const GAS_LIMIT_MODIFIER = 1.1;

export const VIEWS = [
  'privacyNotice', 'changePassword', 'copySeed', 'unlockAccount', 'send', 'networkUnavailable',
  'refund'
];

export const OPTIONS_DROPDOWN_ITEMS = [
  {
    id: 'ext_info',
    text: 'Extension info'
  },
  {
    id: 'show_seed',
    text: 'Recovery phrase'
  },
  {
    id: 'show_terms',
    text: 'Terms'
  },
  {
    id: 'lock_acc',
    text: 'Lock'
  },
];

export const TABS = [
  { slug: 'tips', name: 'Tips history' },
  { slug: 'gold', name: 'Gold history' }
];

export const ONBOARDING_UNVERIFIED_STEPS = [
  {
    slug: 'intro',
    contentStyle: { top: 150 },
    hole: { width: 0, height: 0, top: 0, left: 0, }
  },
  {
    slug: 'description',
    contentStyle: { top: 25 },
    hole: { width: 0, height: 0, top: 0, left: 0, }
  },
  {
    slug: 'address',
    contentStyle: { top: 200 },
    hole: { width: 455, height: 60, top: 63, left: 20 }
  },
  {
    slug: 'component',
    contentStyle: { top: 20 },
    hole: { width: 0, height: 0, top: 0, left: 0 }
  },
  {
    slug: 'verified',
    contentStyle: { top: 186 },
    hole: { width: 455, height: 58, top: 122, left: 20 }
  },
  {
    slug: 'formDescription',
    contentStyle: { top: 12 },
    hole: { width: 455, height: 100, top: 266, left: 20 }
  },
  {
    slug: 'final',
    contentStyle: { top: 110 },
    hole: { width: 0, height: 0, top: 0, left: 0 }
  }
];
