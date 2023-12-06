import * as QRCode from "qrcode";
import * as fs from "fs";
import path from "path";

export async function generateQRCode(data, folder, filename) {
  try {
    const filePath = path.join(folder, filename);
    const qrCodeBuffer = await QRCode.toBuffer(data);
    fs.writeFileSync(filePath, qrCodeBuffer);
    console.log(`QR code generated and saved to ${filename}`);
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}

const startPoint = () => {
  const linksToGenerate = [
    {
      data: "https://www.bettercallpaul.world/tour-and-experience",
      filename: "tours_experience.png",
    },
    {
      data: "https://www.bettercallpaul.world/travel-and-coincierge",
      filename: "travel_concierge.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/private-chef",
      filename: "private_chef.png",
    },
    {
      data: "https://www.bettercallpaul.world/drinks",
      filename: "drinks.png",
    },
    {
      data: "https://www.bettercallpaul.world/fitness-and-wellness",
      filename: "wellness_grooming.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/shopping",
      filename: "shopping_groceries.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/nanny-service",
      filename: "nanny.png",
    },
    {
      data: "https://www.bettercallpaul.world/rentable",
      filename: "rentables.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/gift-shop",
      filename: "gift_shop.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/luggage",
      filename: "luggage.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/property-management",
      filename: "property_management.png",
    },
    {
      data: "https://www.bettercallpaul.world/services/house-keeping",
      filename: "house-keeping.png",
    },
  ];

  const outPutFolder = "QrCodes";

  // Generate QR codes for each link
  linksToGenerate.forEach(({ data, filename }) => {
    generateQRCode(data, outPutFolder, filename);
  });
};
startPoint();
