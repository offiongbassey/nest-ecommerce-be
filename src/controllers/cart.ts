
import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

const cart_product_include = [
    {
        model: Model.Product,
        as: "cart_product",
        attributes: [
            "id", "name", "currency", "slug", "promo_price", "quantity", "quantity_sold", "regular_price"
        ],
        include: [
            {
                model: Model.Product_Color,
                as: "product_colors",
                attributes: [
                    "id", "product_id", "color_id", "status"
                ],
                include: [
                    {
                        model: Model.Color,
                        as: "_color",
                        attributes: [
                            "id", "color", "code"
                        ]
                    }
                ]
            },
            {
                model: Model.Product_Image,
                as: "product_images",
                attributes: [
                    "id", "image_url"
                ]
            },
            {
                model: Model.Product_Size,
                as: "product_sizes",
                include: [
                    {
                        model: Model.Size,
                        as: "_size"
                    }
                ]
            }
        ]
    }
]

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product_id, quantity } = req.body;
        const customer_id = req.customer.id;

        const product = await Model.Product.findOne({ where: { id: product_id, status: "active" }});
        if(!product){
            return responseHandler(res, 404, false, "Product does not exsit");
        }
        //check if user has cart already 
        let cart = await Model.Cart.findOne({ where: { customer_id, status: "active"}});
        if(cart){
            //check if product already exist in cart items
            const cart_item = await Model.Cart_Item.findOne({ where: { cart_id: cart.id, status: "active", product_id }});
            if(cart_item){
                //update the item quantity
                await Model.Cart_Item.update({ quantity: cart_item.quantity += quantity }, { where: { id: cart_item.id }});
            }else{
                 //otherwise create new
            await Model.Cart_Item.create({
                cart_id: cart.id,
                product_id,
                quantity
            });
            }
           
        }else{
            //create new cart 
            cart = await Model.Cart.create({
                customer_id,
                total: 0,
            });
            //create new cart_item
            await Model.Cart_Item.create({
                cart_id: cart.id,
                product_id,
                quantity
            });
        }

        const new_cart_item = await Model.Cart_Item.findOne({ where: { product_id, cart_id: cart.id, status: "active" }, include: cart_product_include})

        return responseHandler(res, 201, true, "Item added successfully", new_cart_item);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const getCart = async (req: Request, res: Response) => {
    try {
        const cart = await Model.Cart.findOne({ where: { customer_id: req.customer.id, status: "active"}});
        if(!cart){
            return responseHandler(res, 404, false, "Cart is empty");
        }
        const cart_items = await Model.Cart_Item.findAll({ where: { cart_id: cart.id, status: "active"}, 
        include: cart_product_include });

        return responseHandler(res, 200, true, "Data retrieved", { cart, cart_items });
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;

        //check if cart exist and belongs to the user
        const cart = await Model.Cart.findOne({ where: { customer_id: req.customer.id, status: "active"}});
        if(!cart){
            return responseHandler(res, 401, false, "Your Cart is empty");
        }
        //check if product exist 
        const product = await Model.Product.findOne({ where: { id: product_id, status: "active"}});
        if(!product){
            return responseHandler(res, 404, false, "Product not found");
        }
        //reduce cart_item quantity if it's more than 1 
        const cart_item = await Model.Cart_Item.findOne({ where: { product_id, cart_id: cart.id, status: "active"}});
        if(!cart_item){
            return responseHandler(res, 404, false, "Item not available");
        }else if(cart_item.quantity > 1){
            //reduce the quantity
            await Model.Cart_Item.update({ quantity: cart_item.quantity -= 1 }, { where: { id: cart_item.id }});
        }
        const new_cart_item = await Model.Cart_Item.findOne({ where: { product_id, cart_id: cart.id, status: "active" }, include: cart_product_include})

        return responseHandler(res, 200, true, "Item quantity updated", new_cart_item);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;

        //check if cart exist and belongs to the user
        const cart = await Model.Cart.findOne({ where: { customer_id: req.customer.id, status: "active"}});
        if(!cart){
            return responseHandler(res, 401, false, "Invalid Cart ID");
        }
        //check if product exist 
        const product = await Model.Product.findOne({ where: { id: product_id, status: "active"}});
        if(!product){
            return responseHandler(res, 404, false, "Product not found");
        }
     
        const cart_item = await Model.Cart_Item.findOne({ where: { product_id, status: "active"}});
        if(!cart_item){
            return responseHandler(res, 404, false, "Item not available");
        }else{
            cart_item.status = "deleted";
            await cart_item.save();
        }

        return responseHandler(res, 200, true, "Item removed successfully", product_id);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const addToCartFromLogin = async (req: Request, res: Response) => {
    try {
        const { cart } = req.body;

        //check if user already has cart
        let user_cart = await Model.Cart.findOne({ where: { customer_id: req.customer.id, status: "active" }});
        if(user_cart){
            for(const item of cart){
                //check if the incoming product already exist then add the incoming quantity to the existing quantity
               const cart_item = await Model.Cart_Item.findOne({ where: { product_id: item.product_id, cart_id: user_cart.id, status: "active" }});

               if(cart_item){
                await Model.Cart_Item.update({ quantity: cart_item.quantity + item.quantity }, { where: { id: cart_item.id }});

               }else{
                //create new cart item
                await Model.Cart_Item.create({ cart_id: user_cart.id, product_id: item.product_id, quantity: item.quantity });
               }
            }
        }else{
            //create new cart and create cart_item using bulk
            user_cart = await Model.Cart.create({ customer_id: req.customer.id, total: 0 });
            const new_cart_items = cart.map((item: { product_id: number; quantity: number; }) => ({ cart_id: user_cart.id, product_id: item.product_id, quantity: item.quantity }));
            
            await Model.Cart_Item.bulkCreate(new_cart_items);
        }

        const cart_items = await Model.Cart_Item.findAll({ where: { cart_id: user_cart.id, status: "active"}, 
        include: cart_product_include });

        return responseHandler(res, 201, true, "Items added to cart", cart_items);
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const clearCart = async (req: Request, res: Response) => {
    try {
        const cart = await Model.Cart.findOne({ where: { customer_id: req.customer.id, status: "active" }});
        if(!cart){
            return responseHandler(res, 401, false, "Cart not found");
        }

        await Model.Cart_Item.update({ status: "deleted"}, { where: { cart_id: cart.id }});

        return responseHandler(res, 200, true, "Cart has been emptied");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}