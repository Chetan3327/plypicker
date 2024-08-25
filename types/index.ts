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