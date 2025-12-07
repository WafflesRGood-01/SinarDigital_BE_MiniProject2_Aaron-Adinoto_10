import prisma from "../utils/prismaClient.js";
import { success, error } from "../utils/response.js";

export const getCategories = async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      include: { products: true }
    });
    return success(res, "All categories", data);
  } catch (err) {
    return error(res, err.message);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });
    if (!data) return error(res, "Category not found", 404);

    return success(res, "Category found", data);
  } catch (err) {
    return error(res, err.message);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await prisma.category.create({
      data: { name }
    });
    return success(res, "Category created", data);
  } catch (err) {
    return error(res, err.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const data = await prisma.category.update({
      where: { id },
      data: { name }
    });

    return success(res, "Category updated", data);
  } catch (err) {
    return error(res, err.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.category.delete({
      where: { id }
    });

    return success(res, "Category deleted");
  } catch (err) {
    return error(res, err.message);
  }
};
