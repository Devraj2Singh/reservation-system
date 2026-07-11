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