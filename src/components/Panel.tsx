import { signOut } from "@/auth";

const Panel = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Logout</button>
    </form>
  );
};

export default Panel;
