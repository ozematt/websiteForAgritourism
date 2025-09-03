import { auth } from "@/auth";
import AuthForm from "@/components/AuthForm";
import Panel from "@/components/Panel";
import { signInWithCredentials } from "@/lib/actions/auth";

const PanelPage = async () => {
  const session = await auth();

  return (
    <div className="absolute inset-0 grid place-content-center gap-7">
      <h1 className="text-2xl font-bold">Wprowadź dane logowania:</h1>
      <div className="">
        {session ? <Panel /> : <AuthForm onSubmit={signInWithCredentials} />}
      </div>
    </div>
  );
};

export default PanelPage;
