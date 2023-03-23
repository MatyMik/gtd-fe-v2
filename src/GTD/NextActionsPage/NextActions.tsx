import { useGetNextActions } from "../GTD.api";
import { NextActionsHeader, NextActionsMain } from "./components";
import { Suspense, useState } from "react";
import { Spinner } from "../../common/Spinner/Spinner";
import { GTDStrings } from "../GTD.strings";
import { DayPicker } from "../../common/day-picker/DayPicker";

export const NextActions = () => {
  const { data: nextActions, isFetching, isError } = useGetNextActions("");
  const [date, setDate] = useState(new Date((new Date()).setHours(0, 0, 0, 0)));
  const onDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  return <NextActionsMain>
    <NextActionsHeader>{GTDStrings.NEXT_ACTIONS}</NextActionsHeader>
    <DayPicker date={date} onDateChange={onDateChange} />
    <Suspense fallback={<Spinner />}>
      {!isFetching ? nextActions?.map((nextAction) => {
        if (!((new Date(nextAction.deadline)).setHours(0, 0, 0, 0) == date.getTime())) {
          return null;
        }
        return (<div
            key={nextAction.id}>{nextAction.name}</div>
        );
      }) : null
      }
    </Suspense>
  </NextActionsMain>;

};