import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { properties } from '@/database/schema';

interface Property {
  name: string;
  beds: number;
  baths: number;
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
        <p className="text-xl font-semibold">Panel</p>
      </div>
      <div className="mt-4 border-t border-dotted border-gray-400"></div>
      <div className="pt-4">
        {properties.map((property) => (
          <div
            key={property.name}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-blue-100"
          >
            <img src="#" alt="icon" />
            <div>
              <p className="text-lg font-bold">{property.name}</p>
              <p className="text-sm">
                {property.beds} Beds · {property.baths} Baths
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
