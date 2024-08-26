import { NextResponse } from 'next/server';
import Product from '@/models/product';
import connect from '@/lib/connect';

connect();

// CREATE a new product
export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const newProduct = new Product(reqBody);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product', error }, { status: 500 });
  }
}

// READ all products
export async function GET() {
  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 500 });
  }
}

// UPDATE a product by ID
export async function PUT(req: Request) {
  try {
    const reqBody = await req.json();
    const { id, ...updateData } = reqBody;

    const updatedProduct = await Product.findOneAndUpdate({id}, {$set: updateData}, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product', error }, { status: 500 });
  }
}

// DELETE a product by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product', error }, { status: 500 });
  }
}
