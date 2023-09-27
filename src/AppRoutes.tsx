import { Routes, Route } from "react-router-dom";
import DiaryItems from './views/diaryItems'
import Reports from './views/Reports'
import InvalidRoute from './components/InvalidRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DiaryItems />}/>
    <Route path="/baby-diary" element={<DiaryItems />}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="*" element={<InvalidRoute/>}/>
  </Routes>
)

export default AppRoutes
