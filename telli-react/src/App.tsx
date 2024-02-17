import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import LogIn from './pages/LogIn'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import MovieDetails from './pages/MovieDetails'
import ViewWatchListMediaItemsComponent from './components/ViewWatchListMediaItems'
import ViewTagByMediaItem from './components/ViewTagByMediaItem'
import ViewAllMediaItemsWithTagLinkComponent from './components/ViewAllMediaItemsWithTagLinkComponent'

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
          <Route path="/watchlist/:id" element={<ViewWatchListMediaItemsComponent />} />
          <Route path="/media-item/:id" element={<ViewAllMediaItemsWithTagLinkComponent />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
