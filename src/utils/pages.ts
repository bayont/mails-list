import { Mail } from '../mailData';

export function createPages(mails: Mail[], mailsPerPage: number) {
   const newPages = [];

   for (let i = 0; i <= mails.length; i += mailsPerPage) {
      newPages.push(mails.slice(i, i + mailsPerPage));
   }

   return newPages;
}

export function getMailsCountFormatted(
   currentPage: number,
   mailsPerPage: number,
   mailsLength: number,
) {
   return `${(currentPage + 1) * mailsPerPage + 1 - mailsPerPage}-${
      (currentPage + 1) * mailsPerPage > mailsLength
         ? mailsLength
         : (currentPage + 1) * mailsPerPage
   } of ${mailsLength}`;
}
