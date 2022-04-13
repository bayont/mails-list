import { useParams } from "react-router-dom";
import mailData from "./mailData";

export default function MailDetails() {
  const { mailId } = useParams();
  if (mailId === undefined || mailId === "") {
    return <>User undefined!</>;
  }
  const mailArray = mailData.filter((m) => m.id.toString() === mailId);
  if (mailArray.length < 1) {
    return <>User not found!</>;
  }
  const mail = mailArray[0];
  return (
    <>
      <h1>Mail Details</h1>
      <div className="mailDetails">
        <h2>Subject: {mail.subject}</h2>
        <div className="sentFrom">From {mail.from}</div>
        <div className="sentTo">to me</div>
        <div className="sentDate">sent date: {mail.sent_date}</div>
        <div className="snippet">{mail.snippet}</div>
      </div>
    </>
  );
}
