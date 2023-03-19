import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarContainer } from "./components"; // a plugin!

export const Calendar = () => {

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
      />
    </CalendarContainer>
  );
};
