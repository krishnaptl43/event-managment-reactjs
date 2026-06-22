import React from 'react'
import { Outlet, Route, Routes } from 'react-router';
import Public from "./routes/publicRoute";
import Home from './pages/home';
import Events from './pages/events';
import Contact from './pages/contact';
import NotFoundPage from './pages/404';
import Auth from './pages/auth';
import EventDetailsPage from './pages/eventDetails';
import GalleryPage from './pages/photoGallery';
import ProtectedRoute from './routes/protectedRoute';
import Dashboard from './pages/dashboard/userDash';
import Profile from './pages/dashboard/profile';
import MyTickets from './pages/dashboard/mytickets';
import ChangePassword from './pages/dashboard/changePass';
import DashStarics from './pages/dashboard/userDash';
import NotificationsPage from './pages/dashboard/notification';
import NotFound from './pages/dashboard/notFound';
import { ToastContainer } from 'react-toastify';
import ContextProvider from './context/authContext';

export default function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          {/* this is public route */}
          <Route path='/' element={<Public />}>
            <Route index element={<Home />} />
            <Route path='events' element={<Outlet />} >
              <Route index element={<Events />} />
              <Route path='details' element={<EventDetailsPage />} />
            </Route>
            <Route path='photo-gallery' element={<GalleryPage />} />
            <Route path='contact' element={<Contact />} />
            <Route path='auth' element={<Auth />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          {/* this is public route */}
          <Route path='/user' element={<ProtectedRoute />}>
            <Route path='dashboard' element={<DashStarics />} />
            <Route path='profile' element={<Profile />} />
            <Route path='my-tickets' element={<MyTickets />} />
            <Route path='notifications' element={<NotificationsPage />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>
      </ContextProvider>
      <ToastContainer />
    </>
  )
}
