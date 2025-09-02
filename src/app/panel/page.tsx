import AuthForm from "@/components/AuthForm";
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import { signInWithCredentials } from "@/lib/actions/auth";

const PanelPage = async () => {
  // const admin = await db.select().from(user);
  // console.log(JSON.stringify(admin, null, 2));

  return (
    <div className="absolute inset-0 grid place-content-center gap-7">
      <h1 className="text-2xl font-bold">Wprowadź dane logowania:</h1>
      <div className="">
        <AuthForm onSubmit={signInWithCredentials} />
      </div>
    </div>
  );
};

export default PanelPage;
