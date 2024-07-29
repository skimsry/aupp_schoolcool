import Team from "../models/team.js";

export const addTeam = async (req, res) => {
  try {
    const { profileimg, name, position } = req.body;

    const team = new Team({
      profileimg,
      name,
      position,
      createdDate: new Date(),
      updateDate: new Date(),
    });

    await team.save();
    res.status(201).json({ message: "Team registered successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdDate: -1 });

    if (!team.length) {
      return res.status(404).json({ message: "No Team found" });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeamByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Fullname is required" });
    }

    // const team = await Team.find({ name });
    const team = await Team.find({ name: { $regex: name, $options: "i" } });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteTeamById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(_id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateTeamById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { profileimg, name, position } = req.body;
    const currentTeam = await Team.findById(_id);
    if (!currentTeam) {
      return res.status(404).json({ message: "Member not found" });
    }

    const updatedTeamData = {
      profileimg,
      name,
      position,
      updateDate: new Date(),
    };

    const updatedTeam = await Team.findByIdAndUpdate(_id, updatedTeamData, {
      new: true,
    });

    res.status(200).json({
      message: "Updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
