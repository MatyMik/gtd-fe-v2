import { useCreateMyDay } from "./my-days.api";
import { MyDayContainer } from "./components";
import { DayPicker } from "../common/day-picker/DayPicker";
import { useState } from "react";

export const MyDays = () => {
  const myDay = {
    date: new Date(),
    hours: [{ toDos: [{ description: "test" }], breakActions: [{ nextAction: 1 }] }]
  };
  const [createMyDay] = useCreateMyDay();

  const createMyDayHandler = async () => {
    await createMyDay(myDay);
  };

  const [day, setDay] = useState(new Date((new Date()).setHours(0, 0, 0, 0)));
  return <MyDayContainer>
    <DayPicker date={day} onDateChange={setDay} />
  </MyDayContainer>;
};