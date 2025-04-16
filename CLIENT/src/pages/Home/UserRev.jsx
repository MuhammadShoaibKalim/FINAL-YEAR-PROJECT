import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote: "LabCore's symptom checker helped me identify my condition early. Quick, accurate, and reassuring.",
    name: "Morgan S.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Patient"
  },
  {
    quote: "Finally, a health platform that's clear and helpful. Made my doctor visits more productive.",
    name: "Casey R.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "Health Enthusiast"
  },
  {
    quote: "Transformed how I manage my health anxiety. Clear insights, no unnecessary stress.",
    name: "Alex T.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    role: "Regular User"
  },
];

const UserReview = () => {
  return (
    <section className="relative py-12 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Real experiences from people who trust LabCore
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl 
                bg-bg-primary/40 backdrop-blur-md
                border border-border/20
                hover:border-primary/40 transition-all duration-500
                hover:shadow-lg hover:shadow-primary/10
                hover:translate-y-[-2px] p-6"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                <FaQuoteLeft className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="relative">
                <p className="text-base text-justify text-text-secondary leading-relaxed mb-6">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-bg-primary" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors duration-500">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="h-6 w-px bg-border/20" />
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="h-6 w-px bg-border/20" />
            <div className="text-3xl font-bold text-primary">10k+</div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 items-center mt-1">
            <div className="text-xs text-text-secondary">Rating</div>
            <div className="w-6" />
            <div className="text-xs text-text-secondary">Satisfaction</div>
            <div className="w-6" />
            <div className="text-xs text-text-secondary">Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReview;
