import { Link } from "react-router-dom";

export default function ProfileButton() {
  return (
    <>
      <ul>
        <li>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
        </li>
      </ul>
    </>
  );
}
