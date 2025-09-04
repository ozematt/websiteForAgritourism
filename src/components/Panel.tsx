import { signOut } from "@/auth";
import { PanelProps } from "@/types";

const Panel = ({ properties }: PanelProps) => {
  console.log(properties);

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
