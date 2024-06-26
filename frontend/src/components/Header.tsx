import { Link } from "react-router-dom";
import Hero from "./Hero";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tighter">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link to="/sign-in" className="flex items-center text-white px-3 font-bold hover:bg-gray-500">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
