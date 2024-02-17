import CreateNewWatchListForm from "../components/CreateNewWatchList";
import TagForm from "../components/TagForm";
import DisplayAllWatchLists from "../components/ViewWatchLists"

export default function Profile () {
    return (
        <>
            <CreateNewWatchListForm />
            <DisplayAllWatchLists />
            <TagForm />
        </>
    )
}