const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const users = ["John", "Mark"];

// //que1
const logUsers = (req, res, next) => {
  if (users.length) {
    console.log(users);
    next();
  } else {
    next("err");
  }
};

// //que2
app.use(logUsers);

// //que3
// const logMethod = (req, res, next) => {
//   console.log(req.method);
//   next();
// };

// app.get("/users", logMethod, (req, res, next) => {
//   res.json(users);
// });

// //que4
// app.use(express.json());
// //que5
// app.use((err, req, res, next) => {
//   console.log("No users");
//   next();
// });

//PRACTICE

//QUE1
const authRouter = express.Router();

authRouter.use((req, res, next) => {
  res.json(users);
  next();
});

const exist = (req, res, next) => {
  if (req.body !== {}) {
    console.log(req.body);
    next();
  } else {
    console.log("no user");
  }
};

//QUE2
authRouter.use("/create", exist, (req, res, next) => {
  users.push(req.body);
  next();
});

app.use("/users", authRouter);

//QUE3
const productRouter = express.Router();

//QUE4
const products = ["keyboard", "mouse"];
productRouter.use("/update", (req, res, next) => {
  products[0] = req.body;
  console.log(req.body);
  res.json(products);
});

app.use("/products", productRouter);

//QUE5

// app.use("/products",(req,res)=>{
//   console.log('products router');
// });

productRouter.use("", (req, res) => {
  console.log("products router");
});
//QUE6
app.use("*", (req, res) => {
  next(errr);
});

app.use((errr, req, res, next) => {
  res.status(404);
  res.json("NOT FOUND");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
