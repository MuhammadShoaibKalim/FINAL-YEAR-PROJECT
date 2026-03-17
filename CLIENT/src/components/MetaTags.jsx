import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({ title, description, keywords }) => {
  const siteTitle = "TestSahulat | Medical Diagnostics & Lab Tests in Pakistan";
  const fullTitle = title ? `${title} | TestSahulat` : siteTitle;
  const defaultDesc = "Book laboratory tests online in Pakistan with TestSahulat. Compare prices, get home sampling, and download secure medical reports.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || "medical tests, lab tests pakistan, blood test home sampling, diagnostic center, health checkup"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
};

export default MetaTags;
