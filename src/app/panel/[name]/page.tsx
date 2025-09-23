import MyCalendar from "@/components/Calendar";
import Image from "next/image";

const UnitPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return (
    <>
      <div className="rounded-panel-medium bg-gray-50 p-4">
        <div className="flex items-center gap-4 py-4">
          <div className="relative h-6 w-6 flex-shrink-0">
            <Image
              src={"/panel_icons/calendar.svg"}
              alt={`Ikona kalendarza`}
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <p className="truncate font-bold">Kalendarz</p>
        </div>
        <MyCalendar />
      </div>
    </>
  );
};

export default UnitPage;
