import Site from "../models/Site.js";

export const getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();

    res.status(200).json(sites);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createSite = async (req, res) => {
  try {
    const { name, location, description } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        message: "Name and location are required",
      });
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};