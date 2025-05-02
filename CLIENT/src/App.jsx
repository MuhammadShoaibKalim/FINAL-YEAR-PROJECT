import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "sonner";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "react-use-cart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from './redux/AuthSlice';
import { get } from "./Services/ApiEndpoints";

import UserLayout from "./components/Layouts/UserLayout";
import SuperAdminLayout from "./components/SuperAdmin/SuperAdminLayout";
import LabAdminLayout from "./components/LabAdmin/LabAdminLayout";
import ScrollToTop from "./components/Layouts/ScrollToTop";
import ProtectedRoute from "./components/Layouts/ProtectedRoutes";
import Loader from "./components/Layouts/Loader";

// Super Admin Components
import Users from "./components/SuperAdmin/Users";
import Labs from "./components/SuperAdmin/Labs";
import Overview from "./components/SuperAdmin/Overview";
import Inbox from "./components/SuperAdmin/Inbox";
import Settings from "./components/SuperAdmin/Settings";

// User components
import Home from "./pages/NavbarPages/Home";
import About from "./pages/NavbarPages/About";
import WhyUs from "./pages/NavbarPages/WhyUs";
import Privacy from "./pages/NavbarPages/Privacy";
import Contact from "./pages/NavbarPages/Contact";
import Features from "./pages/NavbarPages/Features";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./pages/NotFound";
import SymptomDetails from "./pages/Symptoms/SymptomDetails";

// Lab Admin Components
import Orders from "./components/LabAdmin/Orders";
import Reports from "./components/LabAdmin/ReportCard";
import OfferedTest from "./components/LabAdmin/OfferedTest";
import LabOverview from "./components/LabAdmin/LabOverview";
import OrderEdit from "./components/LabAdmin/OrderEdit";
import FAQ from "./pages/Home/FAQ";
import AIRecommendation from "./components/Ai/AIRecommendation";
import UserReview from "./pages/Home/UserRev";
import Messages from "./components/LabAdmin/LabAdminInbox";
import LabProfile from "./components/LabAdmin/LabAdminProfileSettings";
import Labes from "./pages/Labs/Labs";
import LabDetails from "./pages/Labs/LabDetails";
import TestPackages from "./pages/Labs/TestPackages";
import PlaceOrder from "./pages/Labs/PlaceOrders";
import ConfirmBookingDetails from "./pages/Labs/ConfirmBookingDetails";
// import LabSettings from "./components/LabAdmin/Settings";
import Payment from "./components/Payment/Payment";
import Failure from "./components/Payment/Failure";
import Success from "./components/Payment/Success";
import Partners from "./pages/Partners/Partners";
import Hero from "./pages/Home/Hero";
import UserInbox from "./components/UserAdmin/UserInbox";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import LabAdminProfileSettings from "./components/LabAdmin/LabAdminProfileSettings";


// userprofile layout
import UserProfileLayout from "./components/UserAdmin/UserProfileLayout";
import UserProfile from "./components/UserAdmin/UserProfile";
import UserReport from "./components/UserAdmin/UserReports";
import UserCart from "./components/UserAdmin/Cart";
import UserMessage from "./components/UserAdmin/UserInbox";
import UserOrder from "./components/UserAdmin/Orders";
import UserReports from "./components/UserAdmin/UserReports";
import UserProfileEdit from "./components/UserAdmin/UserProfileEdit";





const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const request = await get('/api/auth/checkuser');
  //       if (request.status === 200) {
  //         dispatch(SetUser(request.data.user));
  //         localStorage.setItem('token', request.data.token);
  //       }
  //     } catch (error) {
  //       console.error('Error checking user:', error);
  //     }
  //   };
  //   checkUser();
  // }, [dispatch]);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) {
          console.log('No token found');
          return;
        }
  
        const request = await get('/api/auth/getuser');
        if (request.status === 200) {
          dispatch(SetUser(request.data.user));
        }
      } catch (error) {
        console.error('Error checking user:', error);
        dispatch(Logout());
      }
    };
  
    checkUser();
  }, [dispatch]);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>

          {/* User Login?register */}
             <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/user/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Public Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="testimonials" element={<UserReview />} />
            <Route path="features" element={<Features />} />
            <Route path="why-us" element={<WhyUs />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="symptoms" element={<SymptomDetails />} />
            <Route path="symptoms/:symptomId" element={<SymptomDetails />} />
            <Route path="partners" element={<Partners />} />
            <Route path="services" element={<Hero />} />

          </Route>

          {/* Protected User Routes */}
          <Route path="/" element={<ProtectedRoute><UserLayout /> </ProtectedRoute>}>
            <Route path="ai-recommendations-test" element={<AIRecommendation />} />
            <Route path="labs" element={<Labes />} />
            <Route path="/labs/:id/details" element={<LabDetails />} />
            <Route path="/labs/:id/testpackage" element={<TestPackages />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="confirm-booking" element={<ConfirmBookingDetails />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment/success" element={<Success />} />
            <Route path="payment/failure" element={<Failure />} />
            <Route path="/user/inbox" element={<UserInbox />} />
          </Route>

         
         {/* UserProfile Layout */}
         <Route path="/user" element={<UserProfileLayout />}>
          <Route index element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="edit" element={<UserProfileEdit isEdit />} />
          <Route path="cart" element={<UserCart />} />
          <Route path="orders" element={<UserOrder />} />
          <Route path="messages" element={<UserInbox />} />
          <Route path="reports" element={<UserReports />} />
        </Route>
         

          {/* Super Admin Routes */}
          <Route 
            path="/admin/super" 
            element={
              <ProtectedRoute roles={['superadmin']}>
                <SuperAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="labs" element={<Labs />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Lab Admin Routes */}
          <Route 
            path="/labadmin/lab" 
            element={
              <ProtectedRoute roles={['labadmin']}>
                <LabAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<LabOverview />} />
            <Route path="labdashboard" element={<LabOverview />} />
            <Route path="profile" element={<LabProfile />} />
            <Route path="orders/:orderId" element={<OrderEdit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="tests" element={<OfferedTest />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<LabAdminProfileSettings />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
