import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const ProgressBar = ({ habit_id }: { habit_id: string }) => {
    const progress = 50;
    // progress 要改成目前 habit 的進度
    return (
        <div className="bg-blue-500">
            <Progress value={progress}/>
            <div className="px-4">{progress.toString() + " %"}</div>
        </div>
    )
}

export default ProgressBar;