import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";

export const fetchAllPlates = createAsyncThunk(
  "plate/fetchAllPlates",
  async () => {
    const response = await fetch("http://localhost:2000/api/plate");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  }
);

const plateSlice = createSlice({
  name: "plate",
  initialState: {
    plates: [],
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlates.fulfilled, (state, action) => {
        state.plates = action.payload;
      })
      .addCase(fetchAllPlates.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const plateReducer = plateSlice.reducer;

export const selectPlates = (state: RootState) => state.plate;
