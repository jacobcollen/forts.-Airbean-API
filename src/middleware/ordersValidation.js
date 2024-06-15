import Joi from "joi";

const orderSchema = Joi.object({
  orderId: Joi.number().integer().min(1).required(),
  userId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ),
  totalPrice: Joi.number().required(),
  orderTime: Joi.string().required(),
  deliveryTime: Joi.string().required(),
});

export const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (!error) {
    next();
  } else {
    return res.status(400).json({ error: error.details[0].message });
  }
};
