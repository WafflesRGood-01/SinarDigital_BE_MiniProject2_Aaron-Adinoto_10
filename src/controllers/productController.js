import prisma from "../utils/prismaClient.js";
import fs from "fs";
import path from "path";

// CREATE PRODUCT (with image)
export const create = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: Number(categoryId),
        image: imagePath,
      },
    });

    return res.json({ status: "success", data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// GET ALL PRODUCTS
export const getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return res.json({ status: "success", data: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// UPDATE PRODUCT (with optional new image)
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    // Find existing product
    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }

    // If uploading new image → delete old one
    let imagePath = existing.image;
    if (req.file) {
      // delete old file
      if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      imagePath = `uploads/${req.file.filename}`;
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: Number(categoryId),
        image: imagePath,
      },
    });

    return res.json({ status: "success", data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE PRODUCT (also delete image)
export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }

    // delete image if exists
    if (existing.image && fs.existsSync(existing.image)) {
      fs.unlinkSync(existing.image);
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
};