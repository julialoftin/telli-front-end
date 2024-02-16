import React, { useState } from "react";

interface LogInFormInfo {
  username: string;
  password: string;
}

async function fetchLoginAPI(logInFormInfo: LogInFormInfo) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/authentication/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInFormInfo),
        credentials: 'include',
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error logging in: ", error);
    return { error: "An unexpected error occurred during registration." };
  }
}

export default function LogInForm({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [logInMessage, setLogInMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  async function logInUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username: string = (
      document.getElementById("username") as HTMLInputElement
    ).value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    const logInFormInfo = {
      username: username,
      password: password,
    };

    try {
      const response = await fetchLoginAPI(logInFormInfo);
      if (response && response.message) {
        setLogInMessage(response.message);
        setIsLoggedIn(true);
        setLoginSuccess(true);
      } else if (response && response.error) {
        setLogInMessage(response.error);
        setIsLoggedIn(false);
        setLoginSuccess(false);
      } else {
        setLogInMessage("An unexpected error occurred during registration.");
        setIsLoggedIn(false);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      setLoginSuccess(false);
    }
  }

  return (
    <>
      <div>
        {loginSuccess ? (
          <div className="message">{logInMessage}</div>
        ) : (
          <div>
            <form onSubmit={logInUser}>
              <label htmlFor="username">
                Username:
                <input type="text" id="username" name="username" />
              </label>
              <label htmlFor="password">
                Password:
                <input type="password" id="password" name="password" />
              </label>

              <input type="submit" value="Login" />
            </form>
            <p className="error">{logInMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
