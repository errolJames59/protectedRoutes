import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../CreateClient";

type User = {
  username: string;
};

async function checkUserAuthentication(): Promise<User | null> {
  try {
    const user = await account.get();
    return {
      username: user.name as string, // Assuming user.name contains the username
    };
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    return null;
  }
}

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to handle async operation

  useEffect(() => {
    const authenticateUser = async () => {
      const user = await checkUserAuthentication();
      setLoggedInUser(user);
      setLoading(false); // Set loading to false after authentication check
    };

    authenticateUser();
  }, []);

  if (loading) {
    return (
      <>
          <div className="flex items-center justify-center">
            <img
              src="/loading-svgrepo-com.svg"
              className="h-10 animate-spin"
              alt=""
            />
            <p>Loading...</p>
          </div>
      </>
    );
  }

  return loggedInUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
