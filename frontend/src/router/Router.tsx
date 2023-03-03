import { createBrowserRouter } from "react-router-dom";
import RegistrationForm from "../components/Registration_Form";
import ErrorPage from "../components/Error";
import HomeLayout from "../layout/HomeLayout";
import RegistrationDetails from "../components/Registration_details";
import Vehicle from "../components/Vehicle";
import Sticker from "../components/Sticker";
import Plate from "../components/Plate";
import Owner from "../components/Owner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RegistrationForm />,
      },
      {
        path: "/registrations",
        element: <RegistrationDetails />,
      },
      {
        path: "/vehicles",
        element: <Vehicle />,
      },
      {
        path: "/stickers",
        element: <Sticker />,
      },
      {
        path: "/plates",
        element: <Plate />,
      },
      {
        path: "/owners",
        element: <Owner />,
      },
    ],
  },
]);

export default router;
