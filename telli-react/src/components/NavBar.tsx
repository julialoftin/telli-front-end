import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavBarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/authentication/check-login",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          }
        );
        if (response.ok) {
          const result = await response.json();
          setIsLoggedIn(result.isLoggedIn);
        }
      } catch (error) {
        console.error("Error checking log in status: ", error);
      }
    };
    checkLoggedInStatus();
  }, [setIsLoggedIn]);

  return (
    <>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </li>
              <li>
                {/* <button>Logout</button> */}
                <LogoutButton  setIsLoggedIn={setIsLoggedIn} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button>Log In</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
