import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleStatusTab } from "../app/cart";
import CartItem from "./CartItem";
import { getTotal } from "../app/cart";
import { useNavigate } from "react-router-dom";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
        transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}
        `}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5">
        {carts.map((item, key) => (
          <CartItem key={key} data={item} className="mb-4" />
        ))}
      </div>
      <div className="px-5 py-3 border-t border-gray-600 text-white flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-xl font-bold">Rp. {totalPrice}</span>
      </div>

      <div className="grid grid-cols-2">
        <button
          className="bg-[#433878] text-white py-3 px-4 rounded-md hover:bg-[#564c94] transition-all"
          onClick={handleCloseTabCart}
        >
          CLOSE
        </button>
        <button
          className="bg-[#E4B1F0] text-black py-3 px-4 rounded-md hover:bg-[#d7a4e3] transition-all"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartTab;
