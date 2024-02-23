import CreateNewWatchListForm from "../components/CreateNewWatchList";
import TagForm from "../components/TagForm";
import ViewReviewsLoggedInUser from "../components/ViewReviewsLoggedInUser";
import DisplayAllWatchLists from "../components/ViewWatchLists";
import { useState } from "react";

export default function Profile() {
  const [showWatchListComponents, setShowWatchListComponents] = useState(false);
  const [showYourReviewsComponent, setShowYourReviewsComponent] =
    useState(false);
  const handleManageWatchLists = () => {
    if (showWatchListComponents === true) {
      setShowWatchListComponents(false);
    } else {
      setShowWatchListComponents(true);
    }
  };
  const handleManageYourReviews = () => {
    if (showYourReviewsComponent === true) {
      setShowYourReviewsComponent(false);
    } else {
      setShowYourReviewsComponent(true);
    }
  };
  return (
    <>
      {showWatchListComponents ? (
        <div>
          <button onClick={handleManageWatchLists}>
            Hide your Watch Lists
          </button>
          <DisplayAllWatchLists />
        </div>
      ) : (
        <>
          <button onClick={handleManageWatchLists}>
            Manage your Watch Lists
          </button>
        </>
      )}
      <TagForm />
      {showYourReviewsComponent ? (
        <>
          <button onClick={handleManageYourReviews}>Hide your Reviews</button>
          <ViewReviewsLoggedInUser />
        </>
      ) : (
        <>
          <button onClick={handleManageYourReviews}>Show your Reviews</button>
          
        </>
      )}
    </>
  );
}
