'use server'

import { createClient } from "@/utils/supabase/server";

export default async function PlaygroundPage () {
    
    const supabase = createClient();
    const { data, error } = await supabase.from('test').select('*')

    console.log()
    console.log("Test data:", data);
    console.log("Error:", error);


    if(error) {
        console.error("Error fetching data", error.message);
        return <div>Error fetching data</div>;
    }

    return(
        <div>
            <h1>Playground</h1>
            <div>
                {data.map((t, i) => (
                    <li key={i}>{t.content}</li>
                ))}
            </div>
        </div>
    ) 
}