export class Deal {
  id: number;
  book: number;
  user: string;
  is_buyer: boolean;
  is_seller: boolean;
  constructor(usermail:string, bookisbn:number, seller:boolean) {
        this.user = usermail;
        this.book =bookisbn;
        this.is_seller = seller;
        this.is_buyer =!seller;
    }
}
