import { useState, useEffect } from "react";

interface MortgageData {
  principal: number;
  interestRate: number;
  years: number;
  monthlyPayment: number;
}

export default function Home() {
  const [principal, setPrincipal] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [years, setYears] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [data, setData] = useState<MortgageData | null>(null);

  const calculateMortgage = () => {
    const r = interestRate / 100 / 12;
    const n = years * 12;
    const payment = (principal * r) / (1 - Math.pow(1 + r, -n));
    setMonthlyPayment(payment);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const result: MortgageData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Better.com Mortgage Calculator</h1>
      
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Calculate Your Mortgage</h2>
        
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="border p-2 rounded"
            placeholder="Loan Amount"
          />
          
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="border p-2 rounded"
            placeholder="Interest Rate (%)"
          />
          
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border p-2 rounded"
            placeholder="Loan Term (years)"
          />
          
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={calculateMortgage}
          >
            Calculate
          </button>
        </div>
        
        {monthlyPayment !== null && (
          <p className="mt-4 text-lg font-bold">
            Estimated Monthly Payment: ${monthlyPayment.toFixed(2)}
          </p>
        )}
      </div>

      {data && (
        <div className="mt-6 p-4 bg-gray-200 rounded w-96 text-center">
          <h2 className="text-lg font-semibold">Fetched Data</h2>
          <p>Principal: ${data.principal}</p>
          <p>Interest Rate: {data.interestRate}%</p>
          <p>Years: {data.years}</p>
          <p>Monthly Payment: ${data.monthlyPayment}</p>
        </div>
      )}
    </div>
  );
}
