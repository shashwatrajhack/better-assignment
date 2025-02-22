import Navbar from "../components/Navbar";

export default function Start() {
  return (
    <>
      <Navbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold">Start Your Application</h1>
        <p className="mt-4 text-gray-600">
          Begin your journey to homeownership with us.
        </p>
      </main>
    </>
  );
}
