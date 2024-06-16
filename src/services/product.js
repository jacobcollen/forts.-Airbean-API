import nedb from "nedb-promises";
import moment from "moment-timezone";

const database = new nedb({ filename: "product.db", autoload: true });

const defaultProducts = [
  {
    title: "Bryggkaffe",
    desc: "Bryggd på månadens bönor.",
    price: 39,
  },
  {
    title: "Caffè Doppio",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    title: "Cappuccino",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    title: "Latte Macchiato",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  {
    title: "Kaffe Latte",
    desc: "Bryggd på månadens bönor.",
    price: 54,
  },
  {
    title: "Cortado",
    desc: "Bryggd på månadens bönor.",
    price: 39,
  },
];

// Function to format date according to ISO 8601 with Swedish time zone
function formatDate(date) {
  return moment(date).tz("Europe/Stockholm").format();
}

// Add new menu item
async function createProduct(product) {
  try {
    const productWithDate = { ...product, createdAt: formatDate(new Date()) };
    const newProduct = await database.insert(productWithDate);
    console.log(newProduct);
    return newProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get all menu items
async function getAllProducts() {
  try {
    const products = await database.find({});
    return products.map((product) => ({
      ...product,
      createdAt: product.createdAt ? formatDate(product.createdAt) : undefined,
      modifiedAt: product.modifiedAt
        ? formatDate(product.modifiedAt)
        : undefined,
    }));
  } catch (error) {
    console.error(error);
  }
}

// Get specific menu item
async function getProductById(id) {
  try {
    const product = await database.findOne({ _id: id });
    if (product) {
      product.createdAt = product.createdAt
        ? formatDate(product.createdAt)
        : undefined;
      product.modifiedAt = product.modifiedAt
        ? formatDate(product.modifiedAt)
        : undefined;
    }
    return product;
  } catch (error) {
    console.error(error);
  }
}

// Update menu item
async function updateProduct(id, updatedProduct) {
  try {
    const product = await database.findOne({ _id: id });

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    const result = await database.update(
      { _id: product._id },
      { $set: { ...updatedProduct, modifiedAt: formatDate(new Date()) } }
    );

    console.log(`${product.title} has been updated`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete menu item
async function deleteProduct(id) {
  try {
    const deletedProduct = await database.remove({ _id: id });

    if (deletedProduct === 0) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    console.log(id);
    console.log(deletedProduct);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Initialize database with default data
async function initializeDatabase() {
  try {
    const count = await database.count({});
    if (count === 0) {
      for (const product of defaultProducts) {
        await createProduct(product);
      }
      console.log("Default products inserted.");
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  initializeDatabase,
};
