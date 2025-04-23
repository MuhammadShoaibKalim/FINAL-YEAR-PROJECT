import React, { useState } from "react";
import { toast } from "sonner";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/query/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text-primary mb-6">Contact Us</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Get in touch with our team for any inquiries. {`We're`} here to help you with your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Information */}
          <div className="h-full">
            <div className="bg-bg-primary/50 backdrop-blur-sm p-10 rounded-2xl shadow-primary border border-border/20 h-full flex flex-col">
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-text-primary mb-6">Get in Touch</h2>
                <p className="text-lg text-text-secondary mb-8">
                  Have questions about our services? Need assistance with your healthcare needs? {`We're`} here to help you every step of the way.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-text-primary mb-1">Quick Response</h3>
                      <p className="text-text-secondary">Our team typically responds within 24 hours to all inquiries.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-text-primary mb-1">Secure Communication</h3>
                      <p className="text-text-secondary">Your information is protected with industry-standard encryption.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="p-4 bg-primary/10 rounded-xl">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-text-primary mb-1">24/7 Support</h3>
                      <p className="text-text-secondary">Emergency support is available around the clock for urgent matters.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-auto border-t border-border/20">
                <h3 className="text-xl font-medium text-text-primary mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary">How quickly will I receive a response?</p>
                      <p className="text-sm text-text-secondary/70 mt-1">We aim to respond to all inquiries within 24 hours during business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-secondary">Is my information secure?</p>
                      <p className="text-sm text-text-secondary/70 mt-1">Yes, we use end-to-end encryption to protect all communications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="h-full">
            <div className="bg-bg-primary/50 backdrop-blur-sm p-10 rounded-2xl shadow-primary border border-border/20 h-full">
              <h2 className="text-3xl font-semibold text-text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full p-3 border border-border/50 rounded-lg bg-bg-secondary/50 text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full p-3 border border-border/50 rounded-lg bg-bg-secondary/50 text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="w-full p-3 border border-border/50 rounded-lg bg-bg-secondary/50 text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="w-full p-3 border border-border/50 rounded-lg bg-bg-secondary/50 text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 min-h-[300px] resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark transition-all duration-300 text-text-white font-medium text-lg py-3 px-6 rounded-lg mt-6 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
