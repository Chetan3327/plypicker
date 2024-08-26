export type User = {
  _id: string,
  name: string,
  email: string,
  role: 'team-member' | 'admin',
}

export type Product = {
  _id: string,
  productName: string,
  price: number,
  image: string,
  productDescription: string,
  department: string,
  id: string
}

export type Review = {
  _id: string;
  productId: string;
  productName: string;
  changes: {
    productName?: string;
    productDescription?: string;
    price?: number;
    image?: string;
    department?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  authorId: string;
  adminId?: string;
  createdAt: Date;
  updatedAt: Date;
};
