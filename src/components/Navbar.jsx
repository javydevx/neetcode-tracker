import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow mb-6">
    <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6">
      <Link to="/" className="font-bold text-blue-600">
        Tracker
      </Link>
      <Link to="/patterns" className="font-bold text-blue-600">
        Patterns
      </Link>
      <Link to="/roadmap" className="font-bold text-blue-600">
        Roadmap
      </Link>
    </div>
  </nav>
);

export default Navbar;
