import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";

export const fetchAllOwners = createAsyncThunk(
  "owner/fetchAllOwners",
  async () => {
    const response = await fetch("http://localhost:2000/api/owner");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  }
);

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owners: [],
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOwners.fulfilled, (state, action) => {
        state.owners = action.payload;
      })
      .addCase(fetchAllOwners.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const ownerReducer = ownerSlice.reducer;

export const selectOwners = (state: RootState) => state.owner;
