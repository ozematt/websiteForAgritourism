import { auth } from "@/auth";
import {
  Header,
  MobileHeader,
  MobilePropertyList,
  Sidebar,
} from "@/components";
// import MobileUnits from "@/components/MobilePropertyList";
import MobileAdminPanel from "@/components/nextjs_mobile_admin";
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
        <div className="block lg:hidden">
          <MobileHeader />
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="hidden lg:block">
            <Header />
          </div>
          <div className="flex w-full bg-gray-200 pt-18 lg:pt-0">
            <div className="w-full p-6">
              <div className="block lg:hidden">
                <MobilePropertyList />
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
      {/* <MobileAdminPanel /> */}
    </>
  );
};

export default Layout;
