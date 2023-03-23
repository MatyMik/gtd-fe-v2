export function addDays(date: Date | string | number, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}