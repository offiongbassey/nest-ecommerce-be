import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";
import {
  createProductColors,
  createProductSizes,
  updateProductColors,
  updateProductSizes,
} from "../services/product";
import { generateFiveDigitNumbers } from "../helpers/generateFiveDigitNumbers";
import { urlGenerator } from "../utils/urlGenerator";
import { deleteUploadedImage, getUploadedImage, uploadProductImages } from "../services/fileUploadService";
import { Sequelize } from "sequelize";

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
    model: Model.Product_Color,
    as: "product_colors",
    include: [
      {
        model: Model.Color,
        as: "_color",
      },
    ],
  },
  {
    model: Model.Product_Image,
    as: "product_images"
  },
  {
    model: Model.Category,
    as: "category",
    attributes: [
      "id",
      "name",
      "slug"
    ]

  },
  {
    model: Model.SubCategory,
    as: "sub_category",
    attributes: [
      "id",
      "name",
      "slug"
    ]
  }
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
      quantity,
      sizes,
      colors,
    } = req.body;

    //get store Id
    const store = await Model.Store.findOne({ where: { vendor_id: req.vendor.id, status: "active" }});
    if(!store){
      return responseHandler(res, 400, false, "You've not created a store.");
    }

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
      store_id: store.id,
      product_code,
      quantity
    });

    //create product sizes
    if (sizes && sizes.length > 0) {
      await createProductSizes(product.id, typeof(sizes) === "string" ? sizes.split(",") : sizes);
    }

    //create product images
    if(req.files){

      await uploadProductImages(req.files, product.id);
      // if(!upload_images){
      //   return responseHandler(res, 400, false, "Unaccepted image type");
      // }
    }

    //create product color
    if (colors && colors.length > 0) {
      //check if color is coming as an array
      await createProductColors(product.id, typeof(colors) === "string" ? colors.split(",") : colors);
    }

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
      order: [['createdAt', "DESC"]]
    });

    const total_pages = Math.ceil(count / page_size);

    return responseHandler(res, 200, true, "Data retrieved", {
      page,
      page_size,
      total_pages,
      total_item: main_table_count,
      data: rows,
    });
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
};

export const getVendorProducts = async (req: Request, res: Response) => {
  try {
    // const page = Number(req.query.page) || 1;
    // const page_size = Number(req.query.page_size) || 10;
    const store = await Model.Store.findOne({ where: { vendor_id: req.vendor.id }});
    if(!store){
      return responseHandler(res, 404, false, "No active store available");
    }

    //get the exact count of the data
    // const main_table_count = await Model.Product.count({ distinct: true, where: { store_id: store.id, status: {[Op.ne]: "deleted"} }});

    //get products based on pagination
    const products = await Model.Product.findAll({
      where: { store_id: store.id, status: {[Op.ne]: "deleted"}},
      include: product_include,
      order: [['createdAt', 'DESC']]
    });

    // const total_pages = Math.ceil(count / page_size);

    return responseHandler(res, 200, true, "Data retrieved", products);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.product_id);
    const { sizes, colors } = req.body;
    console.log("Testing ", req.body, "File", req.files);

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

     //update product sizes
     if (sizes && sizes.length > 0) {
      await updateProductSizes(product.id, typeof(sizes) === "string" ? sizes.split(",") : sizes);
    }

    //update product color
    if (colors && colors.length > 0) {
      //check if color is coming as an array
      await updateProductColors(product.id, typeof(colors) === "string" ? colors.split(",") : colors);
    }

    //add new images
    if(req.files){
      await uploadProductImages(req.files, product.id);
    }

    return responseHandler(res, 200, true, "Product updated successfully", updated_product);
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

export const getVendorProductById = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;
    const store = await Model.Store.findOne({ where: { vendor_id: req.vendor.id }});
    if(!store){
      return responseHandler(res, 404, false, "No active store available");
    }
    const product = await Model.Product.findOne({ where: { id: product_id, store_id: store.id, status: {[Op.ne]: "deleted"} }, include: product_include });
    if(!product){
      return responseHandler(res, 404, false, "Product not found");
    }

    return responseHandler(res, 200, true, "Data retrieved", product)
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}

export const getRandomProducts = async (req: Request, res: Response) => {
  try {
    
    const products = await Model.Product.findAll({ where: { status: "active"}, include: product_include, order: Sequelize.literal('random()'), limit: 10 });
    return responseHandler(res, 200, true, "Data retrieved", products);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}

export const getProductsBySubCategory = async (req: Request, res: Response) => {
  try {
    
    const page  = Number(req.query.page) || 1;
    const limit  = Number(req.query.limit) || 10;
    const { sub_category_id } = req.params;
    if(!sub_category_id){
      return responseHandler(res, 401, false, "Sub Category ID is required");
    }

    const main_table_count = await Model.Product.count({ distinct: true, where: { status: "active", sub_category_id }});

    const { count, rows } = await Model.Product.findAndCountAll({
      offset: (page -1)  * limit,
      limit,
      where: { status: "active", sub_category_id },
      include: product_include,
      order: [["createdAt", "DESC"]]
    });

    const total_pages = Math.ceil(count / limit);

    return responseHandler(res, 200, true, "Data retrieved", {
      page,
      limit,
      total_pages,
      total_item: main_table_count,
      data: rows
    })
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await Model.Product.findOne({ where: { slug, status: "active" }, include: product_include });
    if(!product){
      return responseHandler(res, 404, false, "Product not found");
    }

    return responseHandler(res, 200, true, "Data retrieved", product);
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}

export const getRelatedProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { slug } = req.params;
    //get the product
    const product = await Model.Product.findOne({ where: { slug, status: "active" }});
    if(!product){
      return responseHandler(res, 404, false, "Product not found");
    }

    const main_table_count = await Model.Product.count({ distinct: true, where: { status: "active", id: {[Op.ne]: product.id}, sub_category_id: product.sub_category_id }});

    const { count, rows } = await Model.Product.findAndCountAll({
      offset: (page -1) * limit,
      limit,
      where: { status: "active", id: {[Op.ne]: product.id }, sub_category_id: product.sub_category_id },
      include: product_include,
      order: [["createdAt", "DESC"]]
    });

    const total_pages = Math.ceil(count / limit);

    return responseHandler(res, 200, true, "Data retrieved", {
      page,
      limit,
      total_pages,
      total_item: main_table_count,
      data: rows
    })
    
  } catch (error) {
    await errorHandler(error);
    return responseHandler(res, 500, false, "Something went wrong, try again later");
  }
}