import { useState } from "react";

export default function Calculator() {
  const [principal, setPrincipal] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [years, setYears] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const r = interestRate / 100 / 12;
    const n = years * 12;
    const payment = (principal * r) / (1 - Math.pow(1 + r, -n));
    setMonthlyPayment(payment);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-lg font-semibold">Mortgage Calculator</h2>
      <div className="flex flex-col gap-4">
        <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="border p-2" placeholder="Loan Amount" />
        <input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="border p-2" placeholder="Interest Rate (%)" />
        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="border p-2" placeholder="Loan Term (years)" />
        <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={calculateMortgage}>Calculate</button>
      </div>
      {monthlyPayment && <p className="mt-4 text-lg font-bold">Estimated Monthly Payment: ${monthlyPayment.toFixed(2)}</p>}
    </div>
  );
}
