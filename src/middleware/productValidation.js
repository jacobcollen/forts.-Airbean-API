export function validateProduct(req, res, next) {
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return res
      .status(400)
      .json({ message: "All fields are required: title, desc, price" });
  }

  if (typeof price !== "number") {
    return res.status(400).json({ message: "Price must be a number" });
  }

  next();
}
