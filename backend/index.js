import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dqz0uwu>",
  database: "test",
});

app.use(express.json()); // this is super important in order to be able to pass JSON using the client
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

// Get all the books in the db

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add one book from the client side

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO `test`.`books` (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  // in order to test this with actual values you can just add an element into Postman such as
  // {
  //   "title": "Title from client",
  //   "desc": "Description fron client",
  //   "price": "20",
  //   "cover": "Cover from client"
  // }

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created succesfully");
  });
});

// Delete one record

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE (id = ?)";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted succesfully");
  });
});

// Update record

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated succesfully");
  });
});

// check connection
app.listen(8800, () => {
  console.log("Connected to backend!");
});
