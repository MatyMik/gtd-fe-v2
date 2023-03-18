export const convertDateString = (fullDate: string) => {
  const date = fullDate.slice(0, 10);
  const time = fullDate.slice(11, 16);
  return `${date} ${time}`;
};