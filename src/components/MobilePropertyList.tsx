"use client";

import { createSlug } from "@/lib/helpers";
import { Building2, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PropertyLink from "./PropertyLink";

const properties = [
  {
    id: "1",
    name: "Domek_1",
  },
  {
    id: "2",
    name: "Domek_2",
  },
  {
    id: "3",
    name: "Domek_3",
  },
];

const MobilePropertyList = () => {
  // DATA
  const pathname = usePathname();

  // UI
  return (
    <section className="mb-6 transform rounded-2xl bg-white p-4">
      <div className="mb-6 flex items-center gap-2">
        <Building2 size={20} />

        <h3 className="text-lg font-semibold text-slate-900">Obiekty</h3>
      </div>
      <div className="flex flex-col gap-3">
        {properties.map((property) => (
          <PropertyLink key={property.id} property={property} mobile />
        ))}
      </div>
    </section>
  );
};

export default MobilePropertyList;
