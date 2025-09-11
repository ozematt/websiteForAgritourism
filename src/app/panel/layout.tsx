import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/"); // to sign-in

  return (
    <main className="flex min-h-screen w-full flex-row">
      <p>Sidebar</p>
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 p-5 xs:p-10">
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
