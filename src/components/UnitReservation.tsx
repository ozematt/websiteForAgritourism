import { User, Users } from "lucide-react";
import { Status } from "./StatusBadge";
import { SectionTitle, StatusBadge } from "@/components";

// Sample data
const reservations = [
  {
    id: 1,
    date: "2024-09-25",
    time: "14:00",
    client: "Jan Kowalski",
    phone: "+48 123 456 789",
    email: "jan@example.com",
    service: "Konsultacja",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-09-26",
    time: "10:30",
    client: "Anna Nowak",
    phone: "+48 987 654 321",
    email: "anna@example.com",
    service: "Sesja zdjęciowa",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-09-27",
    time: "16:15",
    client: "Piotr Wiśniewski",
    phone: "+48 555 666 777",
    email: "piotr@example.com",
    service: "Spotkanie biznesowe",
    status: "confirmed",
  },
];

const UnitReservation = () => {
  return (
    <div className="sectionContainer space-y-6">
      <SectionTitle Icon={Users} title="Ostatnie rezerwacje" />
      <div className="space-y-3">
        {reservations.slice(0, 3).map((res) => (
          <div
            key={res.id}
            className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{res.client}</p>
                <p className="text-sm text-slate-600">
                  {res.service} • {res.date} {res.time}
                </p>
              </div>
            </div>
            <StatusBadge status={res.status as Status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitReservation;
