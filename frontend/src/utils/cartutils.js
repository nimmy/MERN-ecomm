
export const addDecimals = (num) => {
    return (Math.round(num * 100) /100).toFixed(2);
}

export const updateCart = (state) => {

    // Calculate the item price
    state.itemPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    //Shipping Price - if your order is $100 then your shipping charge in $10
    state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

    // tax price is 15%
    state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

    // canculate total Price
    state.TotalPrice = ( Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}