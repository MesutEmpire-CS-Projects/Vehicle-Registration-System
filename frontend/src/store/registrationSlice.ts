import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";
import { IRegistration_Form } from "../intetfaces/Interfaces";

export const createNewRegistration = createAsyncThunk(
  "registration/createNewRegistration",
  async (formValues, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const response = await fetch(
      "http://localhost:2000/api/createNewRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state.registration.form,
          ...formValues,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data);
    }

    const data = await response.json();

    return data;
  }
);

export const fetchAllRegistration_details = createAsyncThunk(
  "registration/fetchAllRegistration_details",
  async () => {
    const response = await fetch(
      "http://localhost:2000/api/registration_detail"
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }

    return data;
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    form : null as IRegistration_Form | null,
    errorPost: null as unknown,
    data: {
      registration: [],
      error: null as unknown,
    },
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewRegistration.pending, (state) => {
        console.log("Pending");
        state.errorPost = null;
      })
      .addCase(createNewRegistration.fulfilled, (state, action) => {
        // You can update the state here if needed
        state.form = null;
        state.errorPost = null;
        console.log("Success");
      })
      .addCase(createNewRegistration.rejected, (state, action) => {
        console.log("Error");
        state.errorPost = action.error.message;
      })
      .addCase(fetchAllRegistration_details.fulfilled, (state, action) => {
        state.data.registration = action.payload;
      })
      .addCase(fetchAllRegistration_details.rejected, (state, action) => {
        state.data.error = action.error.message;
      });
  },
});

export const { setForm } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;

export const selectRegistration = (state: RootState) => state.registration.form;

export const selectErrorPost = (state: RootState) =>
  state.registration.errorPost;

export const selectRegistrationDetails = (state: RootState) =>
  state.registration.data;
