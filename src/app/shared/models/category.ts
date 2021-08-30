export interface Category {
  id: number;
  title?: string;
  color?: string;
}

export enum Categories {
  GENERAL = 'General',
  INBOX = 'Inbox',
  WORK = 'Work',
  PERSONAL = 'Personal',
  SOCIAL = 'Social',
};
