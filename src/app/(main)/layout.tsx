import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
