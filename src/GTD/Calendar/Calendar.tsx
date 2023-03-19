import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
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
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
        headerToolbar={{
          left: "prev,next, ",
          center: "title",
          right: "dayGridWeek dayGridDay dayGridMonth listWeek timeGridWeek" // user can switch between the two
        }}
      />
    </CalendarContainer>
  );
};
