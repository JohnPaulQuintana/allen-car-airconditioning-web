import Header from "../components/Admin/Header";
import MobileTabs from "../components/Admin/MobileTabs";
import Sidebar from "../components/Admin/Sidebar";


interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <Header />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <MobileTabs />
      </div>
    </div>
  );
}