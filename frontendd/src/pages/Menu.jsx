import React, { useEffect, useState } from 'react';
import ProductCart from '../components/ProductCart';
import { fetchMenuItems } from '../data/menu';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const items = await fetchMenuItems(); // Call the async function
        setMenuItems(items); // Set the menu items in state
      } catch (error) {
        setError("Failed to fetch menu items");
        console.error(error); // Log error for debugging
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getMenuItems(); // Fetch menu items when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div>
      <h1 className='text-3xl my-5'>List Products</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
        {menuItems.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
