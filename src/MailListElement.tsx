import { Link } from "react-router-dom";
import { Mail } from "./mailData";

type Props = {
  mail: Mail;
};
export default function MailListElement({ mail }: Props) {
  return (
    <Link to={`mails/${mail.id}`}>
      <div className="flexRow">
        <td>{mail.subject}</td>
        <td>{mail.from}</td>
        <td>{mail.sent_date}</td>
      </div>
    </Link>
  );
}
