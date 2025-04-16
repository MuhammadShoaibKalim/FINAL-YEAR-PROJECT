export const labsData = [
    {
      id: 1,
      name: "Chughtai Lab",
      title: "Comprehensive Diagnostic Services",
      owner:"Dr. Ali Raza",
      description: "Providing accurate and reliable medical testing with state-of-the-art technology.",
      location: "Downtown, Cityville",
      address: "123 Main Street, Cityville, USA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGAsf8yMLqUm_-ioqq6FU5evnqXQVb6m1FSanKY3Bwerbar3gvS2AltR02hXA68XOg1sk&usqp=CAU",
      rating: 4.7,
      tests: [
        { id: 101, name: "Complete Blood Count (CBC)", price: 30, rating: 4.5, description: "A test to evaluate overall health.", bookedCount: 120, viewedCount: 300 },
        { id: 102, name: "Liver Function Test (LFT)", price: 50, rating: 4.7, description: "Assess liver health and function.", bookedCount: 80, viewedCount: 220 },
        { id: 103, name: "Thyroid Test (TSH, T3, T4)", price: 45, rating: 4.6, description: "Check thyroid hormone levels.", bookedCount: 90, viewedCount: 250 }
      ],
      packages: [
        { id: 201, name: "Full Body Checkup", price: 120, rating: 4.8, description: "Comprehensive health screening.", bookedCount: 150, viewedCount: 350 },
        { id: 202, name: "Diabetes Screening", price: 80, rating: 4.6, description: "Check for diabetes risk factors.", bookedCount: 100, viewedCount: 270 }
      ]
    },
    {
      id: 2,
      name: "Shukat Khanum Medical Lab",
      title: "Advanced Medical Testing",
      owner:"Dr. Abrahim ALi ",
      description: "Offering a wide range of lab tests for better health management.",
      location: "Uptown, Metropolis",
      address: "456 Health Avenue, Metropolis, USA",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbaLXVIKVo1WB1nKssCFmZ9lBu7iTnnfGa3w&s",
      rating: 4.5,
      tests: [
        { id: 104, name: "Kidney Function Test", price: 40, rating: 4.4, description: "Evaluates kidney performance.", bookedCount: 70, viewedCount: 200 },
        { id: 105, name: "Vitamin D Test", price: 35, rating: 4.3, description: "Measures vitamin D levels.", bookedCount: 60, viewedCount: 180 }
      ],
      packages: [
        { id: 203, name: "Cardiac Health Package", price: 140, rating: 4.9, description: "Heart health assessment.", bookedCount: 130, viewedCount: 320 }
      ]
    }
  ];