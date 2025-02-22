import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">About Better.com</h1>
      <p className="mt-4 text-gray-700 max-w-lg text-center">
        Better.com is an online mortgage lender that simplifies home loans.
      </p>
      <Link href="/" className="mt-6 text-blue-600">Back to Home</Link>
    </div>
  );
}
