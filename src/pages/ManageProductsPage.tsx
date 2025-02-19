import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { Product } from "../types/product.types";



const ManageProductsPage = () => {

  const {user} = useAuth();

  return (
    <>
    <h1>Hantera produkter</h1>
    <h2>Välkommen, {user ? user.firstname : ""}!</h2>
    </>
  )
}

export default ManageProductsPage