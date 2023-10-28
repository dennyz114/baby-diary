import { Routes, Route } from "react-router-dom";
import DiaryItems from './views/diaryItems'
import Reports from './views/Reports'
import InvalidRoute from './components/InvalidRoute'
import BabyInfo from './views/babyInfo'
import AppInfo from './views/AppInfo'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DiaryItems />}/>
    <Route path="/baby-diary" element={<DiaryItems />}/>
    <Route path="/reports" element={<Reports/>}/>
    <Route path="/baby-info" element={<BabyInfo/>}/>
    <Route path="/app-info" element={<AppInfo/>}/>
    <Route path="*" element={<InvalidRoute/>}/>
  </Routes>
)

export default AppRoutes
