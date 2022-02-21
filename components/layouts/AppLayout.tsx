import { CommandBar, Navbar } from "components/common";
import Layout from "./Layout";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout>
      <Navbar />
      <main className="container mx-auto mt-8 px-2 md:px-0">
        <CommandBar />
        {children}
      </main>
    </Layout>
  );
};

export default AppLayout;
