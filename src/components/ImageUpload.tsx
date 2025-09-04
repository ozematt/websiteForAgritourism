"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  UploadResponse,
  Image,
  ImageKitProvider,
} from "@imagekit/next";
import { useRef, useState } from "react";
import ImagesContainer from "./ImagesContainer";

const ImageUpload = () => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
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

  // if (fileInputRef.current?.files) {
  //   setFileSelected(true);
  // } else {
  //   setFileSelected(false);
  // }

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a files to upload");
      return;
    }

    // files array
    const filesArray = Array.from(fileInput.files);

    // Retrieve authentication parameters for the upload.
    // run upload function for each file
    filesArray.map(async (file) => {
      let authParams;
      try {
        authParams = await authenticator();
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
      }
      const { signature, expire, token, publicKey } = authParams;

      // Call the ImageKit SDK upload function with the required parameters and callbacks.
      try {
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name, // Optionally set a custom file name
          // Progress callback to update upload progress state
          // onProgress: (event) => {
          //   setProgress((event.loaded / event.total) * 100);
          // },
          // Abort signal to allow cancellation of the upload if needed.
          abortSignal: abortController.signal,
        });
        setImages((prevImages) => [...prevImages, uploadResponse]);
        setFileSelected(false);
      } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitAbortError) {
          console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
          console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
          console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
          console.error("Server error:", error.message);
        } else {
          // Handle any other errors that may occur.
          console.error("Upload error:", error);
        }
      }
    });
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
  console.log(images);

  return (
    <>
      {/* File input element using React ref */}
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        onChange={handleFileSelect}
        multiple
      />
      <button
        type="button"
        onClick={fileSelected ? handleUpload : handleRefButton}
      >
        {fileSelected ? "Upload file" : "Dodaj zdjęcie"}
      </button>
      <br />

      {/* Display the current upload progress */}
      {/* Upload progress: <progress value={progress} max={100}></progress> */}
      <ImagesContainer data={images} />
    </>
  );
};

export default ImageUpload;
