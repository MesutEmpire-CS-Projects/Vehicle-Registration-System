import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";

export const fetchAllVehicles = createAsyncThunk(
    'vehicle/fetchAllVehicles',
    async () => {
        const response = await fetch('http://localhost:2000/api/vehicle');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data);
        }

        return data;
    }
);


const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
           vehicles : [],
           error : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload;
            })
            .addCase(fetchAllVehicles.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const vehicleReducer = vehicleSlice.reducer;

export const selectVehicles = (state: RootState) =>
    state.vehicle;

