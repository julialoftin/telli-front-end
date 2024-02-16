import LogInForm from "../components/LogInForm";

export default function LogIn({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      <LogInForm setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}
