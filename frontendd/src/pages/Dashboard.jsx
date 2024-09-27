import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchMenuItems } from "../data/menu";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // State to track which menu item is being edited
  const [newStock, setNewStock] = useState(""); // State to hold the new stock value

  useEffect(() => {
    const getMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        setError("Failed to fetch menu items");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMenuItems();
  }, []);

  const handleEditClick = (id, currentStock) => {
    setEditingId(id); // Set the ID of the menu item being edited
    setNewStock(currentStock); // Pre-fill the current stock value in the input
  };

  const handleStockChange = (e) => {
    setNewStock(e.target.value); // Update state as user types
  };

  const handleUpdateStock = async (idMenu) => {
    try {
      const response = await axios.put(`http://localhost:4000/menu/edit/${idMenu}`, {
        stock: newStock,
      });
      // Update the local state with the updated menu item
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.idMenu === idMenu ? { ...item, stock: newStock } : item
        )
      );
      setEditingId(null); // Clear the editing ID
      setNewStock(""); // Clear the new stock value
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li
            key={item.idMenu}
            className="menu-item mb-2 p-2 border border-gray-300 rounded"
          >
            <h2 className="font-semibold">{item.menuName}</h2>
            <p className="text-gray-600">Price: Rp. {item.price}</p>
            <p className="text-gray-600">Category: {item.category}</p>
            <p className="text-gray-600">Stock: {item.stock}</p>
            {editingId === item.idMenu ? (
              <>
                <input
                  type="number"
                  value={newStock}
                  onChange={handleStockChange}
                  className="border p-1 rounded"
                />
                <button
                  onClick={() => handleUpdateStock(item.idMenu)}
                  className="bg-blue-500 text-white p-1 rounded ml-2"
                >
                  Update Stock
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEditClick(item.idMenu, item.stock)}
                className="bg-yellow-500 text-white p-1 rounded"
              >
                Edit Stock
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
