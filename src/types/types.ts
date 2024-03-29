export interface ICrypto {
  id: string
  icon: string
  name: string
  symbol: string
  rank: number
  price: number
  priceBtc: number
  volume: number
  marketCap: number
  availableSupply: number
  totalSupply: number
  priceChange1h: number
  priceChange1d: number
  priceChange1w: number
  redditUrl: string
  websiteUrl: string
  twitterUrl: string
  explorers: string[]
}

export type FieldType = {
  amount?: number
  price?: number
  total?: number
}

export type PurchasedCoin = {
  id?: number
  idCrypto: string;
  amount: number;
  icon: string;
  price: number;
  currentPrice: number;
  date: any;
  name: string;
  symbol: string;
  grow: boolean;
  totalProfit: number;
  total: number;
}

export enum SortPropertyEnum {
  PRICE_DESC = '-price',
  PRICE_ASK = 'price',
  POPULAR = ''
}

export type Sort = {
  name: string,
  property: SortPropertyEnum
}

export type TParamsObj = {
  url: string
  params: {
    name: string
    sortBy?: SortPropertyEnum
  }
}