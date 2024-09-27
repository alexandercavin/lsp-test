import React, { useState, useEffect } from "react";
import { fetchMenuItems } from "../data/menu";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../app/cart";

const CartItem = (props) => {
  const { menuId, quantity } = props.data;
  const cartTotal = useSelector(state => state.cart.totalPrice)
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const getMenuDetail = async () => {
      try {
        const menuItems = await fetchMenuItems(); // Fetch the menu items
        const findDetail = menuItems.find((menu) => menu.idMenu === menuId);
        console.log(cartItems);
        setDetail(findDetail); // Set the detail based on the fetched data
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };

    getMenuDetail(); // Fetch the details when the component mounts or menuId changes
  }, [menuId]);


  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        menuId: menuId,
        quantity: quantity - 1,
      })
    );
  };

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        menuId: menuId,
        quantity: quantity + 1,
      })
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    console.log(totalPrice);
    return totalPrice;
  };

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={detail.image} alt="" className="w-12" />
      <h3>{detail.menuName}</h3>
      <p>Rp. {detail.price * quantity}</p>

      <div className="w-20 flex justify-between gap-2">
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handleMinusQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
