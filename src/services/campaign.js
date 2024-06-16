import nedb from "nedb-promises";
import { getProductById } from "./product.js";
import moment from "moment-timezone";

const campaignDatabase = new nedb({ filename: "campaign.db", autoload: true });

const defaultCampaign = [
  {
    products: ["zocZWA1ZSKahoNrS", "ntzfd0N8qvMemr5x"],
    campaignPrice: 99,
  },
];

function formatDate(date) {
  return moment(date).tz("Europe/Stockholm").format();
}

async function createCampaign(campaign) {
  try {
    // Validate that all products exist and get their details
    const products = await Promise.all(
      campaign.products.map(async (productId) => {
        const product = await getProductById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        return { _id: product._id, title: product.title };
      })
    );

    const createdAt = formatDate(new Date());
    const campaignWithDate = {
      ...campaign,
      createdAt,
      products: campaign.products,
    };
    const newCampaign = await campaignDatabase.insert(campaignWithDate);

    const responseCampaign = {
      message: "New campaign successfully created",
      campaign: {
        products,
        campaignPrice: campaign.campaignPrice,
        createdAt,
        _id: newCampaign._id,
      },
    };

    console.log(responseCampaign);

    return responseCampaign;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllCampaigns() {
  try {
    const campaigns = await campaignDatabase.find({});
    return campaigns.map((campaign) => ({
      ...campaign,
      createdAt: campaign.createdAt
        ? formatDate(campaign.createdAt)
        : undefined,
    }));
  } catch (error) {
    console.error(error);
  }
}

// Initialize campaign database with default campaigns if empty
async function initializeCampaignDatabase() {
  try {
    const count = await campaignDatabase.count({});

    if (count === 0) {
      for (const campaign of defaultCampaign) {
        await createCampaign(campaign);
      }
      console.log("Default campaigns inserted.");
    } else {
      console.log("Campaign database already initialized with data.");
    }
  } catch (error) {
    console.error("Error initializing campaign database:", error);
    throw error;
  }
}

export { createCampaign, getAllCampaigns, initializeCampaignDatabase };
