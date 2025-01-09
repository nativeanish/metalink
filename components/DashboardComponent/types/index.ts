// Link Types
export interface Link {
  id: number;
  title: string;
  url: string;
  views: number;
  clicks: number;
}

export interface LinkPerformanceData {
  date: string;
  views: number;
  clicks: number;
}

export interface LinkPerformance {
  [key: string]: LinkPerformanceData[];
}

// Click History Types
export interface ClickHistory {
  id: number;
  linkId: number;
  linkTitle: string;
  clickedAt: string;
  referenceId: string;
  browser: string;
  timezone: string;
  pageLoadTime: string;
  web3Wallets: string[];
  ipAddress: string;
  os: string;
}

// Link View Types
export interface LinkView {
  id: string;
  date: string;
  browser: string;
  os: string;
  timezone: string;
  loadtime: string;
  wallet: string[];
  ip: string;
}

// Chart Types
export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}
