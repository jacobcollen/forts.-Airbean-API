import Joi from "joi";
import { getProductById } from "../services/product.js";

const campaignSchema = Joi.object({
  products: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required()
    .custom(async (value, helpers) => {
      try {
        const productPromises = value.map(async (productId) => {
          const product = await getProductById(productId);
          if (!product) {
            throw new Error(`Product with ID ${productId} does not exist`);
          }
        });
        await Promise.all(productPromises);
        return value;
      } catch (error) {
        return helpers.error("any.custom", { message: error.message });
      }
    })
    .messages({
      "any.required":
        "Products array is required and must contain at least one product ID",
      "array.min": "Products array must contain at least one product ID",
      "array.base": "Products must be an array of product IDs",
      "any.custom": "Invalid product ID or product does not exist",
    }),
  campaignPrice: Joi.number().precision(2).positive().required().messages({
    "number.base": "Campaign price must be a number",
    "number.positive": "Campaign price must be a positive number",
    "any.required": "Campaign price is required",
  }),
}).options({ allowUnknown: false });

export function validateCampaign(req, res, next) {
  const { error } = campaignSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages.join(", ") });
  }
  next();
}
