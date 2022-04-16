const Jabber = require("jabber");
const fs = require("fs");

const jabber = new Jabber([
  "SzybkiInternet ;)",
  "Piękny UI w twojej okolicy.",
  "Jak wyjść z Vim?",
  "jak zostać programistą?",
  "politechnika gdańska",
  "bayont",
  "react",
  "ktoś to czyta? :O",
  "to tylko testowe dane",
  "nie wiem co tu wpisać :/",
]);
let toGenerate;
try {
  toGenerate = parseInt(process.argv[2]);
  if (isNaN(toGenerate)) throw "";
} catch (err) {
  console.log(
    `Usage: ${process.argv[0]} ${process.argv[1]} [number of mails to generate]`
  );
  process.exit();
}

const dateFrom = 1250133389000;
const dateTo = 1650133389000;
const randomDateAndId = () => {
  return Math.floor(Math.random() * (dateTo - dateFrom)) + dateFrom;
};

const mails = [];
for (let i = 0; i < toGenerate; i++) {
  const newMail = {
    id: randomDateAndId(),
    from: jabber.createEmail(),
    sent_date: new Date(randomDateAndId()).toUTCString(),
    is_unread: Math.round(Math.random()) == 1,
    snippet: jabber.createParagraph(7),
    subject: jabber.createParagraph(7),
  };
  mails.push(newMail);
}

const finalMailData = `export type Mail = {
    id: number;
    from: string;
    sent_date: string;
    is_unread: boolean;
    subject: string;
    snippet: string;
  };
  
  export const mailData: Mail[] = [
    {
      id: 100795229,
  
      from: "Kalkulator OC/AC - Onet mailingi@onet.pl",
  
      sent_date: "2021-12-13 09:00:03",
  
      is_unread: false,
  
      subject: "Zaoszczędź! OC już od 230 zł",
  
      snippet: "",
    },
  
    {
      id: 100795227,
  
      from: "Walutomat - Onet mailingi@onet.pl",
  
      sent_date: "2021-12-13 09:00:02",
  
      is_unread: false,
  
      subject: "Wymień walutę szybko i tanio",
  
      snippet: "Odbierz 50% rabatu na wymianę online",
    },
    ${mails.map((mail) => JSON.stringify(mail).replace(/"([^"]+)":/g, "$1:"))}
  ];
  `;

try {
  fs.writeFileSync("./src/mailData.ts", finalMailData);
  console.log(`Wyeksportowano ${toGenerate} maili do plik ./src/mailData.ts`);
} catch (ex) {
  console.error(ex);
}
