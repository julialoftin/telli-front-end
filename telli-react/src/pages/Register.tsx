import NavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";

export default function Register ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <RegisterForm setIsLoggedIn={setIsLoggedIn} />
        </>
    )
}