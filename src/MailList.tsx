import mailData from "./mailData";
import MailListElement from "./MailListElement";
import "./MailList.css";

export default function MailList() {
  return (
    <>
      <h1>Mails list</h1>
      <div className="flexTable">
        <div className="flexRow headerRow">
          <div className="subject">Subject</div>
          <div className="from">From</div>
          <div className="Date">Date</div>
        </div>
        {mailData.map((mail) => {
          return <MailListElement mail={mail} />;
        })}
      </div>
    </>
  );
}
