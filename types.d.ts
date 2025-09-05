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

export interface ModifiedImageData {
  id?: string;
  propertyId: string | SQL<unknown>;
  imageUrl: string | SQL<unknown>;
  thumbnailUrl: string | SQL<unknown>;
  caption: string | null;
  order: number;
  isPrimary: boolean;
  createdAt?: Date;
}
