import { useEffect, useState } from "react";

const Owner = () => {
  const [owners, setOwners] = useState([] as any);

  useEffect(() => {
    console.log("Received");
  }, [owners]);

  const getOwnerData = () => {
    fetch("http://localhost:2000/api/owners")
      .then((res: Response) => res.json())
      .then((data: any) => {
        setOwners(data);
      });
  };
  return (
    <div>
      <h2>Owners Details</h2>
      <div className="flex ">
        <button
          onClick={() => getOwnerData()}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Owners Data
        </button>
      </div>
      {owners.length !== 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Owner ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner: any, id: any) => {
                console.log("test");
                return (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {owner.owner_id}
                    </th>
                    <td className="px-6 py-4">{owner.owner_name}</td>
                    <td className="px-6 py-4">{owner.phone_number}</td>
                    <td className="px-6 py-4">{owner.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Owner;
