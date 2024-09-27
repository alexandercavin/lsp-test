import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const carts = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    tableNumber: "",
    name: "",
  });

  const [checkoutObj, setCheckoutObj] = useState({
    paymentMethod: "cash",
  });
  const [cardObj, setCardObj] = useState({
    number: "",
    name: "",
    expiryDate: "",
    cvv: "",
  });
  const [errorObj, setErrorObj] = useState({
    phoneErr: [],
    addressErr: [],
    payErr: [],
    numErr: [],
    nameErr: [],
    exDateErr: [],
    cvvErr: [],
  });

  const order = () => {
    carts.map();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
    // Handle payment method change
    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setCheckoutObj({
          ...checkoutObj,
          paymentMethod: value,
        });
    
        // Reset card details when switching to cash
        if (value === "cash") {
          setCardObj({
            number: "",
            name: "",
            expiryDate: "",
            cvv: "",
          });
        }
      };
    
      // Handle card input change
      const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardObj((prevCardObj) => ({
          ...prevCardObj,
          [name]: value,
        }));
      };

  useEffect(() => {console.log(carts);}, []);

  const calculateSummaryPrice = () => {
    // Replace with your logic to calculate summary price
    return [0, 0, 0, 0]; // Example: [total, discount, tax, finalPrice]
  };

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission

  try {
    // Step 1: Create a new customer
    const customerResponse = await axios.post('http://localhost:4000/customer', {
      tableNumber: parseInt(customer.tableNumber), // Make sure to send an integer
      name: customer.name,
    });

    const idCustomer = customerResponse.data.idCustomer; // Adjust this according to your response structure

    // Step 2: Create a new order
    const orderResponse = await axios.post('http://localhost:4000/order', {
        idCustomer: idCustomer,
        orderTime: new Date(), // Assuming you want the current time
        menus: carts.map(item => ({
          idMenu: item.menuId, // Replace with the actual property name if different
          quantity: item.quantity,
        })),
      });

    const idOrder = orderResponse.data.idOrder; // Adjust this according to your response structure

    // Step 3: Create a new transaction
    const transactionData = {
      idOrder: idOrder,
      total: totalPrice, // Ensure this value is calculated beforehand
      paymentMethod: checkoutObj.paymentMethod,
    };

    // If payment method is card, add card details
    if (checkoutObj.paymentMethod === "card") {
      transactionData.cardNumber = cardObj.number;
      transactionData.cardHolderName = cardObj.name;
      transactionData.cardExpiryDate = cardObj.expiryDate;
      transactionData.cardCvv = cardObj.cvv;
    }

    const transactionResponse = await axios.post('http://localhost:4000/trans', transactionData);

    // Optionally handle the response or notify the user of success
    console.log('Transaction successful:', transactionResponse.data);
    navigate('/success')
    // Clear form or reset state if needed
    resetForm();
  } catch (error) {
    if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
  }
};

  // Function to reset the form or state
  const resetForm = () => {
    setCustomer({ tableNumber: "", name: "" });
    setCheckoutObj({ paymentMethod: "cash" });
    setCardObj({ number: "", name: "", expiryDate: "", cvv: "" });
  };

  return (
    <div className="checkout-container max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="checkout-form-container">
        <form id="checkoutForm" onSubmit={handleSubmit} noValidate>
          <div className="checkout-heading mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Few more steps to place your order
            </h3>
            <div className="checkout-heading mb-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-green-600">Order</h3>
              <div className="text-right">
                <span className="text-lg font-bold text-green-700">Total</span>
                <span className="text-2xl font-bold text-green-600 block">
                  {totalPrice}
                </span>
              </div>
            </div>
            <div className="form-group details-group mb-6">
              <input
                type="text"
                name="name" // Add name attribute
                placeholder="Enter your name"
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={customer.name} // Bind value to state
                onChange={handleInputChange} // Handle change
              />
              <input
                type="text"
                name="tableNumber" // Add name attribute
                placeholder="Enter your table number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                value={customer.tableNumber} // Bind value to state
                onChange={handleInputChange} // Handle change
              />
            </div>
          </div>
 <div className="form-group details-group mb-4">
      <h4 className="font-semibold mb-2">Payment Method</h4>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="cash"
            id="paymentCash"
            checked={checkoutObj.paymentMethod === "cash"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Cash
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="payment"
            value="card"
            id="paymentCard"
            checked={checkoutObj.paymentMethod === "card"}
            onChange={handlePaymentMethodChange}
            className="mr-2"
          />
          Card (Visa)
        </label>
      </div>

      {checkoutObj.paymentMethod === "card" && (
        <div className="mt-4">
          <div className="form-group mb-4">
            <input
              type="text"
              name="number"
              placeholder="Enter your card number"
              id="coCardNum"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={cardObj.number}
              maxLength="16"
              onChange={handleCardInputChange} // Updated to use handleCardInputChange
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="text"
              name="name"
              placeholder="Enter the name on your card"
              id="coCardName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={cardObj.name}
              onChange={handleCardInputChange} // Updated to use handleCardInputChange
            />
          </div>

          <div className="form-group mb-4">
            <label className="block mb-1">Expiry Date:</label>
            <input
              type="month"
              name="expiryDate"
              id="coCardEx"
              value={cardObj.expiryDate}
              onChange={handleCardInputChange} // Updated to use handleCardInputChange
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              id="coCardCvv"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={cardObj.cvv}
              onChange={handleCardInputChange} // Updated to use handleCardInputChange
            />
          </div>
        </div>
      )}
    </div>

          <div className="form-group">
            <input
              type="submit"
              value="CONFIRM & PAY"
              className="w-full p-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
