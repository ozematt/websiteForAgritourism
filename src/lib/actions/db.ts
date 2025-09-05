"use server";

import { db } from "@/database/drizzle";
import { galleryImages } from "@/database/schema";
import { ModifiedImageData } from "@/types";

export async function saveImages(images: ModifiedImageData[]) {
  try {
    await db.insert(galleryImages).values(images);
    return { success: true };
  } catch (error) {
    console.error("Błąd podczas zapisywania zdjęć:", error);
    return { success: false, error: "Nie udało się zapisać zdjęć" };
  }
}

// const images = await db
//   .select()
//   .from(galleryImages)
//   .where(eq(galleryImages.propertyId, propertyId))
//   .orderBy(
//     desc(galleryImages.isPrimary), // Główne zdjęcia pierwsze
//     desc(galleryImages.createdAt)  // Potem najnowsze
//   );
