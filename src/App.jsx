import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import ApplicationsPage from "./pages/ApplicationsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/applications" replace />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App