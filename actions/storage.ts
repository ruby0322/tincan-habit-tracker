"use server";

import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";

const storeImageToStorage = async (blob: Blob) => {
  const supabase = createClient();
  /* Upload picture to supabase storage */
  const filename = `dalle-image-${uuidv4()}`;
  await supabase.storage.from("image").upload(filename, blob);

  /* Retrieve avatar URL */
  const {
    data: { publicUrl },
  } = supabase.storage.from("image").getPublicUrl(filename);
  return publicUrl;
};

const listStorageImageUrls = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("image").list();
  if (error) {
    throw new Error(`Error fetching storage files: ${error.message}`);
  }
  return data?.map((storageImage) => {
    const {
      data: { publicUrl },
    } = supabase.storage.from("image").getPublicUrl(storageImage.name);
    return publicUrl;
  });
};

export { listStorageImageUrls, storeImageToStorage };
