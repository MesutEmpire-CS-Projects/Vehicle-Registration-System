import { useState } from "react";
import ErrorPage from "./Error";

const Notice = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [error, setError] = useState();

  const getNoticeData = () => {
    fetch("http://localhost:2000/api/notice/notice")
      .then((res: Response) => res.json())
      .then((data: any) => {
        setNotices(data);
      })
      .catch((error: any) => setError(error.message));
  };
  return (
    <div>
      <h2>Notices Details</h2>
      <div className="flex">
        <button
          onClick={() => getNoticeData()}
          className="w-1/2 my-8 input_design bg-blue-700 hover:bg-blue-500 text-white"
        >
          Get Notices Data
        </button>
      </div>
      {error ? (
        <ErrorPage fetchError={error} />
      ) : (
        <div>
          {notices.length !== 0 && (
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
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice: any, id: number) => {
                    return (
                      <tr
                        key={id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {notice.owner_id}
                        </th>
                        <td className="px-6 py-4">{notice.owner_name}</td>
                        <td className="px-6 py-4">{notice.phone_number}</td>
                        <td className="px-6 py-4">
                          {" "}
                          {new Date(notice.end_date).toLocaleDateString()}
                        </td>
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

export default Notice;
