import React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../Header'
import { useState } from 'react'
import { CartContext } from '../contexts'
import PizzaOfTheDay from '../PizzaOfTheDay'
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
    const cartHook = useState([])
  return (
    <React.Fragment>
     <CartContext.Provider value={cartHook}>
        <div>
            <Header/>
            <Outlet />
           <PizzaOfTheDay/>
        </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
    </React.Fragment>
  )
}
