import { useState } from "react";
import { IVehicle } from "../intetfaces/Interfaces";
import ErrorPage from "./Error";
import {useSelector,useDispatch} from 'react-redux'
import {selectVehicles,fetchAllVehicles} from '../store/vehicleSlice'

const Vehicle = () => {
    const {vehicles,error} = useSelector(selectVehicles)
    const dispatch = useDispatch()
  return (
    <div>
      <h2>Vehicle Details</h2>
      <div className="flex ">
        <button
          onClick={() => dispatch(fetchAllVehicles())}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Vehicles Data
        </button>
      </div>

      {error ? (
        <ErrorPage fetchError={error} />
      ) : (
        <div>
          {vehicles.length !== 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Vehicle Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Plate Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sticker Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Make
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mileage
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vehicle Year
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle: IVehicle, id: number) => {
                    return (
                      <tr
                        key={id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {vehicle.vehicle_number}
                        </th>
                        <td className="px-6 py-4">{vehicle.plate_number}</td>
                        <td className="px-6 py-4">{vehicle.sticker_number}</td>
                        <td className="px-6 py-4">{vehicle.model}</td>
                        <td className="px-6 py-4">{vehicle.make}</td>
                        <td className="px-6 py-4">{vehicle.mileage}</td>
                        <td className="px-6 py-4">{vehicle.color}</td>
                        <td className="px-6 py-4">{vehicle.vehicle_year}</td>
                        <td className="px-6 py-4">{vehicle.weight}</td>
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

export default Vehicle;
