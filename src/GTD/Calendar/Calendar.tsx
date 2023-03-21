import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarContainer } from "./components";
import { useGetNextActions } from "../GTD.api";
import { NextActionType } from "../GTD.types";
import { useState } from "react";
import { EventClickArg } from "@fullcalendar/core";
import { NextActionDetails } from "../Modals/next-action-details/next-action-details";
import { EditNextActionModal } from "../Modals/add-next-action-modal/edit-next-action-modal";

export const Calendar = () => {
  const { data: nextActions, isFetching } = useGetNextActions(undefined);
  const events = nextActions?.map((action: NextActionType) => ({
    title: action.name,
    date: action.deadline,
    id: action.id,
    description: action.description
  })) || [];
  const [selectedNextAction, setSelectedNextAction] = useState<number | undefined>(undefined);
  const [isNextActionModalOpen, setIsNextActionModalOpen] = useState<boolean>(false);
  const [isEditNextActionModalOpen, setIsEditNextActionModalOpen] = useState<boolean>(false);
  const handleNextActionClick = (clickEvent: EventClickArg) => {
    const nextActionId = Number(clickEvent.event.id);
    setSelectedNextAction(nextActionId);
    setIsNextActionModalOpen(true);
  };
  const editHandler = () => {
    setIsNextActionModalOpen(false);
    setIsEditNextActionModalOpen(true);
  };
  const selectedNextActionData: NextActionType = nextActions?.find((action: NextActionType) => action.id === selectedNextAction);
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={events}
        headerToolbar={{
          left: "prev next",
          center: "title",
          right: "dayGridWeek dayGridDay dayGridMonth listWeek timeGridWeek" // user can switch between the two
        }}
        eventClick={handleNextActionClick}
      />
      {isNextActionModalOpen && (
        <NextActionDetails
          closeHandler={() => setIsNextActionModalOpen(false)}
          nextAction={selectedNextActionData}
          editHandler={editHandler} />)}
      {isEditNextActionModalOpen ? <EditNextActionModal
        originalNextActionTitle={selectedNextActionData?.name}
        originalNextActionId={selectedNextAction!}
        originalTags={selectedNextActionData?.tags}
        originalDeadline={selectedNextActionData?.deadline}
        originalDescription={selectedNextActionData?.description}
        closeModal={() => setIsEditNextActionModalOpen(false)} /> : null}
    </CalendarContainer>
  );
};
