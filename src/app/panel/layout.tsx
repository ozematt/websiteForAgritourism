import { auth } from "@/auth";
import { Sidebar } from "@/components";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const properties = [
  {
    name: "Domek_1",
    beds: 2,
    baths: 1,
  },
  {
    name: "Domek_2",
    beds: 4,
    baths: 2,
  },
  {
    name: "Domek_3",
    beds: 6,
    baths: 3,
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
          <p>Header</p>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
