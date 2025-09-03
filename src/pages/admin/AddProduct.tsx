import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';

const AddProduct: React.FC = () => {
  const { addProduct } = useApp();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: Date.now().toString(),
      name,
      price,
      category,
      description,
      images: [],
      variants: [],
      tags: [],
      stockLevel: 10,
      lowStockAlert: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      isFreeShipping: false
    } as any;

    addProduct(product);
    setName(''); setPrice(0); setCategory('Electronics'); setDescription('');
    alert('Product added to local database');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Add Product (Local DB)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="w-full p-3 border rounded" />
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" className="w-full p-3 border rounded" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="w-full p-3 border rounded" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded" />
        <button className="px-4 py-2 bg-teal-600 text-white rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
