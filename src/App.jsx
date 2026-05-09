import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LibraryPage from './pages/LibraryPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import BookmarksPage from './pages/BookmarksPage.jsx'
import MistakesPage from './pages/MistakesPage.jsx'
import SupportPage from './pages/SupportPage.jsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/mistakes" element={<MistakesPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  )
}
