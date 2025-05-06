import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="bg-bg-secondary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Partner with LabCore</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Join our growing network of diagnostic labs and reach more patients through our platform.
          </p>
        </div>

        {/* Why Join Us */}
        <section className="bg-white p-8 rounded-3xl shadow-primary space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Why Partner with Us?</h2>
          <ul className="list-disc pl-5 text-text-primary space-y-2">
            <li>Expand your reach with online test bookings</li>
            <li>Receive AI-powered patient recommendations</li>
            <li>Offer home sample collection and scheduling</li>
            <li>Access a dedicated admin dashboard</li>
            <li>Get instant payments and billing transparency</li>
          </ul>
        </section>

        {/* How it Works */}
        <section className="bg-white p-8 rounded-3xl shadow-primary space-y-6">
          <h2 className="text-2xl font-semibold text-primary">How It Works</h2>
          <ol className="list-decimal pl-5 text-text-primary space-y-2">
            <li>Submit your lab and owner details through the form</li>
            <li>Our team reviews and verifies your information</li>
            <li>You get access to your Lab Admin dashboard</li>
            <li>Start receiving and managing online lab orders</li>
          </ol>
        </section>

        {/* Benefits Section */}
        <section className="bg-white p-8 rounded-3xl shadow-primary space-y-6">
          <h2 className="text-2xl font-semibold text-primary">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-6 text-text-primary">
            <div className="p-4 border border-border-dark rounded-lg">
              <h4 className="font-bold text-lg mb-1">Dashboard Access</h4>
              <p>Manage orders, reports, patient messages, and test listings.</p>
            </div>
            <div className="p-4 border border-border-dark rounded-lg">
              <h4 className="font-bold text-lg mb-1">Trusted Branding</h4>
              <p>Become a verified lab and appear in AI test recommendations.</p>
            </div>
            <div className="p-4 border border-border-dark rounded-lg">
              <h4 className="font-bold text-lg mb-1">Secure Payments</h4>
              <p>Automated billing and payment handling — no stress.</p>
            </div>
            <div className="p-4 border border-border-dark rounded-lg">
              <h4 className="font-bold text-lg mb-1">Patient Support</h4>
              <p>We handle customer support, so you can focus on testing.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://forms.gle/abc123xyzExample" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300"
          >
            Apply to Join
          </a>
          <p className="text-sm text-text-light mt-2">Takes less than 3 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Join;
