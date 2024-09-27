import React from "react";

const ShoppingCart = ({ items }) => {
  // Hitung total harga
  const total = items.reduce((acc, item) => {
    // Asumsi item.price sudah tersedia di props.item 
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <div className="shopping-cart">
      {/* Tampilkan list item */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity} = Rp. {item.quantity * item.price}
          </li>
        ))}
      </ul>

      {/* Tampilkan total harga */}
      <p>Total: Rp. {total}</p>
    </div>
  );
};

export default ShoppingCart;
