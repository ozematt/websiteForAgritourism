import { auth } from "@/auth";
import { Sidebar } from "@/components";
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
      <main className="flex min-h-screen ring-1">
        <Sidebar properties={properties} />
        <div className="flex w-full ring-1 ring-red-500">
          <div className="w-full p-4 ring-2">
            <p className="text-2xl font-semibold">Dzień dobry, Jan Kowalski</p>
            <p className="text-xs opacity-50">
              Sprawdź rezerwacji w danym obiekcie
            </p>
            <Separator className="mt-4 mb-4" />
            {children}
          </div>
          {/* <p>Header</p> */}
        </div>
      </main>
    </>
  );
};

export default Layout;
