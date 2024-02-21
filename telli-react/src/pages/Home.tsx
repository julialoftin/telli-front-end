import MediaFeed from "../components/MediaFeed";
import ProfileButton from "../components/ProfileButton";
import { SearchBar } from "../components/Search";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
  return (
    <>
        {isLoggedIn && <ProfileButton />}
        <SearchBar />
        <MediaFeed />
    </>
  )
};

export default Home;
