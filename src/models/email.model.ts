export interface IEmailItem {
  id: number;
  title: string;
  isSpam: boolean;
  text: string;
  author: string;
  sentTs: number;
}
