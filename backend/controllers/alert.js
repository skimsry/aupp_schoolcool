import Alert from "../models/alert.js";
import path from "path";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
const __dirname = dirname(fileURLToPath(import.meta.url));
export const addAlert = async (req, res) => {
  try {
    const { title, content, postaudience, toId, courseId, status } = req.body;
    const codeTitle = Date.now();

    if (!req.files || req.files.length === 0) {
      const alert = new Alert({
        codeTitle,
        title,
        content,
        postaudience,
        toId,
        courseId,
        status,
      });

      const response = await alert.save();
      console.log("Saved Alert:", response);
      res.status(201).json({ message: "Alert registered successfully", alert });
    } else {
      const photos = req.files.map((file) => ({
        codeTitle,
        title,
        content,
        postaudience,
        toId,
        courseId,
        filename: file.filename,
        path: file.path,
        size: file.size,
        status,
      }));
      const savedPhotos = await Alert.insertMany(photos);
      res
        .status(200)
        .json({ message: "Alert registered successfully", savedPhotos });
    }
  } catch (error) {
    console.error("Server Error:", error); // Log the actual error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while uploading photos." });
  }
};

export const getAlert = async (req, res) => {
  try {
    const alert = await Alert.aggregate([
      {
        $sort: { createdDate: -1 },
      },
      {
        $group: {
          _id: "$codeTitle",
          mostRecentAlert: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecentAlert" },
      },
      {
        $sort: { codeTitle: -1 },
      },
    ]);

    if (!alert.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const alert = await Alert.aggregate([
      {
        $match: {
          title: { $regex: title, $options: "i" },
        },
      },
      {
        $sort: { createdDate: -1 },
      },
      {
        $group: {
          _id: "$codeTitle",
          mostRecentAlert: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecentAlert" },
      },
      {
        $sort: { codeTitle: 1 },
      },
    ]);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAlertByTitleCode = async (req, res) => {
  const { codeTitle } = req.params;

  try {
    if (!codeTitle) {
      return res.status(400).json({ message: "CodeTitle is required" });
    }
    const alerts = await Alert.find({ codeTitle });
    if (alerts.length === 0) {
      return res
        .status(404)
        .json({ message: "No alerts found with the specified codeTitle" });
    }

    // const filePaths = alerts.map((alert) => alert.path);
    const filePaths = alerts.map((alert) => alert.path).filter(Boolean);
    console.log(filePaths.length);
    if (filePaths.length > 0) {
      const uploadsDir = path.resolve(__dirname, "../");
      const deleteFilePromises = filePaths.map(async (filePath) => {
        const normalizedPath = filePath.replace(/\\/g, "/");
        const fullPath = path.join(uploadsDir, normalizedPath);

        console.log(`Attempting to delete file at: ${fullPath}`);

        return unlinkAsync(fullPath)
          .then(() => console.log(`Successfully deleted file at ${fullPath}`))
          .catch((err) =>
            console.error(`Failed to delete file at ${fullPath}:`, err)
          );
      });

      await Promise.all(deleteFilePromises);
    }

    const result = await Alert.deleteMany({ codeTitle });

    res.status(200).json({
      message: `${result.deletedCount} alerts and associated files deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAlertByTitleCode = async (req, res) => {
  try {
    const { codeTitle, title, content, postaudience, toId, courseId, status } =
      req.body;
    const codeTitle2 = codeTitle;

    if (!req.files || req.files.length === 0) {
      // Update an existing alert by codeTitle
      const updatedAlert = await Alert.updateMany(
        { codeTitle }, // Filter by codeTitle
        {
          $set: {
            codeTitle: codeTitle2,
            title,
            content,
            postaudience,
            toId,
            courseId,
            status,
          },
        }, // Update fields
        { upsert: true } // Create if it doesn't exist
      );

      console.log("Updated Alert:", updatedAlert);
      res
        .status(200)
        .json({ message: "Alert updated successfully", alert: updatedAlert });
    } else {
      // Fetch the existing alert to get the old file path
      // const existingAlert = await Alert.findOne({ codeTitle });
      // const existingAlert = await Alert.find({ codeTitle });
      // // console.log(existingAlert.length);
      // for (let i = 0; i < existingAlert.length; i++) {
      // if (existingAlert && existingAlert.path) {
      //   // Delete the old photo
      //   const fullOldPhotoPath = path.join(
      //     __dirname,
      //     `../${existingAlert.path}`
      //   );
      //   fs.unlink(fullOldPhotoPath, (err) => {
      //     if (err) {
      //       console.error("Failed to delete old photo:", err);
      //     } else {
      //       console.log("Old photo deleted successfully");
      //     }
      //   });
      // }
      // }

      const existingAlerts = await Alert.find({ codeTitle });

      // Loop through each alert in the array
      for (let i = 0; i < existingAlerts.length; i++) {
        const alert = existingAlerts[i]; // Get the individual alert document

        if (alert && alert.path) {
          // Delete the old photo
          const fullOldPhotoPath = path.join(__dirname, `../${alert.path}`);
          fs.unlink(fullOldPhotoPath, (err) => {
            if (err) {
              console.error("Failed to delete old photo:", err);
            } else {
              console.log("Old photo deleted successfully");
            }
          });
        }
        // Delete the duplicate alert
        if (i > 0) {
          await Alert.deleteOne({ _id: alert._id });
          console.log(
            `Duplicate alert with codeTitle '${alert.codeTitle}' deleted`
          );
        }
      }
      const photos = req.files.map((file) => ({
        codeTitle: codeTitle2,
        title,
        content,
        postaudience,
        toId,
        courseId,
        filename: file.filename,
        path: file.path,
        size: file.size,
        status,
      }));

      const bulkOps = photos.map((photo) => ({
        updateMany: {
          filter: { codeTitle: photo.codeTitle },
          update: { $set: photo },
          upsert: true, // Create if it doesn't exist
        },
      }));

      const result = await Alert.bulkWrite(bulkOps);

      res.status(200).json({ message: "Alerts updated successfully", result });
    }
  } catch (error) {
    console.error("Server Error:", error); // Log the actual error for debugging
    res.status(500).json({ error: "An error occurred while updating alerts." });
  }
};

export const getAlertByTitleCode = async (req, res) => {
  const { codeTitle } = req.query;
  console.log("codeTitle:", codeTitle);
  try {
    if (!codeTitle) {
      return res.status(400).json({ message: "CodeTitle is required" });
    }
    const alerts = await Alert.find({ codeTitle });
    if (alerts.length === 0) {
      return res
        .status(404)
        .json({ message: "No alerts found with the specified codeTitle" });
    }
    res.status(200).json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertStatus = async (req, res) => {
  try {
    const alert = await Alert.aggregate([
      {
        $match: { status: true },
      },
      {
        $sort: { createdDate: -1 },
      },
      {
        $group: {
          _id: "$codeTitle",
          mostRecentAlert: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecentAlert" },
      },
      {
        $sort: { codeTitle: -1 },
      },
    ]);

    if (!alert.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertAll = async (req, res) => {
  try {
    const alert = await Alert.aggregate([
      {
        $group: {
          _id: "$codeTitle",
          mostRecentAlert: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecentAlert" },
      },
      {
        $sort: { codeTitle: -1 },
      },
    ]);

    if (!alert.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertToday = async (req, res) => {
  try {
    // Get the start and end of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const alert = await Alert.aggregate([
      {
        $match: {
          status: true,
          createdDate: { $gte: startOfToday, $lt: endOfToday },
        },
      },
      {
        $sort: { createdDate: -1 },
      },
      {
        $group: {
          _id: "$codeTitle",
          mostRecentAlert: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$mostRecentAlert" },
      },
      {
        $sort: { codeTitle: -1 },
      },
    ]);

    if (!alert.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertByCriteria = async (req, res) => {
  try {
    const { courseId, toId, postaudience, status, startDate, endDate } =
      req.query;

    // Validate date range
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "startDate cannot be greater than endDate" });
    }

    // Build the search criteria
    const criteria = {};

    if (courseId) {
      criteria.courseId = { $regex: new RegExp(`^${courseId}$`, "i") };
    }
    if (toId) {
      criteria.toId = { $regex: new RegExp(`^${toId}$`, "i") };
    }
    if (postaudience) {
      criteria.postaudience = { $regex: new RegExp(`^${postaudience}$`, "i") };
    }

    if (status) {
      criteria.status = status === "true";
    }

    if (startDate && endDate) {
      criteria.createdDate = {
        $gte: new Date(startDate).toLocaleDateString(),
        $lte: new Date(endDate).toLocaleDateString(),
      };
    } else if (startDate) {
      criteria.createdDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      criteria.createdDate = { $lte: new Date(endDate) };
    }
    // Perform the search with the criteria
    const course = await Alert.find(criteria);

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// export const getAlertByCriteria = async (req, res) => {
//   try {
//     const { courseId, toId, postaudience, status, startDate, endDate } =
//       req.query;

//     // Validate date range
//     if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//       return res
//         .status(400)
//         .json({ message: "startDate cannot be greater than endDate" });
//     }

//     // Build the search criteria
//     const criteria = {};

//     if (courseId) {
//       criteria.courseId = { $regex: new RegExp(`^${courseId}$`, "i") };
//     }
//     if (toId) {
//       criteria.toId = { $regex: new RegExp(`^${toId}$`, "i") };
//     }
//     if (postaudience) {
//       criteria.postaudience = { $regex: new RegExp(`^${postaudience}$`, "i") };
//     }

//     if (status) {
//       criteria.status = status === "true";
//     }

//     if (startDate && endDate) {
//       criteria.createdDate = {
//         $gte: new Date(startDate).toLocaleDateString(),
//         $lte: new Date(endDate).toLocaleDateString(),
//       };
//     } else if (startDate) {
//       criteria.createdDate = { $gte: new Date(startDate) };
//     } else if (endDate) {
//       criteria.createdDate = { $lte: new Date(endDate) };
//     }
//     // Perform the search with the criteria
//     const course = await Alert.find(criteria);

//     res.status(200).json(course);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getAlertStudentByCriteria = async (req, res) => {
//   try {
//     const { courseId, toId, postaudience } = req.query;

//     // Build the search criteria
//     const criteria = { status: true }; // Initialize with common criteria

//     // if (courseId) {
//     //   criteria.courseId = { $regex: new RegExp(`^${courseId}$`, "i") };
//     // }
//     //toid: test90 with id
//     //postaudience: student with number 3

//     if (postaudience && toId) {
//       criteria.toId = { $regex: new RegExp(`^${toId}$`, "i") };
//     } else if (!postaudience && !toId) {
//       //courseId
//     } else if (postaudience && !toId) {
//       criteria.$or = [
//         { postaudience: { $regex: new RegExp(`^${postaudience}$`, "i") } },
//         { postaudience: "7" },
//       ];
//     } else {
//     }
//     // if (postaudience && toId) {
//     //   criteria.$or = [
//     //     { postaudience: { $regex: new RegExp(`^${postaudience}$`, "i") } },
//     //     { postaudience: "7" },
//     //   ];
//     // } else {
//     //   criteria.postaudience = "7";
//     // }
//     const alert = await Alert.find(criteria).sort({ createdDate: -1 });
//     // Perform the search with the criteria
//     // const alert = await Alert.aggregate([
//     //   {
//     //     $match: criteria, // Use criteria to match documents
//     //   },
//     //   {
//     //     $sort: { createdDate: -1 }, // Sort by most recent date first
//     //   },
//     //   {
//     //     $group: {
//     //       _id: "$codeTitle",
//     //       mostRecentAlert: { $first: "$$ROOT" }, // Capture the most recent alert per group
//     //     },
//     //   },
//     //   {
//     //     $replaceRoot: { newRoot: "$mostRecentAlert" }, // Flatten the structure
//     //   },
//     //   {
//     //     $sort: { codeTitle: -1 }, // Sort by codeTitle if needed
//     //   },
//     // ]);

//     if (!alert.length) {
//       return res.status(404).json({ message: "No Alert found" });
//     }

//     res.status(200).json(alert);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getAlertStudentByCriteria = async (req, res) => {
  try {
    const { courseId, toId, postaudience } = req.query;

    const alerts = await Alert.find({
      $and: [
        {
          $or: [
            { toId: toId },
            {
              courseId: {
                $in: Array.isArray(courseId) ? courseId : [courseId],
              },
            },
            { postaudience: { $regex: new RegExp(`^${postaudience}$`, "i") } },
            { postaudience: "7" },
          ],
        },
        { status: true },
      ],
    })
      .sort({ createdDate: -1 })
      .lean();

    // Remove duplicates where a row contains both toId and postaudience
    // const uniqueAlerts = alerts.filter((alert, index, self) => {
    //   return (
    //     index ===
    //       self.findIndex(
    //         (a) =>
    //           a.toId === alert.toId && a.postaudience === alert.postaudience
    //       ) && alert.toId !== alert.postaudience
    //   );
    // });
    const uniqueAlerts = alerts.filter((alert, index, self) => {
      return index === self.findIndex((a) => a.codeTitle === alert.codeTitle);
    });

    if (!uniqueAlerts.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(uniqueAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertStudentByCriteriaP = async (req, res) => {
  try {
    const { courseId, toId, postaudience, fos } = req.query;

    const alerts = await Alert.find({
      $and: [
        {
          $or: [
            { toId: toId },
            { toId: fos },
            {
              courseId: {
                $in: Array.isArray(courseId) ? courseId : [courseId],
              },
            },
            { postaudience: { $regex: new RegExp(`^${postaudience}$`, "i") } },
            { postaudience: "7" },
            { postaudience: "3" },
          ],
        },
        { status: true },
      ],
    })
      .sort({ createdDate: -1 })
      .lean();

    const uniqueAlerts = alerts.filter((alert, index, self) => {
      return index === self.findIndex((a) => a.codeTitle === alert.codeTitle);
    });

    if (!uniqueAlerts.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(uniqueAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAlertStudentByCriteriaT = async (req, res) => {
  try {
    const { courseId, toId, postaudience } = req.query;

    const alerts = await Alert.find({
      $and: [
        {
          $or: [
            { toId: toId },
            {
              courseId: {
                $in: Array.isArray(courseId) ? courseId : [courseId],
              },
            },
            { postaudience: { $regex: new RegExp(`^${postaudience}$`, "i") } },
            { postaudience: "7" },
          ],
        },
        { status: true },
      ],
    })
      .sort({ createdDate: -1 })
      .lean();

    const uniqueAlerts = alerts.filter((alert, index, self) => {
      return index === self.findIndex((a) => a.codeTitle === alert.codeTitle);
    });

    if (!uniqueAlerts.length) {
      return res.status(404).json({ message: "No Alert found" });
    }

    res.status(200).json(uniqueAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
