import { useEffect, useState } from "react";
import { IRegistration_detail } from "../intetfaces/Interfaces";
import ErrorPage from "./Error";
import {useSelector,useDispatch} from 'react-redux'
import {fetchAllRegistration_details,selectRegistrationDetails} from '../store/registrationSlice'

const RegistrationDetails = () => {

    const registration = useSelector(selectRegistrationDetails).data
    const error = useSelector(selectRegistrationDetails).error
    const dispatch = useDispatch()

  return (
    <div>
      <h2>Registration Details</h2>
      <div className="flex ">
        <button
          onClick={() => dispatch(fetchAllRegistration_details())}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Registration Data
        </button>
      </div>
      {error ? (
        <ErrorPage fetchError={error} />
      ) : (
        <div>
          {registration.length !== 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Registration ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Owner ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vehicle Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Registration Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registration.map((reg: IRegistration_detail, id: number) => {
                    return (
                      <tr
                        key={id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {reg.registration_id}
                        </th>
                        <td className="px-6 py-4">{reg.owner_id}</td>
                        <td className="px-6 py-4">{reg.vehicle_number}</td>
                        <td className="px-6 py-4">
                          {new Date(reg.start_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{reg.duration}</td>
                        <td className="px-6 py-4">
                          {new Date(reg.end_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{reg.registration_fee}</td>
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

export default RegistrationDetails;
