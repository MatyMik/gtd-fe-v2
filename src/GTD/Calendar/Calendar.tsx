import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarContainer } from "./components";
import { useGetNextActions } from "../GTD.api";
import { NextActionType } from "../GTD.types";

export const Calendar = () => {
  const { data: nextActions, isFetching } = useGetNextActions(undefined);
  const events = nextActions?.map((action: NextActionType) => ({
    title: action.name,
    date: action.deadline
  })) || [];
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
      />
    </CalendarContainer>
  );
};
