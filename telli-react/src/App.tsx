import { useState } from 'react'
import './App.css'
import CreateNewWatchListForm from './components/CreateNewWatchList'
import DisplayAllWatchLists from './components/ViewWatchLists'
import { SearchBar } from './components/Search'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import LogIn from './pages/LogIn'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import MovieDetails from './pages/MovieDetails'
import ViewWatchListMediaItemsComponent from './components/ViewWatchListMediaItems'
import ViewAllMediaItemsWithTagLinkComponent from './components/ViewAllMediaItemsWithTagLinkComponent'
import WriteAReview from './pages/WriteAReview'
import TVSeriesDetailsPage from './pages/TVSeriesDetails'
import WriteAReviewTVSeries from './pages/WriteAReviewTVSeries'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TVSeriesDetailsPage />} />
          <Route path="/watchlist/:id" element={<ViewWatchListMediaItemsComponent />} />
          <Route path="/media-item/:id" element={<ViewAllMediaItemsWithTagLinkComponent />} />
          <Route path="/write-review" element={<WriteAReview />} />
          <Route path="/write-tv-review" element={<WriteAReviewTVSeries />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
