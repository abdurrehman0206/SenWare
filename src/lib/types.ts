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
  purchasedAt: string;
}
export interface RecipientType {
  id: number;
  name: string;
  branchName: string;
}

export interface IssuanceType {
  id: number;
  recipientId: number;
  recipientName: string;
  recipientBranchName: string;
  quantityIssued: number;
  itemName: string;
  itemBarcode: string;
  itemImage: string;
  itemPrice: number;
  issuedAt: string;
  returned: boolean;
}
