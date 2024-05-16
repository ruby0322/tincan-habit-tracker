"use server";

import Calendar from "./calendar";
import SelectHabit from "./select-habit";

const ReportPage = () => {
  return (
    <div className="flex justify-center align-center">
      <SelectHabit/>
      {/* <Calendar/> */}
    </div>
  );
};

export default ReportPage;
