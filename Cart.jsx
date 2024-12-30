import React from 'react'
 const format = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

const Cart = ({cart, checkout}) => {
    // console.log(cart)
    const total = cart.reduce((acc, item) => {
         return acc + item.pizza.sizes[item.size]
    }, 0)
    return (
        <div className="cart">
          <h2>Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span className="size">{item.size}</span> –
                <span className="type">{item.pizza.name}</span> –
                <span className="price">{item.price}</span>
              </li>
            ))}
          </ul>
          <p>Total: {format(total)}</p>
          <button onClick={checkout}>Checkout</button>
        </div>
      );
}

export default Cart