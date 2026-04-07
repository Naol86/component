import express from "express";

type Product = {
	id: number;
	name: string;
	price: number;
};

const app = express();
const port = 8080;

app.use(express.json());

const products: Product[] = [
	{ id: 1, name: "Starter Notebook", price: 25 },
	{ id: 2, name: "Mechanical Keyboard", price: 299 },
];

app.get("/", (_req, res) => {
	res.json({ message: "API is healthy" });
});

app.get("/products", (_req, res) => {
	res.json(products);
});

app.post("/products", (req, res) => {
	const name = String(req.body?.name ?? "").trim();
	const price = Number(req.body?.price);

	if (name.length < 2) {
		return res.status(400).json({ message: "name must be at least 2 characters" });
	}

	if (!Number.isFinite(price) || price <= 0) {
		return res.status(400).json({ message: "price must be a positive number" });
	}

	const created: Product = {
		id: products.length ? products[products.length - 1]!.id + 1 : 1,
		name,
		price,
	};

	products.push(created);
	return res.status(201).json(created);
});

app.listen(port, () => {
	console.log(`API running on port ${port}`);
});
