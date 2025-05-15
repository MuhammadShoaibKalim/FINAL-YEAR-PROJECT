import { Test, Package } from '../models/testpackage.model.js';
import Lab from '../models/lab.model.js';

export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    // Search in tests
    const tests = await Test.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('lab').limit(5);

    // Search in packages
    const packages = await Package.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
      ]
    }).populate('lab').limit(5);

    // Search in labs
    const labs = await Lab.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } }
      ]
    }).limit(5);

    // Format results
    const formattedResults = [
      ...tests.map(test => ({
        _id: test._id,
        type: 'test',
        displayName: test.name,
        displayDescription: test.description,
        price: test.price,
        labName: test.lab?.name || 'Unknown Lab',
        lab: test.lab?._id ? test.lab._id : test.lab
      })),
      ...packages.map(pkg => ({
        _id: pkg._id,
        type: 'package',
        displayName: pkg.name,
        displayDescription: pkg.description,
        price: pkg.price,
        labName: pkg.lab?.name || 'Unknown Lab',
        lab: pkg.lab?._id ? pkg.lab._id : pkg.lab
      })),
      ...labs.map(lab => ({
        _id: lab._id,
        type: 'lab',
        displayName: lab.name,
        displayDescription: lab.description,
        address: lab.address,
        location: lab.location
      }))
    ];

    // Add health concerns and most used tests
    const healthConcerns = [
      { name: "Heart Health", path: "/heart-health", description: "Cardiac assessments and heart health screenings" },
      { name: "Diabetes Care", path: "/diabetes-care", description: "Diabetes management and monitoring" },
      { name: "Women's Health", path: "/womens-health", description: "Women's health screenings and care" },
      { name: "Men's Health", path: "/mens-health", description: "Men's health checks and screenings" },
      { name: "Senior Care", path: "/senior-care", description: "Elderly health and senior care" },
      { name: "Child Health", path: "/child-health", description: "Pediatric care and child health" }
    ];

    const mostUsedTests = [
      { name: "Complete Blood Count (CBC)", path: "/most-used/cbc", description: "Comprehensive blood analysis" },
      { name: "Lipid Profile", path: "/most-used/lipid-profile", description: "Cholesterol and lipid testing" },
      { name: "Thyroid Profile", path: "/most-used/thyroid-profile", description: "Thyroid function testing" },
      { name: "Diabetes Screening", path: "/most-used/diabetes-screening", description: "Diabetes testing and monitoring" }
    ];

    // Add static frontend pages
    const staticPages = [
      { name: "Home", path: "/", description: "Go to the home page", keywords: "home, main, landing" },
      { name: "About Us", path: "/about", description: "Learn more about our mission and team", keywords: "about, company, mission, team, who we are" },
      { name: "Contact", path: "/contact", description: "Get in touch with us", keywords: "contact, support, help, email, phone" },
      { name: "Join", path: "/join", description: "Join our platform", keywords: "join, signup, register, become a member" },
      { name: "Privacy Policy", path: "/privacy-policy", description: "Read our privacy policy", keywords: "privacy, policy, data, security" },
      { name: "Testimonials", path: "/testimonials", description: "See what our users say", keywords: "testimonials, reviews, feedback, user stories" },
      { name: "Features", path: "/features", description: "Explore our features", keywords: "features, benefits, highlights, what we offer" },
      { name: "Why Us", path: "/why-us", description: "Why choose us?", keywords: "why us, advantages, best, choose, reasons" },
      { name: "FAQ", path: "/faq", description: "Frequently Asked Questions", keywords: "faq, questions, help, support, answers" },
      { name: "Symptom Checker", path: "/symptoms", description: "Check your symptoms", keywords: "symptom, checker, health, diagnosis, self check" },
      { name: "Partners", path: "/partners", description: "Our trusted partners", keywords: "partners, affiliations, collaborations" },
      { name: "Services", path: "/services", description: "Our services", keywords: "services, offerings, what we do" },

      // Health Concern Pages
      { name: "Tests by Health Concern", path: "/tests-by-concern", description: "Explore tests by health concern", keywords: "health concern, categories, heart, diabetes, women, men, senior, child" },
      { name: "Men's Health", path: "/men's-health", description: "Men's health checks and screenings", keywords: "men's health, prostate, testosterone, lipid profile, cbc, diabetes, cancer screening, annual checkup, blood pressure, cholesterol, kidney function, liver function, vitamin d, b12, thyroid, ecg, std, metabolic panel, colon cancer, bone density" },
      { name: "Diabetes Care", path: "/diabetes-care", description: "Diabetes management and monitoring", keywords: "diabetes, blood sugar, glucose, hba1c, fasting, postprandial, oral glucose tolerance, c-peptide, insulin, urine microalbumin, lipid profile, symptoms, management, prediabetes, type 1, type 2, insulin resistance, endocrinologist, diabetes package" },
      { name: "Heart Health", path: "/heart-health", description: "Cardiac assessments and heart health screenings", keywords: "heart, cardiac, lipid profile, cholesterol, triglycerides, cardiac enzyme, crp, homocysteine, ecg, stress test, echocardiogram, nt-probnp, blood pressure, risk factors, prevention, heart disease, arrhythmia, heart failure, cardiac package" },
      { name: "Women's Health", path: "/women's-health", description: "Women's health screenings and care", keywords: "women's health, pap smear, hpv, mammogram, bone density, thyroid, pregnancy, prenatal, hormone, reproductive, breast cancer, cervical cancer, menopause, fertility, birth control, brca, ob-gyn, wellness package" },
      { name: "Senior Care", path: "/senior-care", description: "Elderly health and senior care", keywords: "senior, elderly, bone density, cognitive, metabolic panel, vitamin d, b12, thyroid, psa, mammogram, fall risk, dementia, osteoporosis, annual checkup, geriatric, wellness package" },
      { name: "Child Health", path: "/child-health", description: "Pediatric care and child health", keywords: "pediatric, child, infant, toddler, school age, newborn screening, bilirubin, vitamin d, lead screening, hemoglobin check, developmental screening, wellness check, sports physical, mental health, pediatrician, child health package" },

      // Most Used Test Pages
      { name: "Most Used Tests", path: "/tests", description: "Most commonly booked health tests", keywords: "cbc, diabetes, thyroid, lipid, most used, popular, common, blood test, screening" },
      { name: "CBC", path: "/most-used/cbc", description: "Complete Blood Count", keywords: "cbc, complete blood count, hemoglobin, rbc, wbc, platelets, anemia, infection, blood disorder, routine checkup" },
      { name: "Diabetes Screening", path: "/most-used/diabetes-screening", description: "Diabetes screening test", keywords: "diabetes, screening, blood sugar, glucose, hba1c, fasting, ogtt, prediabetes, risk factors" },
      { name: "Thyroid Profile", path: "/most-used/thyroid-profile", description: "Thyroid function test", keywords: "thyroid, tsh, t3, t4, hypothyroidism, hyperthyroidism, thyroid antibodies, metabolism, hormone" },
      { name: "Lipid Profile", path: "/most-used/lipid-profile", description: "Cholesterol and lipid testing", keywords: "lipid, cholesterol, hdl, ldl, triglycerides, heart, cardiac, fasting, risk, statin" },

      // Labs & Packages
      { name: "All Labs", path: "/labs", description: "Browse all available labs", keywords: "labs, laboratory, diagnostic, certified, accredited, test center" },
      { name: "All Tests & Packages", path: "/all-tests-packages", description: "See all tests and health packages", keywords: "all tests, packages, health check, screening, diagnostics, offers" },
      { name: "AI Recommendation", path: "/ai-recommendations-test", description: "Get AI-based test recommendations", keywords: "ai, recommendation, smart, personalized, test suggestion" },

      // User Dashboard & Related
      { name: "User Dashboard", path: "/user", description: "Your user dashboard", keywords: "dashboard, user, profile, account, summary" },
      { name: "User Cart", path: "/user/cart", description: "Your shopping cart", keywords: "cart, shopping, checkout, basket" },
      { name: "User Orders", path: "/user/orders", description: "Your orders", keywords: "orders, bookings, history, appointments" },
      { name: "User Reports", path: "/user/reports", description: "Your reports", keywords: "reports, results, lab report, download" },
      { name: "User Messages", path: "/user/messages", description: "Your messages", keywords: "messages, inbox, communication, support" },
      { name: "User Profile", path: "/user/profile", description: "Edit your profile", keywords: "profile, edit, user, account, settings" },
      { name: "User Edit", path: "/user/edit", description: "Edit your user info", keywords: "edit, update, user, info, profile" },

      // Auth & Misc
      { name: "Check Email", path: "/check-email", description: "Check your email", keywords: "check email, verification, confirm" },
      { name: "Reset Password", path: "/user/forgot-password", description: "Reset your password", keywords: "reset password, forgot, recover, change password" },
      { name: "Register", path: "/register", description: "Register a new account", keywords: "register, signup, create account, join" },
      { name: "Login", path: "/login", description: "Login to your account", keywords: "login, sign in, access, user" },
      { name: "Resend Verification", path: "/resend-verification", description: "Resend your email verification", keywords: "resend, verification, email, confirm" },
    ];

    // Filter health concerns, most used tests, and static pages based on search query
    const matchingHealthConcerns = healthConcerns.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    const matchingMostUsedTests = mostUsedTests.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    const matchingStaticPages = staticPages.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      (item.keywords && item.keywords.toLowerCase().includes(query.toLowerCase()))
    );

    const additionalResults = [
      ...matchingHealthConcerns.map(item => ({
        _id: item.path,
        type: 'health-concern',
        displayName: item.name,
        displayDescription: item.description,
        path: item.path
      })),
      ...matchingMostUsedTests.map(item => ({
        _id: item.path,
        type: 'most-used-test',
        displayName: item.name,
        displayDescription: item.description,
        path: item.path
      })),
      ...matchingStaticPages.map(item => ({
        _id: item.path,
        type: 'static-page',
        displayName: item.name,
        displayDescription: item.description,
        path: item.path
      }))
    ];

    const allResults = [...formattedResults, ...additionalResults];

    res.status(200).json({
      success: true,
      data: allResults
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Error performing search" });
  }
};