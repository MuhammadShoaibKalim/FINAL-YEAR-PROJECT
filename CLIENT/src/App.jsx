import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "sonner";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "react-use-cart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserLayout from "./components/Layouts/UserLayout";
import SuperAdminLayout from "./components/Admin/SuperAdmin/SuperAdminLayout";
import LabAdminLayout from "./components/Admin/LabAdmin/LabAdminLayout";
import ScrollToTop from "./components/Layouts/ScrollToTop";
import ProtectedRoute from "./components/Layouts/ProtectedRoutes";
import Loader from "./components/Layouts/Loader";

// Super Admin Components
import Users from "./components/Admin/SuperAdmin/Users";
import Labs from "./components/Admin/SuperAdmin/Labs";
import Overview from "./components/Admin/SuperAdmin/Overview";
import Inbox from "./components/Admin/SuperAdmin/Inbox";
import Settings from "./components/Admin/SuperAdmin/Settings";

// User components
import Home from "./pages/NavbarPages/Home";
import About from "./pages/NavbarPages/About";
import WhyUs from "./pages/NavbarPages/WhyUs";
import Privacy from "./pages/NavbarPages/Privacy";
import Contact from "./pages/NavbarPages/Contact";
import Features from "./pages/NavbarPages/Features";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SymptomDetails from "./pages/Symptoms/SymptomDetails";

// Lab Admin Components
import Orders from "./components/Admin/LabAdmin/Orders";
import Reports from "./components/Admin/LabAdmin/ReportCard";
import LabSettings from "./components/Admin/LabAdmin/Settings";
import OfferedTest from "./components/Admin/LabAdmin/OfferedTest";
import LabOverview from "./components/Admin/LabAdmin/LabOverview";
import OrderEdit from "./components/Admin/LabAdmin/OrderEdit";
import FAQ from "./pages/Home/FAQ";
import AIRecommendation from "./components/Ai/AIRecommendation";
import UserReview from "./pages/Home/UserRev";
import UserProfile from "./pages/UserProfile";
import Messages from "./components/Admin/LabAdmin/MessageLabAdmin";
import LabProfile from "./components/Admin/LabAdmin/LabProfile";
import Labes from "./pages/NavbarPages/Labs/Labs";
import LabDetails from "./pages/NavbarPages/Labs/LabDetails";
import BookingForm from "./pages/NavbarPages/Labs/BookingForm";
import Cart from "./pages/Cart";
import Payment from "./components/Payment/Payment";
import Failure from "./components/Payment/Failure";
import Success from "./components/Payment/Success";
import Partners from "./pages/Partners/Partners";
import Hero from "./pages/Home/Hero";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.Auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/labs" element={<Labes />} />
            <Route path="/labs/:labId" element={<LabDetails />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/testimonials" element={<UserReview />} />
            <Route path="/features" element={<Features />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/symptoms" element={<SymptomDetails />} />
            <Route path="/symptoms/:symptomId" element={<SymptomDetails />} />
          </Route>

          {/* Protected User Routes */}
          <Route path="/" element={<ProtectedRoute>  <UserLayout /> </ProtectedRoute>}>
            <Route path="/ai-recommendations-test" element={<AIRecommendation />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/success" element={<Success />} />
            <Route path="/payment/failure" element={<Failure />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/admin/super" element={<SuperAdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="labs" element={<Labs />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Lab Admin Routes */}
          <Route path="/labadmin/lab" element={<LabAdminLayout />}>
          {/* <Route index element={<LabOverview />} /> */}
           <Route path="profile" element={<LabProfile />} />
           <Route path="overview" element={<LabOverview />} /> 
           <Route path="orders" element={<Orders />} />
           <Route path="orders/:orderId" element={<OrderEdit />} />
           <Route path="reports" element={<Reports />} />
           <Route path="tests" element={<OfferedTest />} />
           <Route path="messages" element={<Messages />} />
           <Route path="settings" element={<LabSettings />} />
         </Route>
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />

          {/* Parterns Routes */}
          <Route path="/partners" element={<Partners/>}/>

          {/* Mixed Routes */}
          <Route path="/services" element={<Hero/>}/>


        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;



