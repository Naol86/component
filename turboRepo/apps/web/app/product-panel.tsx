"use client";

import { useMemo, useState } from "react";
import { InputField } from "@repo/ui/input";
import styles from "./product-panel.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export function ProductPanel() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("No products loaded yet.");

  const canSubmit = useMemo(() => name.trim().length > 1 && Number(price) > 0, [name, price]);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = (await response.json()) as Product[];
      setProducts(data);
      setMessage(`Loaded ${data.length} product(s).`);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unexpected error";
      setMessage(`Failed to load products: ${detail}`);
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          price: Number(price),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? `Request failed with status ${response.status}`);
      }

      const created = (await response.json()) as Product;
      setProducts((prev) => [...prev, created]);
      setMessage(`Added product #${created.id}: ${created.name}`);
      setName("");
      setPrice("");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unexpected error";
      setMessage(`Failed to add product: ${detail}`);
    }
  };

  return (
    <section className={styles.panel}>
      <h2>Product Sandbox</h2>
      <p>Use shared UI input components and API integration in one place.</p>

      <div className={styles.formRow}>
        <InputField
          label="Product Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Mechanical Keyboard"
          helperText="Use at least 2 characters"
          wrapperClassName={styles.fieldWrap}
          className={styles.input}
        />
        <InputField
          label="Price (MYR)"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="299"
          helperText="Must be greater than 0"
          wrapperClassName={styles.fieldWrap}
          className={styles.input}
          min={1}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={createProduct} disabled={!canSubmit}>
          Add Product
        </button>
        <button className={styles.secondaryBtn} onClick={loadProducts}>
          Refresh List
        </button>
      </div>

      <p className={styles.message}>{message}</p>

      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>MYR {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
