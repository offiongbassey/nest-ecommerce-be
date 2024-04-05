import dotenv from "dotenv";
dotenv.config();

export const errorHandler = async (error: any) => {
    if(process.env.NODE_ENV !== "production"){
        console.log(error);
    }else{
        console.log(error);
    }
}