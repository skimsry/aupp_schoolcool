import Map from "../models/map.js";

export const addMap = async (req, res) => {
  try {
    const { linkMap } = req.body;
    const existingLinkMap = await Map.findOne({ linkMap });

    if (existingLinkMap) {
      return res.status(400).json({ message: "LinkMap already exists!" });
    }

    const map = new Map({
      linkMap,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await map.save();
    res.status(201).json({ message: "Map registered successfully", map });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMap = async (req, res) => {
  try {
    const map = await Map.find().sort({ createdDate: -1 }).limit(1);

    if (!map.length) {
      return res.status(404).json({ message: "No map found" });
    }

    res.status(200).json(map);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMap = async (req, res) => {
  try {
    const { _id } = req.params;
    const { linkMap } = req.body;

    const currentMap = await Map.findById(_id);
    if (!currentMap) {
      return res.status(404).json({ message: "Map not found" });
    }

    const updatedMapData = {
      linkMap,
      updateDate: new Date(),
    };
    //console.log(updatedMapData);
    const updatedMap = await Map.findByIdAndUpdate(_id, updatedMapData, {
      new: true,
    });

    res.status(200).json({
      message: "Updated Map successfully",
      map: updatedMap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
