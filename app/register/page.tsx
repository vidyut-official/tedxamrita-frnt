import Navbar from "@/components/Navbar";
import RegisterCard from "@/components/RegisterCard";

export default function RegisterPage() {
  return (
    <main className="relative bg-black text-white min-h-screen ">

    <Navbar scrolled={true} />

      {/* Register Card Component */}
      <RegisterCard />

    </main>
  );
}