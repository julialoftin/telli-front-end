import React, { useState } from "react";

interface RegisterFormInfo {
  username: string;
  password: string;
  verifyPassword: string;
}

async function fetchRegisterAPI(registerFormInfo: RegisterFormInfo) {
  try {
    const response = await fetch("http://localhost:8080/api/authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerFormInfo),
    });
    return await response.json();
  } catch (error) {
    console.error("Error registering user: ", error);
    return { error: "An unexpected error occurred during registration." };
  }
}

export default function RegisterForm() {
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username: string = (document.getElementById("username") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;
    const verifyPassword: string = (document.getElementById("verifyPassword") as HTMLInputElement).value;

    const registerFormInfo = {
      username: username,
      password: password,
      verifyPassword: verifyPassword
    };

    try {
      const response = await fetchRegisterAPI(registerFormInfo);
      if (response && response.message) {
        setRegistrationMessage(response.message);
      } else if (response && response.error) {
        setRegistrationMessage(response.error);
      } else {
        setRegistrationMessage("An unexpected error occurred during registration.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
            <input type="password" id="verifyPassword" name="verifyPassword" />
          </label>

          <input type="submit" value="Register" />
        </form>
        {registrationMessage && <div className="message">{registrationMessage}</div>}
      </div>
    </>
  );
}
