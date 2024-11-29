import { Link, useNavigate } from "react-router-dom";
import { account } from "../CreateClient";
import { useEffect, useState } from "react";

interface NavbarProps {
  className?: string;
}

type User = {
  username: string;
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const user = await account.get();
      console.log("Fetched user:", user);
      setLoggedInUser({
        username: user.name as string, // Assuming user.name contains the username
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className={`${className}`}>
      <nav className="p-4">
        <ul className="flex gap-4 justify-center">
          <Link to="/">Home</Link>
          <Link to="dashboard">Dashboard</Link>
          <Link to="about">About</Link>

          {!loggedInUser && <Link to="login">Login</Link>}

          {loggedInUser && (
            <button
              type="button"
              onClick={async () => {
                await account.deleteSession("current");
                setLoggedInUser(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;