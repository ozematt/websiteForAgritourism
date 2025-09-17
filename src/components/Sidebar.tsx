import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
// import { properties } from '@/database/schema';

interface Property {
  name: string;
  beds: number;
  baths: number;
  icon: string;
  id: number;
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
        <p className="pb-4 text-xs opacity-50">Obiekty:</p>
        {properties.map((property) => (
          <Link
            href={String(property.id)}
            key={property.name}
            className="flex items-center gap-4 rounded-md p-3 hover:bg-blue-100"
          >
            <Image
              src={property.icon}
              alt="icon"
              width={24}
              height={24}
              loading="eager"
            />
            <div>
              <p className="font-bold">{property.name}</p>
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
