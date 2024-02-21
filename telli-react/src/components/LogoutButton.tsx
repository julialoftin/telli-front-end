async function fetchLogout() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/authentication/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error logging out: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error logging out: ");
      throw error; // Rethrow the error to be caught by the calling function
    }
}

export default function LogoutButton({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleLogout() {
    const response = await fetchLogout();
    if (response) {
      setIsLoggedIn(false);
    } else {
      console.error("Error logging out");
    }
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
