
import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.body;
        const customer_id = req.customer.id;

        const product = await Model.Product.findOne({ where: { id: product_id, status: "active" }});
        if(!product){
            return responseHandler(res, 404, false, "Product does not exsit");
        }
        //check if user has cart already 
        const cart = await Model.Cart.findOne({ where: { customer_id, status: "active"}});
        if(cart){
            //check if product already exist in cart items
            const cart_item = await Model.Cart_Item.findOne({ where: { cart_id: cart.id, status: "active", product_id }});
            if(cart_item){
                //update the item quantity
                await Model.Cart_Item.update({ quantity: cart_item.quantity += 1 }, { where: { id: cart_item.id }});
            }else{
                 //otherwise create new
            await Model.Cart_Item.create({
                cart_id: cart.id,
                product_id,
                quantity: 1
            });
            }
           
        }else{
            //create new cart 
            const new_cart = await Model.Cart.create({
                customer_id,
                total: 0,
            });
            //create new cart_item
            await Model.Cart_Item.create({
                cart_id: new_cart.id,
                product_id,
                quantity: 1
            });
        }

        return responseHandler(res, 201, true, "Product added successfully");
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
        include: [
            {
                model: Model.Product,
                as: "cart-product",
                attributes: [
                    "id",
                    "name",
                    "description",
                    "product_code",
                    "slug",
                    "regular_price",
                    "promo_price",
                    "currency",
                    "status"
                ]
            }
        ] });

        return responseHandler(res, 200, true, "Data retrieved", { cart, cart_items });
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;
        const { cart_id } = req.body;

        //check if wishlist exist and belongs to the user
        const cart = await Model.Cart.findOne({ where: { id: cart_id, customer_id: req.customer.id, status: "active"}});
        if(!cart){
            return responseHandler(res, 401, false, "Invalid Cart ID");
        }
        //check if product exist 
        const product = await Model.Product.findOne({ where: { id: product_id, status: "active"}});
        if(!product){
            return responseHandler(res, 404, false, "Product not found");
        }
        //reduce cart_item quantity if it's more than 1 
        const cart_item = await Model.Cart_Item.findOne({ where: { product_id, status: "active"}});
        if(!cart_item){
            return responseHandler(res, 404, false, "Item not available");
        }else if(cart_item.quantity > 1){
            //reduce the quantity
            await Model.Cart_Item.update({ quantity: cart_item.quantity -= 1 }, { where: { id: cart_item.id }});
            return responseHandler(res, 200, true, "Item quantity updated");
        }else{
            await Model.Cart_Item.update({ quantity: 0, status: "deleted" }, { where: { id: cart_item.id }});
            return responseHandler(res, 200, true, "Product removed successfully");
        }
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;
        const { cart_id } = req.body;

        //check if wishlist exist and belongs to the user
        const cart = await Model.Cart.findOne({ where: { id: cart_id, customer_id: req.customer.id, status: "active"}});
        if(!cart){
            return responseHandler(res, 401, false, "Invalid Cart ID");
        }
        //check if product exist 
        const product = await Model.Product.findOne({ where: { id: product_id, status: "active"}});
        if(!product){
            return responseHandler(res, 404, false, "Product not found");
        }
        //reduce cart_item quantity if it's more than 1 
        const cart_item = await Model.Cart_Item.findOne({ where: { product_id, status: "active"}});
        if(!cart_item){
            return responseHandler(res, 404, false, "Item not available");
        }else{
            await Model.Cart_Item.update({ status: "deleted" }, { where: { id: cart_item.id }});
            return responseHandler(res, 200, true, "Product deleted successfully");
        }
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}