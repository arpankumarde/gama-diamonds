import { ImagePlus, Play, Video } from "lucide-react";
import { Input } from "@/components/ui/input";

type ProductMediaUploadRowProps = {
  fieldPrefix: string;
  images: string[];
  video: string;
  imageNames: string[];
  videoName: string;
  imageUploading: boolean[];
  videoUploading: boolean;
  videoPreviewImage?: string;
  onImageChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductMediaUploadRow({
  fieldPrefix,
  images,
  video,
  imageNames,
  videoName,
  imageUploading,
  videoUploading,
  videoPreviewImage,
  onImageChange,
  onVideoChange,
}: ProductMediaUploadRowProps) {
  return (
    <div className="space-y-3 md:col-span-2">
      <div>
        <p className="text-sm font-semibold text-black">Product media</p>
        <p className="mt-1 text-sm text-gray-500">
          Upload 3 images and 1 video. Image 1 is the main product image.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {images.map((image, index) => {
          const inputId = `${fieldPrefix}-image-${index + 1}`;
          const isMain = index === 0;

          return (
            <div
              key={inputId}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <label
                htmlFor={inputId}
                className="flex cursor-pointer items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2"
              >
                <span className="text-sm font-semibold text-black">
                  Image {index + 1}
                </span>
                {isMain ? (
                  <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    Main
                  </span>
                ) : null}
              </label>

              <label
                htmlFor={inputId}
                className="flex cursor-pointer flex-col p-3"
              >
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  {image ? (
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center text-gray-400">
                      <ImagePlus className="h-5 w-5" />
                      <span className="mt-2 text-xs font-medium">
                        Upload image
                      </span>
                    </div>
                  )}
                </div>

                <span className="mt-3 truncate text-xs text-gray-500">
                  {imageUploading[index]
                    ? "Uploading..."
                    : imageNames[index] || "Choose image file"}
                </span>
              </label>

              <Input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={(event) => onImageChange(index, event)}
                className="hidden"
              />
            </div>
          );
        })}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <label
            htmlFor={`${fieldPrefix}-video`}
            className="flex cursor-pointer items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2"
          >
            <span className="text-sm font-semibold text-black">Video</span>
            <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Product
            </span>
          </label>

          <label
            htmlFor={`${fieldPrefix}-video`}
            className="flex cursor-pointer flex-col p-3"
          >
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
              {video ? (
                <div className="relative h-full w-full">
                  {videoPreviewImage ? (
                    <img
                      src={videoPreviewImage}
                      alt="Video preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                      <Video className="h-5 w-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/25" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-black shadow-sm">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center text-gray-400">
                  <Video className="h-5 w-5" />
                  <span className="mt-2 text-xs font-medium">
                    Upload video
                  </span>
                </div>
              )}
            </div>

            <span className="mt-3 truncate text-xs text-gray-500">
              {videoUploading ? "Uploading..." : videoName || (video ? "Current video" : "Choose video file")}
            </span>
          </label>

          <Input
            id={`${fieldPrefix}-video`}
            type="file"
            accept="video/*"
            onChange={onVideoChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
