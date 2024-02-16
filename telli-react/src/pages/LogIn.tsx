import LogInForm from "../components/LogInForm";
import NavBar from "../components/NavBar";

export default function LogIn() {
  return (
    <>
      <NavBar />
      <LogInForm setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}
