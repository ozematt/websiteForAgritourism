"use client";
import { ModifiedImageData, PanelProps } from "@/types";
import { ImageUpload, Logout } from "@/components";
import { useState } from "react";

import { UploadResponse } from "@imagekit/next";
import toast from "react-hot-toast";
import { saveImages } from "@/lib/actions/db";
import { useRouter } from "next/navigation";

const Panel = ({ properties }: PanelProps) => {
  // DATA
  const [selectedProperty, setSelectedProperty] = useState("");
  const [imageData, setImageData] = useState<ModifiedImageData[]>([]);

  const router = useRouter();
  // console.log(selectedProperty);

  // LOGIC
  const handleImageData = (data: UploadResponse[]) => {
    if (!selectedProperty) {
      toast.error("Najpierw wybierz obiekt!");
      return;
    }

    const propertyId = Number(selectedProperty);
    // console.log(propertyId);

    const imageArray: ModifiedImageData[] = data.map((image, index) => {
      return {
        propertyId: propertyId,
        imageUrl: image.url,
        thumbnailUrl: image.thumbnailUrl,
        caption: "Added by admin",
        isPrimary: index === 0,
      };
    });

    setImageData((prevData) => [...prevData, ...imageArray]);
    // console.log("Nowe zdjęcia:", imageArray);
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
      router.refresh();
    } else {
      toast.error(result.error || "Coś poszło nie tak");
    }
  };

  // UI
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
            value={selectedProperty}
          >
            <option value="">wybierz</option>
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
