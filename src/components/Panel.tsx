import { signOut } from "@/auth";
import { PanelProps } from "@/types";
import ImageUpload from "./ImageUpload";

const Panel = ({ properties }: PanelProps) => {
  // console.log(properties);

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Logout</button>
      </form>
      <ImageUpload />
    </>
  );
};

export default Panel;
