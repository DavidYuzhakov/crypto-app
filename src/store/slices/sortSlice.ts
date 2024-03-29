import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortPropertyEnum } from "../../types/types";

interface sortState {
  label: string
  property: SortPropertyEnum
}

const initialState: sortState = {
  label: "popular",
  property: SortPropertyEnum.POPULAR
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    updateLabel (state, action: PayloadAction<string>) {
      state.label = action.payload
    },
    updateProperty (state, action: PayloadAction<SortPropertyEnum>) {
      state.property = action.payload
    }
  }
})

export default sortSlice.reducer
export const {updateLabel, updateProperty} = sortSlice.actions