import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-gray-50 shadow py-10 px-4 md:px-20 lg:px-40 mt-24">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Privacy Policy</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Welcome to LabCore. Your privacy is our utmost priority. This privacy policy outlines how we collect, use, and safeguard your personal data when you use our platform.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Data Collection Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">1. Data Collection</h2>
          <p className="text-gray-600">
            We collect the following types of data to enhance your user experience:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Personal details like name, email address, and phone number.</li>
            <li>Health-related data for personalized test recommendations.</li>
            <li>Payment information for secure transactions.</li>
            <li>Browsing activity to improve our platform.</li>
          </ul>
        </div>

        {/* Data Usage Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">2. Data Usage</h2>
          <p className="text-gray-600">
            Your data is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Providing personalized lab test recommendations.</li>
            <li>Processing test bookings and transactions.</li>
            <li>Enhancing user experience and platform performance.</li>
            <li>Sending important notifications and updates.</li>
          </ul>
        </div>

        {/* Data Sharing Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">3. Data Sharing</h2>
          <p className="text-gray-600">
            We respect your privacy and ensure your data is never sold. Data may be shared only under these circumstances:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>With trusted partners for service delivery (e.g., payment processing).</li>
            <li>To comply with legal obligations or requests from authorities.</li>
            <li>To prevent fraud or protect our platform's security.</li>
          </ul>
        </div>

        {/* Data Security Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">4. Data Security</h2>
          <p className="text-gray-600">
            We implement robust security measures to safeguard your data:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Encryption of sensitive data.</li>
            <li>Regular security audits and system updates.</li>
            <li>Strict access controls for authorized personnel only.</li>
          </ul>
        </div>

        {/* User Rights Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">5. Your Rights</h2>
          <p className="text-gray-600">
            As a LabCore user, you have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Access your personal data and request corrections.</li>
            <li>Request data deletion (subject to legal requirements).</li>
            <li>Opt-out of non-essential data collection.</li>
          </ul>
          <p className="text-gray-600 mt-2">
            To exercise your rights, contact us at{' '}
            <a href="mailto:support@labcore.com" className="text-teal-600 underline">
              support@labcore.com
            </a>.
          </p>
        </div>

        {/* Policy Updates Card */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-3">6. Policy Updates</h2>
          <p className="text-gray-600">
            We may update this privacy policy periodically. Changes will be communicated through the platform, and your continued use signifies agreement with the updated terms.
          </p>
        </div>

      
      </div>
    </div>
  );
};

export default Privacy;
