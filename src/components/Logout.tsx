import { logout } from "@/lib/actions/auth";

const Logout = () => {
  return (
    <form action={logout}>
      <button>Logout</button>
    </form>
  );
};

export default Logout;
