// import MyCalendar from "@/components/UnitCalendar";
import { UnitCalendar, UnitGallery, UnitReservation } from "@/components";
import { Calendar, Plus } from "lucide-react";

const UnitPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return (
    <div className="space-y-6">
      <UnitCalendar />
      <UnitReservation />
      <UnitGallery />
    </div>
  );
};

export default UnitPage;
