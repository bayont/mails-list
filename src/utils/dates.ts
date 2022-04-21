import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function processDate(date: string): string {
  return dayjs().to(dayjs(date));
}
