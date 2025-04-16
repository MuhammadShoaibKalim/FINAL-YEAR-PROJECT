const FAQ = () => {
    return (
      <div className="mt-10 p-6 rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-4">FAQs</h3>
        {[
          { question: "Are there any additional charges when booking a lab test through LabCore?", answer: "No, there are no hidden charges." },
          { question: "Can I see my lab test results online in Pakistan?", answer: "Yes, most labs provide online reports." },
          { question: "How to check online lab reports in Pakistan?", answer: "You can check online lab reports through LabCore's dashboard." },
          { question: "How long does lab testing take for COVID?", answer: "It typically takes 24-48 hours, depending on the lab." },
          { question: "Where to find the best lab in Pakistan?", answer: "LabCore provides a list of top-rated labs across Pakistan." },
          { question: "How to book a lab test online in Pakistan?", answer: "Simply search for your test and click 'Book Now'." },
          { question: "What are the benefits of booking an online lab test in Pakistan?", answer: "Booking online offers convenience, price comparisons, and home sample collection options." }
        ].map((faq, index) => (
          <details key={index} className="mt-2 border-b pb-2">
            <summary className="font-semibold cursor-pointer hover:text-primary transition-all">{faq.question}</summary>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    );
  };
  
  export default FAQ;
  