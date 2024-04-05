import Model from "../server/models";

export const createProductSizes =  async (product_id: number, sizes: number[]) => {
    try {
        //preparing an array of object for bulk create;
        const product_sizes = sizes.map(size => ({product_id, size_id: size}));

        await Model.Product_Size.bulkCreate(product_sizes);

        console.log("Product Sizes created successfully.")
    } catch (error) {
        console.error("Error creating product sizes: ", error);
    }
}

export const createProductColors = async (product_id: number, colors: number[]) => {
    try {
        
        //preparing an array of object for bulk create;
        const product_colors = colors.map(color => ({ product_id, color_id: color }));

        await Model.Product_Color.bulkCreate(product_colors);

        console.log("Product Colors created successfully");
    } catch (error) {
        console.error("Error creating product colors: ", error);
    }
}

export const createProductInventory = async (product_id: number, quantity: number) => {
    try {
        await Model.Product_Inventory.create({ product_id, quantity});

        console.log("Product Inventory Created Successfully");
    } catch (error) {
        console.error("Error creating product inventory: ", error);
    }
}

export const updateProductSizes = async (product_id: number, sizes: number[]) => {
    try {
        //check if the product already has the sizes
        let old_sizes = await Model.Product_Size.findAll({ where: { product_id, status: "active" }, attributes: ["size_id"]});
        
        //set new as object
        old_sizes = new Set (old_sizes.map((item: { dataValues: any; }) => item.dataValues.size_id))

        for(const size of sizes){
            //check if the incoming size already exist, if it does, then don't add 
            if(!old_sizes.has(size)){
            //    console.log("new size add: ")
                await Model.Product_Size.create({product_id, size_id: size});
            }
        }

    } catch (error) {
        console.error("Error updating product sizes: ", error);
    }
}

export const updateProductColors = async (product_id: number, colors: number[]) => {
    try {
        //check if the product already has the colors
        let old_colors = await Model.Product_Color.findAll({ where: { product_id, status: "active"}, attributes: ["color_id"]});
        
        //set new as object
        old_colors = new Set (old_colors.map((item: { dataValues: any}) => item.dataValues.color_id));
        
        for(const color of colors){
            if(!old_colors.has(color)){
                await Model.Product_Color.create({ product_id, color_id: color });
            }
        }

    } catch (error) {
        console.error("Error updating product colors: ", error);
    }
}

export const updateProductInventory = async (product_id: number, quantity: number) => {
    try {
        await Model.Product_Inventory.update({quantity}, { where: { product_id }});
    } catch (error) {
        console.error("Error updating product inventory: ", error);
    }
}

