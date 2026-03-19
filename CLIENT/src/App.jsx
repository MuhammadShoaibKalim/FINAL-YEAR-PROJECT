import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "react-use-cart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetUser, logoutUser } from './redux/AuthSlice';
import { get } from "./Services/ApiEndpoints";

import UserLayout from "./components/Layouts/UserLayout";
import SuperAdminLayout from "./components/SuperAdmin/SuperAdminLayout";
import LabAdminLayout from "./components/LabAdmin/LabAdminLayout";
// import ProtectedRoute from "./components/Layouts/ProtectedRoutes";
import Loader from "./components/Layouts/Loader";

// Super Admin Components
import Users from "./components/SuperAdmin/Users";
import Labs from "./components/SuperAdmin/Labs";
import Overview from "./components/SuperAdmin/Overview";
import Inbox from "./components/SuperAdmin/Inbox";
import Settings from "./components/SuperAdmin/Settings";
import SuperadminProfile from "./components/SuperAdmin/SuperadminProfile";

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
import Payment from "./components/Payment/Payment";
import Failure from "./components/Payment/Failure";
import Success from "./components/Payment/Success";
import Partners from "./pages/Partners/OurPartner";
import Hero from "./pages/Home/Hero";
import UserInbox from "./components/UserAdmin/UserInbox";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import LabAdminProfileSettings from "./components/LabAdmin/LabAdminProfileSettings";

// userprofile layout
import UserProfileLayout from "./components/UserAdmin/UserProfileLayout";
import UserProfile from "./components/UserAdmin/UserProfile";
import UserCart from "./components/UserAdmin/Cart";
import UserOrder from "./components/UserAdmin/Orders";
import UserReports from "./components/UserAdmin/UserReports";
import UserProfileEdit from "./components/UserAdmin/UserProfileEdit";
import EmailVerification from "./components/Auth/EmailVerification";
import Unauthorized from "./pages/Unauthorized";
import CheckEmail from "./components/Auth/CheckEmail";
import ResendVerification from "./components/Auth/ResendEmailVerification";
import ResetPasswordForce from "./components/Auth/ResetPasswordForce";
import Join from "./pages/NavbarPages/Join";
import AllTests from "./pages/TestPackges/AllTests";
import MenHealthPage from "./pages/HealthConcernTest/MenHealthPage";
import TestHealthConcern from "./pages/HealthConcernTest/TestHealthConcern";
import HealthLayout from "./pages/HealthConcernTest/HealthLayout"
import DiabetesCarePage from "./pages/HealthConcernTest/DiabetesCarePage";
import HeartHealthPage from "./pages/HealthConcernTest/HeartHealthPage";
import WomensHealthPage from "./pages/HealthConcernTest/WomensHealthPage";
import SeniorCarePage from "./pages/HealthConcernTest/SeniorCareHealthPage";
import ChildHealthPage from "./pages/HealthConcernTest/ChildHealthPage";

import MostUsedLayout from "./pages/MostUsed/MostUsedLayout";
import CBC from "./pages/MostUsed/CBC";
import DiabetesScreening from "./pages/MostUsed/DiabetesScreening";
import LipidProfile from "./pages/MostUsed/LipidProfile";
import ThyroidProfile from "./pages/MostUsed/ThyroidProfile";
import MostUsed from "./pages/MostUsed/MostUsed";
import SearchResults from './components/Search/SearchResults';
import Terms from "./pages/NavbarPages/Terms";


const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const checkUser = async () => {
      const publicRoutes = [
        '/login',
        '/register',
        '/verify-email',
        '/resend-verification',
        '/check-email',
        '/user/forgot-password',
        '/reset-password',
        '/reset-password-force'
      ];

      const isPublic = publicRoutes.some(route => window.location.pathname.startsWith(route));
      if (isPublic) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) {
          dispatch(logoutUser());
          return;
        }
        const request = await get('/api/auth/getuser');
        if (request.status === 200) {
          dispatch(SetUser(request.data.user));
        }
      } catch (error) {
        dispatch(logoutUser());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch, pathname]); // Added pathname here to re-check on nav if needed

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Reduced delay for smoother feel
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <CartProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/resend-verification" element={<ResendVerification />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password-force/:id" element={<ResetPasswordForce />} />

        {/* Home & Public Content Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="join" element={<Join />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="testimonials" element={<UserReview />} />
          <Route path="features" element={<Features />} />
          <Route path="why-us" element={<WhyUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="symptoms" element={<SymptomDetails />} />
          <Route path="symptoms/:symptomId" element={<SymptomDetails />} />
          <Route path="partners" element={<Partners />} />
          <Route path="services" element={<Hero />} />
          <Route path="ai-recommendations-test" element={<AIRecommendation />} />
          <Route path="labs" element={<Labes />} />
          <Route path="/labs/:id/details" element={<LabDetails />} />
          <Route path="/labs/:id/testpackage" element={<TestPackages />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="confirm-booking" element={<ConfirmBookingDetails />} />
          <Route path="payment" element={<Payment />} />
          <Route path="payment/success" element={<Success />} />
          <Route path="payment/failure" element={<Failure />} />
          <Route path="all-tests-packages" element={<AllTests />} />
          <Route path="search" element={<SearchResults />} />
        </Route>

        {/* Test by Health Concern Layout */}
        <Route path="/" element={<HealthLayout />}>
          <Route path="tests-by-concern" element={<TestHealthConcern />} />
          <Route path="men's-health" element={<MenHealthPage />} />
          <Route path="diabetes-care" element={<DiabetesCarePage />} />
          <Route path="heart-health" element={<HeartHealthPage />} />
          <Route path="women's-health" element={<WomensHealthPage />} />
          <Route path="senior-care" element={<SeniorCarePage />} />
          <Route path="child-health" element={<ChildHealthPage />} />
        </Route>

        {/* Most Used Test Layout */}
        <Route path="tests" element={<MostUsed />} />
        <Route path="/most-used" element={<MostUsedLayout />}>
          <Route path="cbc" element={<CBC />} />
          <Route path="diabetes-screening" element={<DiabetesScreening />} />
          <Route path="thyroid-profile" element={<ThyroidProfile />} />
          <Route path="lipid-profile" element={<LipidProfile />} />
        </Route>

        {/* Dashboard/Patient Profile Layout */}
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
        <Route path="/admin/super" element={<SuperAdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="labs" element={<Labs />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="profile" element={<SuperadminProfile />} />
        </Route>

        {/* Lab Admin Routes */}
        <Route path="/labadmin/lab" element={<LabAdminLayout />}>
          <Route index element={<LabOverview />} />
          <Route path="overview" element={<LabOverview />} />
          <Route path="labdashboard" element={<LabOverview />} />
          <Route path="profile" element={<LabProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/edit/:orderId" element={<OrderEdit />} />
          <Route path="tests" element={<OfferedTest />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<LabAdminProfileSettings />} />
        </Route>

        {/* Fallback Routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </CartProvider>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;