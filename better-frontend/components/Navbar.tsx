import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Better.com</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/calculator" className="hover:underline">Calculator</Link>
          <Link href="/start" className="hover:underline">Start</Link>
        </div>
      </div>
    </nav>
  );
}
