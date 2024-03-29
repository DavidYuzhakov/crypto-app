import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICrypto } from "../../types/types";

const FAV_KEY = 'favorites'

type AppState = {
  searchValue: string
  favorites: ICrypto[]
  assets: ICrypto[]
  id: string
  drawer: boolean
}

const initialState: AppState = {
  searchValue: '',
  favorites: JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'),
  assets: [],
  id: '',
  drawer: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    clearValue(state) {
      state.searchValue = ''
    },
    addFavorites(state, action: PayloadAction<ICrypto>) {
      state.favorites.push(action.payload)
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
    },
    removeFavoirtes(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload)
      localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
    },
    addAssets (state, action: PayloadAction<ICrypto>) {
      state.assets.push(action.payload)
    },
    updateId (state, action: PayloadAction<string>) {
      state.id = action.payload
    },
    onClose (state) {
      state.drawer = false
    },
    onOpen (state) {
      state.drawer = true
    }
  }
})

export const { updateValue, addFavorites, removeFavoirtes, addAssets, clearValue, updateId, onClose, onOpen } = appSlice.actions
export default appSlice.reducer