import { useGetNextActions } from "../GTD.api";
import { NextActionsHeader, NextActionsMain } from "./components";
import { Suspense, useState } from "react";
import { Spinner } from "../../common/Spinner/Spinner";
import { GTDStrings } from "../GTD.strings";
import { DayPicker } from "../../common/day-picker/DayPicker";

export const NextActions = () => {
  const { data: nextActions, isFetching, isError } = useGetNextActions("");
  const [date, setDate] = useState(new Date());
  const onDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  return <NextActionsMain>
    <NextActionsHeader>{GTDStrings.NEXT_ACTIONS}</NextActionsHeader>
    <DayPicker date={date} onDateChange={onDateChange} />
    <Suspense fallback={<Spinner />}>
      {isFetching ? nextActions?.map((nextAction) => <div key={nextAction.id}>{nextAction.title}</div>) : null}
    </Suspense>
  </NextActionsMain>;

};