import { CalendarColorTextContainer, CalendarContainer } from "./components";

export const CalendarIcon = ({ date }: CalendarIconProps) => {
  const month = new Date(date).toString().slice(4, 7);
  const day = new Date(date).toString().slice(8, 10);
  const overdue = new Date(date).getTime() < new Date().getTime();
  const dayOfWeek = new Date(date).toString().slice(0, 3);

  return (
    <CalendarContainer overdue={overdue}>
      <CalendarColorTextContainer overdue={overdue}>{month}</CalendarColorTextContainer>
      <div>{day}</div>
      <CalendarColorTextContainer overdue={overdue}>{dayOfWeek}</CalendarColorTextContainer>
    </CalendarContainer>
  );
};

type CalendarIconProps = {
  date: number;
}