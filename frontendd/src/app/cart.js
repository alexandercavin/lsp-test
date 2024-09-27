import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false,
    total : 0
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const {menuId, quantity, price} = action.payload;
            const indexMenuId = (state.items).findIndex(item => item.menuId === menuId);
            if(indexMenuId >= 0){
                state.items[indexMenuId].quantity += quantity;
            }else{
                state.items.push({menuId, quantity, price});
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
            cartSlice.caseReducers.getTotal(state);
        },
        changeQuantity(state, action){
            const {menuId, quantity} = action.payload;
            const indexMenuId = (state.items).findIndex(item => item.menuId === menuId);
            if(quantity > 0){
                state.items[indexMenuId].quantity = quantity;
            }else{
                state.items = (state.items).filter(item => item.menuId !== menuId);
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
            cartSlice.caseReducers.getTotal(state);
        },
        toggleStatusTab(state){
            if(state.statusTab === false){
                state.statusTab = true;
            }else{
                state.statusTab = false;
            }
        },
        getTotal(state) {
            // Calculate total price
            state.totalPrice = state.items.reduce((total, item) => {
                return total + (item.price || 0) * item.quantity;
            }, 0);
        }
    }
})
export const { addToCart, changeQuantity, toggleStatusTab, getTotal } = cartSlice.actions;
export default cartSlice.reducer;