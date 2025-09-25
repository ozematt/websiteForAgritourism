import { logout } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";

const Logout = () => {
  return (
    <form action={logout}>
      <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-slate-300 hover:bg-slate-800">
        <LogOut />
        Wyloguj
      </button>
    </form>
  );
};

export default Logout;
