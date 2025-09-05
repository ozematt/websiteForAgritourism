"use client";
import { ModifiedImageData, PanelProps } from "@/types";
import { ImageUpload, Logout } from "@/components";
import { useState } from "react";

import { UploadResponse } from "@imagekit/next";
import toast from "react-hot-toast";
import { saveImages } from "@/lib/actions/db";

const Panel = ({ properties }: PanelProps) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [imageData, setImageData] = useState<ModifiedImageData[]>([]);

  const handleImageData = (data: UploadResponse[]) => {
    if (!selectedProperty) {
      toast.error("Najpierw wybierz obiekt!");
      return;
    }

    const imageArray: ModifiedImageData[] = data.map((image, index) => {
      return {
        propertyId: selectedProperty,
        imageUrl: image.url,
        thumbnailUrl: image.thumbnailUrl,
        caption: null,
        order: index,
        isPrimary: index === 0,
      };
    });

    setImageData((prevData) => [...prevData, ...imageArray]);
    console.log("Nowe zdjęcia:", imageArray);
  };

  const handleSubmit = async () => {
    if (imageData.length === 0) {
      toast.error("Dodaj najpierw jakieś zdjęcia!");
      return;
    }

    const result = await saveImages(imageData);

    if (result.success) {
      toast.success("Zdjęcia zostały zapisane!");
      setImageData([]); // wyczyść stan po zapisie
    } else {
      toast.error(result.error || "Coś poszło nie tak");
    }
  };

  return (
    <>
      <div className="">
        <form
          action={handleSubmit}
          className="ring-2 ring-amber-800 flex flex-col justify-center items-center gap-3"
        >
          <p>wybierz obiekt</p>
          <select
            name="property"
            id="property"
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-amber-200"
          >
            <option value={-1}>wybierz</option>
            {properties.map((property, index) => (
              <option key={index} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <p>zdjęcia które chcesz dodać:</p>
            <ImageUpload onImageUpload={handleImageData} />
          </div>
          <button type="submit" className="bg-amber-700 p-3">
            Submit
          </button>
        </form>
        <Logout />
      </div>
    </>
  );
};

export default Panel;
