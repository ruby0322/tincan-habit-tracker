'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface CalendarBarProps {
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
}

const CalendarBar: React.FC<CalendarBarProps> = ({ onMonthChange, onYearChange }) => {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    const lastMonth = () => {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }
    const nextMonth = () => {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    }

    useEffect(() => {
        onMonthChange(month);
    }, [month, onMonthChange]);

    useEffect(() => {
        onYearChange(year);
    }, [year, onYearChange]);

    return (
        <div className="flex justify-center">
            <Button onClick={lastMonth} className="mr-12">{"<"}</Button>
            <Button variant="secondary" size="lg" className="px-16">{year.toString() + '.' + (month+1).toString()}</Button>
            <Button onClick={nextMonth} className="ml-12">{">"}</Button>
        </div>
    )
}

export { CalendarBar };