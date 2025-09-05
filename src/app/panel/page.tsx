import { auth } from "@/auth";
import { AuthForm, Panel } from "@/components";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";
import { signInWithCredentials } from "@/lib/actions/auth";

const PanelPage = async () => {
  const session = await auth();

  const propertiesData = await db.select().from(properties);
  // console.log(propertiesData);

  return (
    <>
      {session ? (
        <Panel properties={propertiesData} />
      ) : (
        <AuthForm onSubmit={signInWithCredentials} />
      )}
    </>
  );
};

export default PanelPage;
