import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHospital, FaClinicMedical, FaMicroscope, FaMapMarkerAlt, FaPhone, FaGlobe, FaStar, FaChevronLeft } from 'react-icons/fa';

// Import partner images
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

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const partners = [
    {
      id: 1,
      name: "Chughtai Lab",
      image: chugtai,
      type: "hospital",
      rating: 4.8,
      location: "Multiple locations across Pakistan",
      phone: "+92 42 111 000 000",
      website: "https://chughtailab.com",
      description: "One of Pakistan's leading diagnostic laboratories with state-of-the-art facilities and a wide range of tests.",
      specialties: ["Pathology", "Radiology", "Cardiology", "Endocrinology"]
    },
    {
      id: 2,
      name: "Citilab and Research Centre",
      image: citilab,
      type: "clinic",
      rating: 4.6,
      location: "Lahore, Pakistan",
      phone: "+92 42 3586 0000",
      website: "https://citilab.com.pk",
      description: "A modern diagnostic center offering comprehensive testing services with quick turnaround times.",
      specialties: ["Clinical Pathology", "Microbiology", "Hematology"]
    },
    {
      id: 3,
      name: "CLINLAB",
      image: CLINLAB,
      type: "lab",
      rating: 4.7,
      location: "Karachi, Pakistan",
      phone: "+92 21 111 222 333",
      website: "https://clinlab.com.pk",
      description: "Specialized laboratory services with focus on accuracy and patient care.",
      specialties: ["Molecular Diagnostics", "Immunology", "Biochemistry"]
    },
    // Add more partners with similar structure
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type) => {
    switch (type) {
      case "hospital":
        return <FaHospital className="w-5 h-5" />;
      case "clinic":
        return <FaClinicMedical className="w-5 h-5" />;
      case "lab":
        return <FaMicroscope className="w-5 h-5" />;
      default:
        return <FaHospital className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary">
      {/* Header */}
      <div className="relative py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
              <FaChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
              Our Partners
            </h1>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-bg-primary/40 backdrop-blur-sm
                border border-border/20 focus:border-primary/40
                text-text-primary placeholder-text-secondary/60
                focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg transition-colors
                ${selectedType === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-primary/40 text-text-primary hover:bg-primary/10'}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('hospital')}
              className={`px-4 py-2 rounded-lg transition-colors
                ${selectedType === 'hospital' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-primary/40 text-text-primary hover:bg-primary/10'}`}
            >
              Hospitals
            </button>
            <button
              onClick={() => setSelectedType('clinic')}
              className={`px-4 py-2 rounded-lg transition-colors
                ${selectedType === 'clinic' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-primary/40 text-text-primary hover:bg-primary/10'}`}
            >
              Clinics
            </button>
            <button
              onClick={() => setSelectedType('lab')}
              className={`px-4 py-2 rounded-lg transition-colors
                ${selectedType === 'lab' 
                  ? 'bg-primary text-white' 
                  : 'bg-bg-primary/40 text-text-primary hover:bg-primary/10'}`}
            >
              Labs
            </button>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="group relative overflow-hidden rounded-xl 
                bg-bg-primary/40 backdrop-blur-md
                border border-border/20
                hover:border-primary/40 transition-all duration-500
                hover:shadow-lg hover:shadow-primary/10
                hover:translate-y-[-2px] p-6"
            >
              {/* Partner Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-2">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-500">
                    {partner.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-primary/60">
                      {getIcon(partner.type)}
                    </div>
                    <span className="text-sm text-text-secondary capitalize">
                      {partner.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(partner.rating) ? 'fill-current' : 'fill-none stroke-current'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {partner.rating} ({Math.floor(Math.random() * 1000)} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-4">
                {partner.description}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {partner.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Contact Information */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary/60" />
                  {partner.location}
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <FaPhone className="w-4 h-4 text-primary/60" />
                  {partner.phone}
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <FaGlobe className="w-4 h-4 text-primary/60" />
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Visit Website
                  </a>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 