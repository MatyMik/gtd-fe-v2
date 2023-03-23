import React from "react";
import { DayPickerButton, DayPickerContainer, DayPickerDate } from "./components";
import { addDays } from "../helpers/add-day";

export const DayPicker = React.memo(function DayPicker({ date, onDateChange }: DayPickerProps) {
  const dayChangeHandler = (day: number) => {
    const newDate = addDays(date, day);
    onDateChange(newDate);
  };
  return <DayPickerContainer>
    <DayPickerButton onClick={() => dayChangeHandler(-1)}>Prev</DayPickerButton>
    <DayPickerDate>{date.toDateString()}</DayPickerDate>
    <DayPickerButton onClick={() => dayChangeHandler(1)}>Next</DayPickerButton>
  </DayPickerContainer>;
});

type DayPickerProps = {
  date: Date;
  onDateChange: (date: Date) => void;
}