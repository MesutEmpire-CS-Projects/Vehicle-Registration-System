import { useEffect, useState } from "react";

const Sticker = () => {
  const [stickers, setStickers] = useState([] as any);

  useEffect(() => {
    console.log("Received");
  }, [stickers]);

  const getOwnerData = () => {
    fetch("http://localhost:2000/api/stickers")
      .then((res: Response) => res.json())
      .then((data: any) => {
        setStickers(data);
        console.log(data);
      });
  };
  return (
    <div>
      <h2>Sticker Details</h2>
      <div className="flex ">
        <button
          onClick={() => getOwnerData()}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Stickers Data
        </button>
      </div>
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
              {stickers.map((sticker: any, id: any) => {
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
  );
};

export default Sticker;
