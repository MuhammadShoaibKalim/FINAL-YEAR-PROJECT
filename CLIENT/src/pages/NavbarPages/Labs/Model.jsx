export default function Modal({ lab, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative transform transition-all scale-100 hover:scale-[1.02] duration-200">
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
  
          {/* Rating - Top Left */}
          <p className="absolute top-3 left-3 font-semibold bg-yellow-400 text-black px-4 py-1 rounded-full shadow-md">
            ⭐ {lab.rating}
          </p>
  
          {/* Image and Text */}
          <div className="flex items-center mt-8 space-x-6">
            {/* Image on the Left */}
            <img
              src={lab.image}
              alt={lab.name}
              className="w-32 h-32 rounded-xl object-cover shadow-lg border border-gray-200"
            />
  
            {/* Name and Description */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{lab.name}</h3>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {lab.description}
              </p>
            </div>
          </div>
  
          {/* Founder Name - Bottom Right */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="font-medium text-gray-700">Founder: <span className="text-gray-900 font-semibold">{lab.founder}</span></p>
          </div>
        </div>
      </div>
    );
  }