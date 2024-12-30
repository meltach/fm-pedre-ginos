import { useContext, useEffect, useState } from "react";
import Pizza from "../Pizza";
import Cart from "../../Cart";
import { CartContext } from "../contexts";
// import lazy route
import { createLazyFileRoute } from "@tanstack/react-router";

// export const Route = createLazyFileRoute({
//   loader: () => import("./order.lazy"),
// });

export const Route = createLazyFileRoute("/order")({
  component: Order,
});






function Order() {
    const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useContext(CartContext)

  let selectedPizza
 if(!loading) {
  selectedPizza=  pizzaTypes.find(pizza => pizza.id === pizzaType)
 }
  async function fetchPizzaTypes() {
    setLoading(true)
    try {
   const response = await fetch('/api/pizzas')
   const data = await response.json()
   setLoading(false)
     setPizzaTypes(data)
    } catch {
        setLoading(false)
     console.log("error fetching")
    }

    setCart([])
  }

  useEffect(()=> {
    fetchPizzaTypes()
  }, [])

  const price = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(selectedPizza?.sizes[pizzaSize] ?? 0);

  const checkout = async () => {
    setLoading(true)
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({cart}),
    });
    setCart([]);
    setLoading(false)
  }

  return (
    <div className="order-page">
    <div className="order">
      <h2>Create Order</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        setCart([
          ...cart,
          { pizza: selectedPizza, size: pizzaSize, price },
        ]);
      }}>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
                {pizzaTypes.map(pizza => (
                    <option key={pizza.id} value={pizza.id}>
                        {pizza.name}
                    </option>
                ))}
              
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Type</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  onClick={(e) => console.log("e", e)}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  onChange={(e) => setPizzaSize(e.target.value)}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          <Pizza
            name={selectedPizza?.name ?? ""}
            description={selectedPizza?.description ?? ""}
            image={selectedPizza?.image ?? ""}
          />
      <p>{price}</p>
        </div>
      </form>
    </div>
    <Cart cart={cart} checkout={checkout} />
    </div>
  );
}