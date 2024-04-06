import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import {
  createProductColors,
  createProductInventory,
  createProductSizes,
  updateProductColors,
  updateProductInventory,
  updateProductSizes,
} from "../services/product";
import { generateFiveDigitNumbers } from "../helpers/generateFiveDigitNumbers";
import { urlGenerator } from "../utils/urlGenerator";
import { deleteUploadedImage, getUploadedImage, uploadProductImages } from "../services/fileUploadService";

const Op = Model.Sequelize.Op;

const product_include = [
  {
    model: Model.Store,
    as: "store",
    attributes: [
      "id",
      "vendor_id",
      "store_code",
      "name",
      "slug",
      "status",
      "phone",
      "logo",
    ],
  },
  {
    model: Model.Product_Size,
    as: "product_sizes",
    include: [
      {
        model: Model.Size,
        as: "_size",
      },
    ],
  },
  {
    model: Model.Product_Inventory,
    as: "product_inventory",
  },
  {
    model: Model.Product_Color,
    as: "product_colors",
    include: [
      {
        model: Model.Color,
        as: "_color",
      },
    ],
  },
];

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      regular_price,
      promo_price,
      currency,
      tax_rate,
      category_id,
      sub_category_id,
      store_id,
      quantity,
      sizes,
      colors,
    } = req.body;

    const product_code = `APR-${generateFiveDigitNumbers()}`;

    const product = await Model.Product.create({
      name,
      description,
      slug: urlGenerator(name),
      regular_price,
      promo_price,
      currency,
      tax_rate,
      category_id,
      sub_category_id,
      store_id,
      product_code,
    });

    //create product sizes
    if (sizes && sizes.length > 0) {
      await createProductSizes(product.id, sizes);
    }

    //create product images
    await uploadProductImages(req.files, product.id);

    //create product color
    if (colors && colors.length > 0) {
      await createProductColors(product.id, colors);
    }

    //create product inventory
    await createProductInventory(product.id, quantity);

    return responseHandler(res, 201, true, "Product Created Successfully", product);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const page_size = Number(req.query.page_size) || 10;

    //get the exact count of the data
    const main_table_count = await Model.Product.count({ distinct: true, where: { status: "active" }});

    //get products based on pagination
    const { count, rows } = await Model.Product.findAndCountAll({
      offset: (page - 1) * page_size,
      limit: page_size,
      where: { status: "active" },
      include: product_include,
    });

    const total_pages = Math.ceil(count / page_size);

    return responseHandler(res, 200, true, "Data retrieved", {
      page,
      page_size,
      total_pages,
      totalItem: main_table_count,
      data: rows,
    });
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.product_id);
    const { sizes, colors, quantity } = req.body;

    const product = await Model.Product.findOne({
      where: { id, status: { [Op.ne]: "deleted" } },
    });
    if (!product) {
      return responseHandler(res, 404, false, "Product not found");
    }

    const updated_product = await Model.Product.update(req.body, {
      where: { id },
      returning: true,
    });

    // update product sizes
    if (sizes && sizes.length > 0) {
      await updateProductSizes(id, sizes);
    }

    //update colors
    if (colors && colors.length > 0) {
      await updateProductColors(id, colors);
    }

    //update product inventory
    await updateProductInventory(id, quantity);

    return responseHandler(
      res,
      200,
      true,
      "Product updated successfully",
      updated_product
    );
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const getProductsByStore = async (req: Request, res: Response) => {
  try {
    const { store_id } = req.params;
    const products = await Model.Product.findAll({
      where: { store_id, status: { [Op.ne]: "deleted" } },
      include: product_include,
    });

    if (!products) {
      return responseHandler(res, 404, false, "Product not found");
    }

    return responseHandler(res, 200, true, "Data retrieved", products);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.product_id;
    const { store_id } = req.body;

    const product = await Model.Product.findOne({
      where: { id, store_id, status: { [Op.ne]: "deleted" } },
    });
    if (!product) {
      return responseHandler(res, 404, false, "Product not found");
    }

    await Model.Product.update({ status: "deleted" }, { where: { id } });
    return responseHandler(res, 200, true, "Product deleted successfully");
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const getProductImage = async (req: Request, res: Response) => {
  try {
      const { file_name } = req.params;

      await getUploadedImage(res, file_name, `${process.env.PRODUCT_BLOB_CONTAINER}`);
  } catch (error) {
      await errorHandler(error);
      return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}