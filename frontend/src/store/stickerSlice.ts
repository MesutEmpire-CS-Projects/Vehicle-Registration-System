import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";

export const fetchAllStickers = createAsyncThunk(
  "sticker/fetchAllStickers",
  async () => {
    const response = await fetch("http://localhost:2000/api/sticker");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  }
);

const stickerSlice = createSlice({
  name: "sticker",
  initialState: {
    stickers: [],
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStickers.fulfilled, (state, action) => {
        state.stickers = action.payload;
      })
      .addCase(fetchAllStickers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const stickerReducer = stickerSlice.reducer;

export const selectStickers = (state: RootState) => state.sticker;
