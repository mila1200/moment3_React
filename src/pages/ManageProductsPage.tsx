import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { Product, ManageProductsProps } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

const ManageProductsPage: React.FC<ManageProductsProps> = ({ products, fetchProducts }) => {

  //interface för felhantering. price och units är noll för att kunna skriva ut felmeddelande
  interface ErrorInterface {
    name?: string,
    brand?: string,
    description?: string,
    price?: string,
    units?: string
  }

  //state för att hantera nya produkter
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    brand: "",
    description: "",
    price: 0,
    units: 0
  })

  //aktivera möjlighet att skriva ut användarens förnamn
  const { user } = useAuth();

  //state för felhantering
  const [error, setError] = useState<ErrorInterface>({});

  const navigate = useNavigate();

  //lägg till produkt
  const addProduct = async () => {

    const validationError: ErrorInterface = {};

    if (!newProduct.name) validationError.name = "Produktnamn krävs.";
    if (!newProduct.brand) validationError.brand = "Varumärke krävs.";
    if (!newProduct.description) validationError.description = "Beskrivning krävs.";
    if (newProduct.price <= 0) validationError.price = "Pris måste vara mer än 0.";
    if (newProduct.units <= 0) validationError.units = "Antal måste vara störr än 0.";

    //om det finns fel, uppdatera errorState och avbryt
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error;
      }

      fetchProducts();
      setNewProduct({ _id: "", name: "", brand: "", description: "", price: 0, units: 0 });
      setError({});

    } catch (error) {
      setError({ name: "Något gick fel vid skapandet av produkten." })
    }
  };

  //radera produkt
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error;
      }

      fetchProducts();
    } catch (error) {
      setError({ name: "Fel vid radering av produkt" });
    }
  }

  return (
    <>
      <h1>Hantera produkter</h1>
      <h2>Välkommen, {user ? user.firstname : ""}!</h2>

      <h3>Lägg till produkt</h3>
      <form className="inputForm" onSubmit={addProduct}>
        {error.name && <span className="errorMessage">{error.name}</span>}
        <br />
        <label className="inputLabel" htmlFor="name">Produktnamn:</label>
        <br />
        <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <br />

        {error.brand && <span className="errorMessage">{error.brand}</span>}
        <label className="inputLabel" htmlFor="brand">Varumärke:</label>
        <br />
        <input type="text" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
        <br />

        {error.description && <span className="errorMessage">{error.description}</span>}
        <label className="inputLabel" htmlFor="description">Beskrivning:</label>
        <br />
        <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <br />

        {error.price && <span className="errorMessage">{error.price}</span>}
        <label className="inputLabel" htmlFor="price">Pris:</label>
        <br />
        <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
        <br />

        {error.units && <span className="errorMessage">{error.units}</span>}
        <label className="inputLabel" htmlFor="units">Antal:</label>
        <br />
        <input type="number" value={newProduct.units} onChange={(e) => setNewProduct({ ...newProduct, units: Number(e.target.value) })} />
        <br />

        <input type="submit" value="Lägg till" />
      </form>

      <h3>Produkter</h3>
      <ProductList products={products} onDelete={deleteProduct} onEdit={(id) => navigate(`/products/${id}`)} />
    </>
  )
}

export default ManageProductsPage