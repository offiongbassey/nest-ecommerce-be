import { Request, Response} from "express";
import { errorHandler } from "../helpers/errorHandler"
import { responseHandler } from "../helpers/responseHandler";
import Model from "../server/models";


export const addToWishlist = async (req: Request, res: Response) => {
    try {
        const customer_id = req.customer.id;
        const id = req.body.product_id
        const product = await Model.Product.findOne({ where: { id, status: "active" }});
        if(!product){
            return responseHandler(res, 404, false, "Product does not exist");
        }
        
        //check if wishlist exist 
        let wishlist = await Model.Wishlist.findOne({ where: { customer_id, status: "active" }});
        if(wishlist){
             //check if the product already exist in wishlist_item
             const wishlist_item = await Model.Wishlist_Item.findOne({ where: { wishlist_id: wishlist.id, product_id: id, status: "active" }});
             if(wishlist_item){
                return responseHandler(res, 401, false, "Product Already added to wishlist");
             }
             //otherwise create new wishlist_item
             await Model.Wishlist_Item.create({
                wishlist_id: wishlist.id,
                product_id: id
             });
           
        }else{
            //create new wishlist 
            wishlist = await Model.Wishlist.create({
                customer_id,
                total: 0
            });
            await Model.Wishlist_Item.create({
                wishlist_id: wishlist.id,
                product_id: id,
    
            });
        }

        return responseHandler(res, 201, true, "Item Added to Wishlist", wishlist);
        
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const getWishlist = async (req: Request, res: Response)  => {
    try {
        const customer_id = req.customer.id;

        const wishlist = await Model.Wishlist.findOne({ where: { customer_id, status: "active" }});
        if(!wishlist){
            return responseHandler(res, 404, false, "Wishlist Empty");
        }
        const wishlist_items = await Model.Wishlist_Item.findAll({ where: { wishlist_id: wishlist.id, status: "active" }, 
        include: [
            {
                model: Model.Product,
                as: "wishlist-product",
                attributes: [
                    "id", 
                    "name", 
                    "product_code", 
                    "description", 
                    "slug", 
                    "regular_price", 
                    "promo_price", 
                    "currency", 
                    "status"
                ]
            }
        ]});

        return responseHandler(res, 200, true, "Data retrieved", wishlist_items);
    } catch (error) {
        await errorHandler(error)
        return responseHandler(res, 500, false, "Something went wrong, try again later");
    }
}

export const removeFromWishlist = async (req: Request, res: Response) => {
    try {
        const { wishlist_id } = req.body;
        const id = req.params.wishlist_item_id;
        //confirm that wishlist belongs to the user
        const wishlist = await Model.Wishlist.findOne({ where: { id: wishlist_id, customer_id: req.customer.id }});
        if(!wishlist){
            return responseHandler(res, 404, false, "Wishlist ID is invalid");
        }
        //check if wishlist item exist 
        const wishlist_item = await Model.Wishlist_Item.findOne({ where: { wishlist_id, id, status: "active"}});
        if(!wishlist_item){
            return responseHandler(res, 404, false, "Product does not exist in wishlist");
        }
        await Model.Wishlist_Item.update({ status: "deleted"}, { where: { id, status: "active" }});

        return responseHandler(res, 200, true, "Product removed successfully");
    } catch (error) {
        await errorHandler(error);
        return responseHandler(res, 500, false, "Something went wrong, try again later.");
    }
}