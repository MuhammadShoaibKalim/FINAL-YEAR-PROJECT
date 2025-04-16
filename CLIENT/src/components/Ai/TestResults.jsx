const TestResults = ({ tests }) => {
    return (
      <div className="space-y-4 animate-fade-up">
        <h2 className="text-2xl font-semibold text-gray mb-4">Recommended Tests</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tests.map((test, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{test.name}</span>
                <span className="text-teal-100 font-bold">{test.accuracy}%</span>
              </div>
              <p className="text-gray-700 mt-2">{test.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TestResults;
  