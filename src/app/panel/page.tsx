import { Dashboard, Panel } from "@/components";
import { db } from "@/database/drizzle";
import { properties } from "@/database/schema";

const PanelPage = async () => {
  const propertiesData = await db.select().from(properties);
  console.log(propertiesData);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default PanelPage;
