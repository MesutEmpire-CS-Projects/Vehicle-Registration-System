import { useState } from "react";
import { IPlate } from "../intetfaces/Interfaces";
import ErrorPage from "./Error";
import {useSelector,useDispatch} from 'react-redux'
import {selectPlates,fetchAllPlates} from '../store/plateSlice'

const Plate = () => {
    const {plates,error} = useSelector(selectPlates)
    const dispatch = useDispatch()

  return (
    <div>
      <h2>Plates Details</h2>
      <div className="flex ">
        <button
          onClick={() => dispatch(fetchAllPlates())}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Plates Data
        </button>
      </div>
      {error ? (
        <ErrorPage fetchError={error} />
      ) : (
        <div>
          {plates.length !== 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Plate Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Plate Issuer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Issue Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plates.map((plate: IPlate, id: number) => {
                    return (
                      <tr
                        key={id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {plate.plate_number}
                        </th>
                        <td className="px-6 py-4">{plate.plate_issuer}</td>
                        <td className="px-6 py-4">{plate.issue_year}</td>
                        <td className="px-6 py-4">{plate.type}</td>
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

export default Plate;
