"use client";
import config from "@/lib/config";
import { Image, ImageKitProvider } from "@imagekit/next";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = () => {
  return (
    <ImageKitProvider
      urlEndpoint={config.env.imagekit.urlEndpoint}
    ></ImageKitProvider>
  );
};

export default ImageUpload;
