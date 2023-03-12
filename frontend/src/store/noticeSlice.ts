import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./mainStore";

export const fetchAllNotices = createAsyncThunk(
    'notice/fetchAllNotices',
    async () => {
        const response = await fetch('http://localhost:2000/api/notice/notice');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data);
        }

        return data;
    }
);


const noticeSlice = createSlice({
    name: "notice",
    initialState: {
        notices : [],
        error : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNotices.fulfilled, (state, action) => {
                state.notices = action.payload;
            })
            .addCase(fetchAllNotices.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const noticeReducer = noticeSlice.reducer;

export const selectNotices = (state: RootState) =>
    state.notice;

