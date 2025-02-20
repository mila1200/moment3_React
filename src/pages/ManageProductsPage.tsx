import { useState, useEffect } from "react"
import { Product } from "../types/product.types"
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  //interface för felhantering
  interface ErrorInterface {
    name?: string,
    brand?: string,
    description?: string,
    price?: string,
    units?: string
  }

  //states för att lagra datan i formuläret
  const [formData, setFormData] = useState<Product>({
    name: "",
    brand: "",
    description: "",
    price: 0,
    units: 0
  })

  //state för produkterna i listan
  const [products, setProducts] = useState<Product[]>([]);

  //felmeddelande för formuläret
  const [formError, setFormError] = useState<ErrorInterface>({})

  //felmeddelande för listan
  const [listError, setListError] = useState<string | null>(null);

  //felmeddelande för radera
  const [deleteError, setDeleteError] = useState<string | null>(null);

  //validerar inmatad data
  const validateForm = (data: Product) => {

    const validationError: ErrorInterface = {};

    if (!data.name) {
      validationError.name = "Du måste ange ett namn";
    }

    if (!data.brand) {
      validationError.brand = "Du måste ange ett varumärke";
    }
    if (!data.description) {
      validationError.description = "Du måste ange en beskrivning";
    }
    if (data.price < 0) {
      validationError.price = "Priset måste vara högre än 0";
    }
    if (data.units > 100000) {
      validationError.units = "Du kan inte lägga till fler än 100.000"
    }

    return validationError;
  }

  //aktivera navigering
  const navigate = useNavigate();

  //hämtar listan 
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error;
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setListError("Fel vid inhämtning av produkter.")
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  const addProduct = async (event: any) => {
    //förhindrar sidomladdning
    event.preventDefault();

    const validationError = validateForm(formData);

    if (Object.keys(validationError).length > 0) {
      setFormError(validationError);
    } else {
      setFormError({});
    }

    //post-anrop
    try {
      const res = await fetch("http://localhost:5000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Det blev ett fel: " + res.status);
      }

      fetchProducts();

      setFormData({
        name: "",
        brand: "",
        description: "",
        price: 0,
        units: 0
      })

    } catch (error) {
      setFormError({ name: "Det gick inte att lägga till produkten." })
    }
  }

  //radera produkt
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch("http://localhost:5000/product/" + id, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error;
      }

      fetchProducts()
    } catch (error) {
      setDeleteError("Det gick inte att radera posten.")
    }
  }

  //för att uppdatera produkt
  const editProduct = (id:string) => {
    navigate("/manageproducts/" + id);
  }

  //loopar igenom produkter och skriver ut dem i en tabell
  return (
    <>
      <div>
        <h1>Välkommen</h1>
        <h2>Produkter i lager</h2>
        <div className="errorMessage">{listError && <p>{listError}</p>}</div>
        <table>
          <thead>
            <tr>
              <th>Produktnamn</th>
              <th>Varumärke</th>
              <th>Beskrivning</th>
              <th>Pris</th>
              <th>Antal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.units}</td>
                <td>
                  {/*testar om det finns id eftersom id är ?*/}
                  <button onClick={() => product._id && editProduct(product._id)}>Redigera</button>
                  <button onClick={() => product._id && deleteProduct(product._id)}>Radera</button>
                </td>
                {deleteError && <span className="errorMessage">{deleteError}</span>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Lägg till produkt</h2>
        <form className="inputForm" onSubmit={addProduct}>
          <label className="inputLabel" htmlFor="name"><strong>Varunamn:</strong></label><br />
          <input type="text" name="name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
          <br />
          {formError.name && <span className="errorMessage">{formError.name}</span>}

          <label className="inputLabel" htmlFor="brand"><strong>Varumärke:</strong></label><br />
          <input type="text" name="brand" value={formData.brand} onChange={(event) => setFormData({ ...formData, brand: event.target.value })} />
          <br />
          {formError.brand && <span className="errorMessage">{formError.brand}</span>}

          <label className="inputLabel" htmlFor="description"><strong>Beskrivning:</strong></label><br />
          <textarea name="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
          <br />
          {formError.description && <span className="errorMessage">{formError.description}</span>}

          <label className="inputLabel" htmlFor="price"><strong>Pris:</strong></label><br />
          <input type="number" name="price" value={formData.price} onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })} />
          <br />
          {formError.price && <span className="errorMessage">{formError.price}</span>}

          <label className="inputLabel" htmlFor="units"><strong>Antal:</strong></label><br />
          <input type="number" name="units" value={formData.units} onChange={(event) => setFormData({ ...formData, units: Number(event.target.value) })} />
          <br />
          {formError.units && <span className="errorMessage">{formError.units}</span>}

          <input type="submit" value="Lägg till" />
        </form>
      </div>
    </>

  );
};

export default HomePage