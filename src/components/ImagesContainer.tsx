// import { ImageKitUploadResponse } from "@/types";
import { Image, ImageKitProvider, UploadResponse } from "@imagekit/next";

interface ImagesContainerProp {
  data: UploadResponse[];
}

const ImagesContainer = ({ data }: ImagesContainerProp) => {
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
    >
      <div className="flex flex-wrap">
        {data.map((image, index) => (
          <Image
            key={index}
            src={image.filePath!}
            width={200}
            height={200}
            alt="Picture of the author"
          />
        ))}
      </div>
    </ImageKitProvider>
  );
};

export default ImagesContainer;
