import { Routes, Route } from "react-router-dom";
import DiaryItems from './components/DiaryItems'
import Reports from './components/Reports'
import InvalidRoute from './components/InvalidRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DiaryItems />}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="*" element={<InvalidRoute/>}/>
  </Routes>
)

export default AppRoutes
