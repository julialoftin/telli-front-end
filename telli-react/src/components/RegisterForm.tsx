import React, { useState } from "react";

interface RegisterFormInfo {
  username: string;
  password: string;
  verifyPassword: string;
}

async function fetchRegisterAPI(registerFormInfo: RegisterFormInfo) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/authentication/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormInfo),
        credentials: 'include',
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error registering user: ", error);
    return { error: "An unexpected error occurred during registration." };
  }
}

export default function RegisterForm({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null
  );
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);
  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username: string = (
      document.getElementById("username") as HTMLInputElement
    ).value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;
    const verifyPassword: string = (
      document.getElementById("verifyPassword") as HTMLInputElement
    ).value;

    const registerFormInfo = {
      username: username,
      password: password,
      verifyPassword: verifyPassword,
    };

    try {
      const response = await fetchRegisterAPI(registerFormInfo);
      if (response && response.message) {
        setRegistrationMessage(response.message);
        setIsLoggedIn(true);
        setRegistrationSuccess(true);
      } else if (response && response.error) {
        setRegistrationMessage(response.error);
        setIsLoggedIn(false);
        setRegistrationSuccess(false);
      } else {
        setRegistrationMessage(
          "An unexpected error occurred during registration."
        );
        setIsLoggedIn(false);
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      setRegistrationSuccess(false);
    }
  }

  return (
    <>
      <div>
        {registrationSuccess ? (
          <div className="message">{registrationMessage}</div>
        ) : (
          <div>
            <form onSubmit={registerUser}>
              <label htmlFor="username">
                Username:
                <input type="text" id="username" name="username" />
              </label>
              <label htmlFor="password">
                Password:
                <input type="password" id="password" name="password" />
              </label>
              <label htmlFor="verifyPassword">
                Verify Password:
                <input
                  type="password"
                  id="verifyPassword"
                  name="verifyPassword"
                />
              </label>

              <input type="submit" value="Register" />
            </form>
            <p className="error">{registrationMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
