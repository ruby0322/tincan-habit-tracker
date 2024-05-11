"use server";
import { listStorageImageUrls } from "@/actions/storage";
import Image from "next/image";

const StoragePage = async () => {
  const imageFilenames = await listStorageImageUrls();
  return (
    <div className='flex flex-col items-center gap-8'>
      <h2>所有生成過的圖片都會被自動儲存至 Supabase Storage！</h2>
      <div className='grid  grid-cols-2 w-fit gap-8'>
        {imageFilenames?.map((url) => (
          <div
            className='w-full h-full flex items-center justify-center'
            key={url}
          >
            <Image
              height='256'
              width='256'
              src={url}
              alt='Tin can image generated by DALLE'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoragePage;
