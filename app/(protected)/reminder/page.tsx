import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientComponent from "./client-component";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className='animate-in'>
      <ClientComponent />
    </div>
  );
}
