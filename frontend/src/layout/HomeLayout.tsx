import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="grid grid-cols-5 gap-x-8 max-w-8xl h-screen">
      <div className="flex justify-self-start h-full border-r border-gray-700  m-auto">
        <nav className="my-24">
          <Link className="nav" to="/">
            Registration Form
          </Link>
          <Link className="nav" to="/vehicles">
            Vehicles
          </Link>
          <Link className="nav" to="/stickers">
            Stickers
          </Link>
          <Link className="nav" to="/owners">
            Owners
          </Link>
          <Link className="nav" to="/plates">
            Plates
          </Link>
          <Link className="nav" to="/registrations">
            Registration Details
          </Link>
        </nav>
      </div>
      <div className=" col-span-3 h-full m-24">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
