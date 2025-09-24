"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createSlug } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
// import { properties } from '@/database/schema';

import { House, Settings } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logout from "./Logout";

interface Property {
  id: string;
  name: string;
  icon: string;
  beds: number;
  baths: number;
  slug?: string;
}

interface Props {
  properties: Property[];
}

const properties = [
  {
    id: "1",
    name: "Domek_1",
    beds: 2,
    baths: 1,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "2",
    name: "Domek_2",
    beds: 4,
    baths: 2,
    icon: "/panel_icons/house.svg",
  },
  {
    id: "3",
    name: "Domek_3",
    beds: 6,
    baths: 3,
    icon: "/panel_icons/house.svg",
  },
];

const Sidebar = () => {
  const params = usePathname();
  console.log(params.split("/")[2]);

  const [activeTab, setActiveTab] = useState(params.split("/")[2] || "/panel");

  return (
    <aside className="bg-sidebar-bg flex h-screen w-100 flex-col p-6 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">AdminPanel</h1>
        <p className="text-sm text-slate-400">System zarządzania</p>
      </div>

      <nav className="space-y-2">
        <Link
          href={"/panel"}
          onClick={() => setActiveTab("/panel")}
          className={`mb-5 flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
            activeTab === "/panel"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Settings size={20} />
          Panel
        </Link>
        <p className="text-xs text-slate-400">Obiekty</p>
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/panel/${createSlug(property.name)}`}
            onClick={() => setActiveTab(createSlug(property.name))}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
              activeTab === createSlug(property.name)
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <House size={20} />
            {property.name}
          </Link>
        ))}
      </nav>
      <Logout />
    </aside>
  );
};

export default Sidebar;
