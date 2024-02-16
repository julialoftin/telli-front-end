import ProfileButton from "../components/ProfileButton";

interface HomeProps {
    isLoggedIn: boolean;
  }

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
    return (
        <>
            {isLoggedIn && <ProfileButton />}
        </>
    )
}

export default Home;