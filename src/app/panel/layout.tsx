import { auth } from "@/auth";
import { Header, Sidebar } from "@/components";
import AdminPanel from "@/components/admin_panel_design_system";
import Dashboard from "@/components/Dashboard";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const properties = [
  {
    id: "1",
    name: "Domek_1",
    beds: 2,
    baths: 1,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "2",
    name: "Domek_2",
    beds: 4,
    baths: 2,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "3",
    name: "Domek_3",
    beds: 6,
    baths: 3,
    icon: "/panel_icons/house.svg",
  },
];

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/login"); // to login

  return (
    <>
      <main className="flex min-h-screen">
        {/* <Sidebar properties={properties} /> */}
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="flex w-full bg-gray-200">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </main>
      <AdminPanel />
    </>
  );
};

export default Layout;
