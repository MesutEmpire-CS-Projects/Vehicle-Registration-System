import { useState } from "react";
import { ISticker } from "../intetfaces/Interfaces";
import ErrorPage from "./Error";
import { useSelector, useDispatch } from "react-redux";
import { selectStickers, fetchAllStickers } from "../store/stickerSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const Sticker = () => {
  const { stickers, error } = useSelector(selectStickers);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  return (
    <div>
      <h2>Sticker Details</h2>
      <div className="flex ">
        <button
          onClick={() => dispatch(fetchAllStickers())}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Stickers Data
        </button>
      </div>

      {error ? (
        <ErrorPage fetchError={error} />
      ) : (
        <div>
          {stickers.length !== 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sticker Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sticker Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stickers.map((sticker: ISticker, id: number) => {
                    return (
                      <tr
                        key={id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {sticker.sticker_number}
                        </th>
                        <td className="px-6 py-4">{sticker.sticker_year}</td>
                        <td className="px-6 py-4">{sticker.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sticker;
