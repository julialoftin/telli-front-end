import CreateNewWatchListForm from "../components/CreateNewWatchList";
import TagForm from "../components/TagForm";
import ViewReviewsLoggedInUser from "../components/ViewReviewsLoggedInUser";
import DisplayAllWatchLists from "../components/ViewWatchLists"

export default function Profile () {
    return (
        <>
            <CreateNewWatchListForm />
            <DisplayAllWatchLists />
            <TagForm />
            <ViewReviewsLoggedInUser />
        </>
    )
}