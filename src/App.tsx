import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/utils';
import { MainLayout, AdminLayout } from '@/layouts';
import { HomePage, AdminPage, ErrorPage } from '@/pages';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
