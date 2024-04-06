import crypto from "crypto";
import jimp from "jimp";
import { urlGenerator } from "../utils/urlGenerator";
import { BlobServiceClient } from "@azure/storage-blob";
import { Response } from "express";
import Model from "../server/models";

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);

const PRODUCT_URL = `${process.env.SERVER_URL}/api/v1/product/image/`;

function getReductionSize(fileSize: number) {
    if(fileSize > 3000 * 1024){
        return 800;
    }else if (fileSize > 1000 * 1024){
        return 1100;
    }else if (fileSize > 700 * 1024){
        return 900;
    }else if (fileSize > 500 * 1024){
        return 800;
    }else {
        return 700;
    }
}

export const fileUploadService = async (originalname: string, size: number, buffer: Buffer, container: string) => {
    const containerClient = blobService.getContainerClient(container);
     // filename refining
     const random = crypto.randomBytes(10).toString("hex");
     const extension = originalname.split('.').pop();
     const file_name = `${urlGenerator(originalname).replace(/\.\w+$/, '')}-${random}.${extension}`;
    
     //resize file
     const reduce_size = getReductionSize(size);
     
     const image = await jimp.read(buffer);
     await image.resize(reduce_size, jimp.AUTO);
     const resizedImageBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

     await containerClient.getBlockBlobClient(file_name).uploadData(size > 300 * 1024 ? resizedImageBuffer : buffer);

     return file_name;
}

export const uploadProductImages = async (files: any, product_id: number) => {
    const containerClient = blobService.getContainerClient(`${process.env.PRODUCT_BLOB_CONTAINER}`);

    for(const file of files){
    const { originalname, size, buffer } = file;
    //filename refining
    const random = crypto.randomBytes(10).toString("hex");
    const extension = originalname.split(".").pop();
    const file_name = `${urlGenerator(originalname).replace(/\.\w+$/, '')}-${random}.${extension}`;

    //resize file
    const reduce_size = getReductionSize(size);

    const image = await jimp.read(buffer);
    await image.resize(reduce_size, jimp.AUTO);
    const resizedImageBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

    await containerClient.getBlockBlobClient(file_name).uploadData(size > 300 * 1024 ? resizedImageBuffer : buffer);

    await Model.Product_Image.create({
        product_id,
        image_url: PRODUCT_URL+file_name,
        image: file_name
    });
    }
}

export const getUploadedImage = async (res: Response, file_name: string, container: string) => {
    const containerClient = blobService.getContainerClient(container);
    const response = await containerClient.getBlockBlobClient(file_name).downloadToBuffer();
        res.header('Content-Type', 'image/jpeg');
        res.send(response);
}

export const deleteUploadedImage = async (file_name: string, container: string) => {
    const containerClient = blobService.getContainerClient(container);
    await containerClient.getBlockBlobClient(file_name).deleteIfExists();
}