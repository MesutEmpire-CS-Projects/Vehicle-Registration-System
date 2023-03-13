import { configureStore } from "@reduxjs/toolkit";
import { registrationReducer } from "./registrationSlice";
import { vehicleReducer } from "./vehicleSlice";
import { ownerReducer } from "./ownerSlice";
import { plateReducer } from "./plateSlice";
import { stickerReducer } from "./stickerSlice";
import { noticeReducer } from "./noticeSlice";
export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    vehicle: vehicleReducer,
    owner: ownerReducer,
    plate: plateReducer,
    sticker: stickerReducer,
    notice: noticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
