import React from 'react';
import chugtai from "../../assets/chugtai.png";
import metro from "../../assets/MetroLab.jpg";
import citilab from "../../assets/CitiLab.png";
import CLINLAB from "../../assets/CLINLAB.png";
import SalmanLab from "../../assets/SalmanChugtahi.png";
import PrideLab from "../../assets/PrideLab.png";
import AlphaDC from "../../assets/AlphaDiagnosticCenter.png";
import InnovaLab from "../../assets/Innova.jpg";
import Alnoor from "../../assets/AlnoorDiagnosticCentre.jpg";
import HameedLatif from "../../assets/HameedLatifHospital.jpg";
import { FaHospital, FaClinicMedical, FaMicroscope } from "react-icons/fa";
import { Link } from "react-router-dom";

const OurColl = () => {
  const collaborators = [
    { name: "Chughtai Lab", image: chugtai, type: "hospital" },
    { name: "Citilab and Research Centre", image: citilab, type: "clinic" },
    { name: "CLINLAB", image: CLINLAB, type: "lab" },
    { name: "Salman Chughtai's Lab", image: SalmanLab, type: "hospital" },
    { name: "Pride Lab", image: PrideLab, type: "lab" },
    { name: "Metro City Lab", image: metro, type: "clinic" },
    { name: "Alpha Diagnostic Centre", image: AlphaDC, type: "clinic" },
    { name: "Innova Labs and Diagnostics", image: InnovaLab, type: "lab" },
    { name: "Alnoor Diagnostic Centre", image: Alnoor, type: "clinic" },
    { name: "Hameed Latif Hospital Laboratories", image: HameedLatif, type: "hospital" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "hospital":
        return <FaHospital className="w-4 h-4" />;
      case "clinic":
        return <FaClinicMedical className="w-4 h-4" />;
      case "lab":
        return <FaMicroscope className="w-4 h-4" />;
      default:
        return <FaHospital className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-primary-dark/80 max-w-2xl mx-auto">
            Leading healthcare providers working with us to deliver quality diagnostic services
          </p>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of collaborators */}
            {collaborators.map((collaborator, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-64 mx-4"
              >
                <div className="group relative overflow-hidden rounded-xl 
                  bg-white/5 backdrop-blur-md
                  border border-primary/20
                  hover:border-primary/40 transition-all duration-500
                  hover:shadow-lg hover:shadow-primary/10
                  hover:translate-y-[-2px] p-4"
                >
                  {/* Logo Container */}
                  <div className="relative h-32 mb-4 flex items-center justify-center">
                    <img
                      src={collaborator.image}
                      alt={collaborator.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Name and Type */}
                  <div className="text-center">
                    <h3 className="font-semibold text-primary group-hover:text-primary-dark transition-colors duration-500">
                      {collaborator.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-500">
                        {getIcon(collaborator.type)}
                      </div>
                      <span className="text-xs text-primary-dark/60 capitalize">
                        {collaborator.type}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {collaborators.map((collaborator, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-64 mx-4"
              >
                <div className="group relative overflow-hidden rounded-xl 
                  bg-white/5 backdrop-blur-md
                  border border-primary/20
                  hover:border-primary/40 transition-all duration-500
                  hover:shadow-lg hover:shadow-primary/10
                  hover:translate-y-[-2px] p-4"
                >
                  {/* Logo Container */}
                  <div className="relative h-32 mb-4 flex items-center justify-center">
                    <img
                      src={collaborator.image}
                      alt={collaborator.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Name and Type */}
                  <div className="text-center">
                    <h3 className="font-semibold text-primary group-hover:text-primary-dark transition-colors duration-500">
                      {collaborator.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="text-primary/60 group-hover:text-primary transition-colors duration-500">
                        {getIcon(collaborator.type)}
                      </div>
                      <span className="text-xs text-primary-dark/60 capitalize">
                        {collaborator.type}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/partners">
            <button className="inline-flex items-center justify-center 
              bg-gradient-to-r from-primary to-primary-dark text-white font-medium py-3 px-6 rounded-lg
              hover:from-primary-dark hover:to-primary transition-all duration-300
              hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20">
              View All Partners
            </button>
          </Link>
        </div>

        {/* Animation Styles */}
        <style>
          {`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll {
              display: flex;
              animation: scroll 5s linear infinite;
            }

            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default OurColl;
