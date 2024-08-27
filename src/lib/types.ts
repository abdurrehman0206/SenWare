export interface LinkType {
  id: number;
  path: string;
  name: string;
  icon: any;
}

export interface ItemType {
  id: number;
  name: string;
  brand: string;
  vendor: string;
  price: number;
  image: string;
  quantity: number;
  issued: number;
  categoryName: string;
}
export interface RecipientType {
  id: number;
  name: string;
  branchName: string;
}
