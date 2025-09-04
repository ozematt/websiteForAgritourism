export interface User {
  id?: string;
  name?: string;
  password?: string;
}

export interface AuthCredentials {
  name: string;
  password: string;
}

export interface Property {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  pricePerNight: number | null;
  maxGuests: number | null;
  isActive: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PanelProps {
  properties: Property[];
}
