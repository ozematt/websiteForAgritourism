import AuthForm from "@/components/AuthForm";
import React from "react";

const PanelPage = () => {
  return (
    <div className="absolute inset-0 grid place-content-center gap-7">
      <h1 className="text-2xl font-bold">Wprowadź dane logowania:</h1>
      <div className="">
        <AuthForm />
      </div>
    </div>
  );
};

export default PanelPage;
