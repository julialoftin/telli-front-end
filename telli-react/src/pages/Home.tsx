import MediaFeed from "../components/MediaFeed";
import ProfileButton from "../components/ProfileButton";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  return (
    <>
        {isLoggedIn && <ProfileButton />}
        <MediaFeed />
    </>
  )
};

export default Home;
