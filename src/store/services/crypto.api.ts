import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICrypto, PurchasedCoin, SortPropertyEnum, TParamsObj } from "../../types/types";

export const cryptoApi = createApi({
  reducerPath: 'crypto/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://425a4901a2adc144.mokky.dev'
  }),
  endpoints: (builder) => ({
    getCrypto: builder.query<ICrypto[], { value: string, property: SortPropertyEnum}>({
      query: ({ value, property }) => {
        const paramsObj: TParamsObj = {
          url: '/crypto',
          params: {
            name: value,
          }
        }
        if (property) {
          paramsObj.params.sortBy = property
        }

        return paramsObj
      }
    }),
    getCoin: builder.query<ICrypto[], string>({
      query: (id) => ({
        url: '/crypto',
        params: {
          id,
        }
      })
    }),
    getPurchasedCoins: builder.query<PurchasedCoin[], void>({
      query: () => '/purchased'
    }),
    addPurchasedCoin: builder.mutation<PurchasedCoin, PurchasedCoin>({
      query: (body) => ({
        url: '/purchased',
        method: 'POST',
        body
      })
    })
  })
})

export const { 
  useGetCryptoQuery, 
  useGetCoinQuery, 
  useAddPurchasedCoinMutation, 
  useGetPurchasedCoinsQuery 
} = cryptoApi