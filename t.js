const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

let products = [];
let idCounter = 1;

// GET - Отримати всі товари
app.get('/products', (req, res) => {
    res.json(products);
});

// POST - Додати новий товар
app.post('/products', (req, res) => {
    const product = {
        id: idCounter++,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        category: req.body.category
    };
    products.push(product);
    res.status(201).json(product);
});

// PATCH - Оновити товар
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.size) product.size = req.body.size;
    if (req.body.category) product.category = req.body.category;

    res.json(product);
});

// DELETE - Видалити товар
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});