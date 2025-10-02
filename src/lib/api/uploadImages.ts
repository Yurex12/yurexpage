import { ImageUploadResponse } from "@/types/types";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

export async function uploadImages(images: File[]) {
  const abortController = new AbortController();

  try {
    const uploadPromises = images.map(async (image) => {
      let authParams;

      try {
        authParams = await authenticator();
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        throw new Error("Image upload failed");
      }

      const { signature, expire, token, publicKey } = authParams;

      return upload({
        expire,
        token,
        signature,
        publicKey,
        folder: "/posts",
        file: image,
        fileName: image.name,
        abortSignal: abortController.signal,
      });
    });

    const uploadResponses: ImageUploadResponse[] = (
      await Promise.all(uploadPromises)
    ).map((res) => ({
      fileId: res.fileId!,
      name: res.name!,
      url: res.url!,
    }));

    console.log(uploadResponses);

    return {
      success: true,
      message: "All images uploaded successfully",
      data: uploadResponses,
      error: null,
    };
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
    } else {
      console.error("Upload error:", error);
    }

    return {
      success: false,
      message: "Images uploading failed",
      data: null,
      error,
    };
  }
}

const authenticator = async () => {
  try {
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
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
