import { Mail, mailData } from "../mailData";

export const mailDateComparer = (m1: Mail, m2: Mail) => {
  const date1 = new Date(m1.sent_date).getTime();
  const date2 = new Date(m2.sent_date).getTime();
  return date2 - date1;
};

export function getAllMails() {
  return mailData;
}
