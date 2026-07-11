import asyncHandler from "../utils/asyncHandler.js";
import Site from "../models/Site.js";

// Get All Sites
export const getAllSites = asyncHandler(async (req, res) => {
  const sites = await Site.find();

  res.status(200).json(sites);
});

// Create New Site (Admin)
export const createSite = asyncHandler(async (req, res) => {
  const { name, location, description } = req.body;

  if (!name || !location) {
    res.status(400);
    throw new Error("Name and location are required");
  }

  const site = await Site.create({
    name,
    location,
    description,
  });

  res.status(201).json({
    message: "Site created successfully",
    site,
  });
});