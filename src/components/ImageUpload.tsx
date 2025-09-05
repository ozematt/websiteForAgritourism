"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { ImagesContainer } from "@/components";
import toast from "react-hot-toast";

interface ImageUploadProps {
  callback: (images: UploadResponse[]) => void;
}

const ImageUpload = ({ callback }: ImageUploadProps) => {
  // State to keep track of the current upload progress (percentage)
  // const [progress, setProgress] = useState(0);
  const [fileSelected, setFileSelected] = useState(false);
  const [images, setImages] = useState<UploadResponse[]>([]);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  //imagekit auth function
  const authenticator = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/imagekit`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a files to upload");
      return;
    }

    // files array
    const filesArray = Array.from(fileInput.files);

    try {
      // fetch auth param once
      const authParams = await authenticator();
      const { signature, expire, token, publicKey } = authParams;

      // create promises array with all files for upload
      const uploadPromises = filesArray.map(async (file) => {
        try {
          const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name,
            abortSignal: abortController.signal,
          });
          return uploadResponse;
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          throw error; // throw error for Promise.all
        }
      });

      // Wait for all uploads
      const uploadResults = await Promise.all(uploadPromises);

      // update images state with all results
      setImages((prevImages) => [...prevImages, ...uploadResults]);
      callback(images);
      setFileSelected(false);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
        toast.error("Upload został przerwany przez użytkownika");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
        toast.error("Nieprawidłowe dane pliku");
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
        toast.error("Problem z połączeniem internetowym");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
        toast.error("Błąd serwera podczas uploadu");
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
        toast.error("Wystapił nieoczekiwany błąd");
      }
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
  };

  const handleRefButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // console.log(images);

  return (
    <>
      {/* Upload image logic */}
      <div>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          onChange={handleFileSelect}
          multiple
        />
        <button
          className="ring-1"
          type="button"
          onClick={fileSelected ? handleUpload : handleRefButton}
        >
          {fileSelected ? "Upload file" : "Dodaj zdjęcie"}
        </button>
        <br />

        {/* Display the current upload progress */}
        {/* Upload progress: <progress value={progress} max={100}></progress> */}
      </div>

      <ImagesContainer data={images} />
    </>
  );
};

export default ImageUpload;
