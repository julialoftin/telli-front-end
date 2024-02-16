import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  }, []); // Empty dependency array, effect runs when component mounts

  return (
    <>
        <nav>
            <ul>
                {isLoggedIn ? (
                    <li>
                        <button>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/register"><button>Register</button></Link>
                        </li>
                        <li>
                            <Link to="/login"><button>Log In</button></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </>
  );
}
