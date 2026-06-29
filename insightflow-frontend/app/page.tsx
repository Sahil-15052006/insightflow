import LandingPage from "./landingpage/page";
import Dashboard from "./dashboard/page"

export default function Home() {
  return (
    <div className="bg-black bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-size-[7px_7px] text-white font-['Poppins'] dark">
      <LandingPage/>
      <Dashboard/>
    </div>
  );
}
