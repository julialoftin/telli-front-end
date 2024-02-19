import CreateNewWatchListForm from "../components/CreateNewWatchList";
import DisplayAllWatchLists from "../components/ViewWatchLists"

export default function Profile () {
    return (
        <>
            <CreateNewWatchListForm />
            <DisplayAllWatchLists />
        </>
    )
}