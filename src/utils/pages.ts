import { Mail } from '../mailData';

export function createPages(mails: Mail[], mailsPerPage: number) {
   const newPages = [];
   for (let i = 0; i <= mails.length; i += mailsPerPage) {
      newPages.push(mails.slice(i, i + mailsPerPage));
   }
   return newPages;
}
