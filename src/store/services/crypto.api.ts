import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICrypto } from "../types";

export const cryptoApi = createApi({
  reducerPath: 'crypto/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://425a4901a2adc144.mokky.dev'
  }),
  endpoints: (builder) => ({
    getCrypto: builder.query<ICrypto[], string>({
      query: (value) => ({
        url: '/crypto',
        params: {
          name: value
        }
      })
    
    }),
    getCoin: builder.query<ICrypto[], string>({
      query: (id) => ({
        url: '/crypto',
        params: {
          id,
        }
      })
    })
  })
})

export const { useGetCryptoQuery, useGetCoinQuery } = cryptoApi