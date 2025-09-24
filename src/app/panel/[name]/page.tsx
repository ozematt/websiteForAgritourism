import MyCalendar from "@/components/Calendar";
import { Calendar, Plus } from "lucide-react";

const UnitPage = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;

  return (
    <>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            <h2 className="text-xl font-bold text-slate-900">
              Kalendarz rezerwacji
            </h2>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            <Plus size={20} />
            Nowa rezerwacja
          </button>
        </div>

        <MyCalendar />
      </div>
    </>
  );
};

export default UnitPage;
