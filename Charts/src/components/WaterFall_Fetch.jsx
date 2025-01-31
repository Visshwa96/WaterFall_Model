import React, { useState, useEffect } from "react";
import WaterfallGraph from "./WaterFall_Plot";

// Original data table
const originalData = [
  { month: "May-24", May_24: 3525, Jun_24: 4825, Jul_24: 5482, Aug_24: 2980, Sep_24: 3500, Oct_24: 3500, Nov_24: null, Dec_24: null, Jan_24: null },
  { month: "Jun-24", May_24: null, Jun_24: 4814, Jul_24: 5293, Aug_24: 5004, Sep_24: 4890, Oct_24: 3500, Nov_24: 3800, Dec_24: null, Jan_24: null },
  { month: "Jul-24", May_24: null, Jun_24: null, Jul_24: 4814, Aug_24: 5293, Sep_24: 5004, Oct_24: 4890, Nov_24: 3500, Dec_24: 3800, Jan_24: null },
  { month: "Aug-24", May_24: null, Jun_24: null, Jul_24: null, Aug_24: 5920, Sep_24: 4667, Oct_24: 5796, Nov_24: 4205, Dec_24: 3700, Jan_24: 4884 }
];

// Function to calculate intermediate values
const calculateIntermediateValues = (data) => {
  let intermediateValues = [];

  // Iterate through each month starting from the first row (May-24)
  for (let i = 0; i < data.length; i++) {
    const currentMonth = data[i].month;

    // We only calculate the diagonal values for the main months (May, Jun, Jul, etc.)
    for (const key in data[i]) {
      if (key !== "month" && data[i][key] !== null) {
        const monthLabel = key.replace("_", "-");

        // Check if it's the first row (no previous row to calculate difference)
        if (i === 0) {
          // Keep the value as is for May-24 (first row)
          if (key === "May_24") {
            intermediateValues.push({
              month: "May-24",
              intermediateValue: data[i][key]
            });
          }
        
        } 
        else {
          // Get current and previous diagonal values
          const currentDiagonalValue = data[i][key];
          const previousDiagonalValue = data[i - 1][key] !== null ? data[i - 1][key] : 0;

          // Calculate the difference for the intermediate value
          let intermediateValue = currentDiagonalValue - previousDiagonalValue;

          // If intermediate value is zero, use the current diagonal value itself
          if (intermediateValue === 0) {
            intermediateValue = currentDiagonalValue;
          }

          // Ensure unique month labels and push calculated values
          if (!intermediateValues.some(e => e.month === monthLabel)) {
            intermediateValues.push({
              month: monthLabel,
              intermediateValue: intermediateValue
            });
          }
        }
      }
    }
  }

  return intermediateValues;
};

function WaterFall_Fetch() {
  const [intermediateData, setIntermediateData] = useState([]);

  // Calculate the intermediate values dynamically
  useEffect(() => {
    const calculatedValues = calculateIntermediateValues(originalData);
    setIntermediateData(calculatedValues);
  }, []);

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Intermediate Values with Waterfall Chart</h1>

      {/* Original Data Table */}
      <h2 className="text-xl font-bold mb-2">Original Data Table</h2>
      <table className="table-auto border-collapse border border-gray-500 mb-8">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Month</th>
            <th className="border border-gray-500 px-4 py-2">May-24</th>
            <th className="border border-gray-500 px-4 py-2">Jun-24</th>
            <th className="border border-gray-500 px-4 py-2">Jul-24</th>
            <th className="border border-gray-500 px-4 py-2">Aug-24</th>
            <th className="border border-gray-500 px-4 py-2">Sep-24</th>
            <th className="border border-gray-500 px-4 py-2">Oct-24</th>
            <th className="border border-gray-500 px-4 py-2">Nov-24</th>
            <th className="border border-gray-500 px-4 py-2">Dec-24</th>
            <th className="border border-gray-500 px-4 py-2">Jan-24</th>
          </tr>
        </thead>
        <tbody>
          {originalData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-500 px-4 py-2">{row.month}</td>
              <td className="border border-gray-500 px-4 py-2">{row.May_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Jun_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Jul_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Aug_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Sep_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Oct_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Nov_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Dec_24 ?? '-'}</td>
              <td className="border border-gray-500 px-4 py-2">{row.Jan_24 ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Final Table with Intermediate Values */}
      <h2 className="text-xl font-bold mb-2">Final Table with Intermediate Values</h2>
      <table className="table-auto border-collapse border border-gray-500 mb-8">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Month</th>
            <th className="border border-gray-500 px-4 py-2">Intermediate Value</th>
          </tr>
        </thead>
        <tbody>
          {intermediateData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-500 px-4 py-2">{row.month}</td>
              <td className="border border-gray-500 px-4 py-2">{row.intermediateValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Waterfall Chart */}
      <h2 className="text-xl font-bold mb-2">Waterfall Chart</h2>
      <WaterfallGraph data={intermediateData} />
    </div>
  );
}

export default WaterFall_Fetch;
