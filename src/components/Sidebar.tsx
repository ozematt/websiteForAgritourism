import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createSlug } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
// import { properties } from '@/database/schema';

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

const Sidebar = ({ properties }: Props) => {
  return (
    <div className="w-full max-w-[250px] p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-semibold">Admin</p>
          <p className="text-xs">Jan Kowalski</p>
        </div>
      </div>

      <Separator className="mt-4 mb-4" />

      <div className="">
        <p className="mb-2 text-xs opacity-50">Obiekty:</p>
        {properties.map((property) => (
          <Link
            href={`/panel/${createSlug(property.name)}`}
            key={property.id}
            className="flex items-center gap-4 rounded-md p-3 transition-colors hover:bg-blue-100"
          >
            <div className="relative h-6 w-6 flex-shrink-0">
              <Image
                src={property.icon}
                alt={`Ikona ${property.name}`}
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{property.name}</p>
              <p className="text-xs opacity-50">
                {property.beds} Beds · {property.baths} Baths
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
