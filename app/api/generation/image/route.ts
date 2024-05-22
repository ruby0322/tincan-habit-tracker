import { storeImageToStorage } from "@/actions/storage";
import openai from "@/utils/openai";

// Types for request data
interface RequestData {
  title: string;
  completionStreak?: string; // Received as string if parsed from JSON
  failureStreak?: string;
}

// Types for response object
interface ApiResponse {
  imageUrl?: string;
  error?: string;
  details?: string;
}

export const maxDuration = 30;
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function POST(request: Request): Promise<Response> {
  // Ensure the request content type is JSON
  if (request.headers.get("Content-Type") !== "application/json") {
    const errorResponse: ApiResponse = { error: "Invalid content type" };
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const requestData = (await request.json()) as RequestData;
    const title = requestData.title;
    const completionStreak = parseInt(requestData.completionStreak ?? "0", 10);
    const failureStreak = parseInt(requestData.failureStreak ?? "0", 10);

    const prompt = `Minimalism, 
    kid's rough abstract line sketch of a half-opened tin can with big eyes and limbs,
    pastel sticks,
    messy simplicity thick and casual brush strokes,
    fat,
    sitting,
    ${title},
    ${
      completionStreak != 0 || failureStreak != 0
        ? completionStreak > 0
          ? "happy"
          : "sad"
        : ""
    }`;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const res = await fetch(response.data[0].url as string);
    const imageBlob = await res.blob();
    const storageImageUrl = await storeImageToStorage(imageBlob);

    const successResponse: ApiResponse = { imageUrl: storageImageUrl };
    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "An unknown error occurred";
    const errorResponse: ApiResponse = {
      error: "Error in processing request",
      details: message,
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
