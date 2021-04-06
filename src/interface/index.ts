/**
 * Interface for crypto currencies displayed on homepage
 */
export interface pageData {
  id: string;
  image: string;
  name: string;
  symbol: string;
  currentPrice: number;
  high24Price: number;
  low24Price: number;
}

/**
 * Interface for  mapping crypto currencies displayed on homepage
 */
export interface pageDataMap {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  high_24h: number;
  low_24h: number;
}

/**
 * Interface for each individual crypto currency
 */
export interface tokenData {
  name: string;
  symbol: string;
  hashingAlgo: string;
  description: string;
  marketCap: number;
  homepage: string;
  genesis: string;
}
