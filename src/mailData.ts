export type Mail = {
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
  {
    id: 100795228,

    from: "Lorem Company - lorem@ipsum.pl",

    sent_date: "2022-04-11 12:21:13",

    is_unread: true,

    subject: "Potrzebujesz więcej danych do aplikacji?",

    snippet: "Sprawdź naszą ofertę",
  },
];
