import { useCreateMyDay } from "./my-days.api";
import { MyDayContainer } from "./components";

export const MyDays = () => {
  const myDay = {
    date: new Date(),
    hours: [{ toDos: [{ description: "test" }], breakActions: [{ nextAction: 1 }] }]
  };
  const [createMyDay] = useCreateMyDay();

  const createMyDayHandler = async () => {
    await createMyDay(myDay);
  };
  return <MyDayContainer>
    createMyday
  </MyDayContainer>;
};