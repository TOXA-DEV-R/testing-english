/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navbarControlSlice = createSlice({
  name: "testingResults",
  initialState,
  reducers: {
    closeNavbarFeature(_state, _action) {
      _state.isOpen = false;
    },
    openNavbarFeature(_state, _action) {
      _state.isOpen = true;
    },
  },
});

export const { closeNavbarFeature, openNavbarFeature } =
  navbarControlSlice.actions;

export default navbarControlSlice.reducer;
