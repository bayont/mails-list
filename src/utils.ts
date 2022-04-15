export function processDate(date: string): string {
  const dateFull = new Date(date);
  const now = new Date();
  const yearsDiff = (now.getTime() - dateFull.getTime()) / 36e5 / 24 / 365.25;
  if (yearsDiff < 1) {
    const monthsDiff = yearsDiff * 12;
    if (monthsDiff < 1) {
      const daysDiff = yearsDiff * 365.25;
      if (daysDiff < 1) {
        const hoursDiff = daysDiff * 24;
        if (hoursDiff < 1) {
          const minutesDiff = hoursDiff / 60;
          if (minutesDiff < 1)
            return `${Math.round(minutesDiff / 60)} second${
              Math.round(minutesDiff / 60) === 1.0 ? "" : "s"
            } ago`;
          else
            return `${Math.round(minutesDiff)} minute${
              Math.round(minutesDiff) === 1.0 ? "" : "s"
            } ago`;
        } else
          return `${Math.round(hoursDiff)} hour${
            Math.round(hoursDiff) === 1.0 ? "" : "s"
          } ago`;
      } else
        return `${Math.round(daysDiff)} day${
          Math.round(daysDiff) === 1.0 ? "" : "s"
        } ago`;
    } else
      return `${Math.round(monthsDiff)} month${
        Math.round(monthsDiff) === 1.0 ? "" : "s"
      } ago`;
  } else
    return `${Math.round(yearsDiff)} year${
      Math.round(yearsDiff) === 1.0 ? "" : "s"
    } ago`;
}
