import type { NextApiRequest, NextApiResponse } from "next";

interface MortgageResponse {
  principal: number;
  interestRate: number;
  years: number;
  monthlyPayment: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MortgageResponse | { error: string }>
) {
  try {
    const data: MortgageResponse = {
      principal: 200000,
      interestRate: 3.5,
      years: 30,
      monthlyPayment: 898.09, // Example calculated value
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error); // ✅ Logs the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // ✅ Sends an error response
  }
}

