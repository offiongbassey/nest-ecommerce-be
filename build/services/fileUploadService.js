"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUploadedImage = exports.getUploadedImage = exports.uploadProductImages = exports.fileUploadService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jimp_1 = __importDefault(require("jimp"));
const urlGenerator_1 = require("../utils/urlGenerator");
const storage_blob_1 = require("@azure/storage-blob");
const models_1 = __importDefault(require("../server/models"));
const blobService = storage_blob_1.BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const PRODUCT_URL = `${process.env.SERVER_URL}/api/v1/product/image/`;
function getReductionSize(fileSize) {
    if (fileSize > 3000 * 1024) {
        return 800;
    }
    else if (fileSize > 1000 * 1024) {
        return 1100;
    }
    else if (fileSize > 700 * 1024) {
        return 900;
    }
    else if (fileSize > 500 * 1024) {
        return 800;
    }
    else {
        return 700;
    }
}
const fileUploadService = (originalname, size, buffer, container) => __awaiter(void 0, void 0, void 0, function* () {
    const containerClient = blobService.getContainerClient(container);
    // filename refining
    const random = crypto_1.default.randomBytes(10).toString("hex");
    const extension = originalname.split('.').pop();
    const file_name = `${(0, urlGenerator_1.urlGenerator)(originalname).replace(/\.\w+$/, '')}-${random}.${extension}`;
    //resize file
    const reduce_size = getReductionSize(size);
    const image = yield jimp_1.default.read(buffer);
    yield image.resize(reduce_size, jimp_1.default.AUTO);
    const resizedImageBuffer = yield image.getBufferAsync(jimp_1.default.MIME_JPEG);
    yield containerClient.getBlockBlobClient(file_name).uploadData(size > 300 * 1024 ? resizedImageBuffer : buffer);
    return file_name;
});
exports.fileUploadService = fileUploadService;
const uploadProductImages = (files, product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const containerClient = blobService.getContainerClient(`${process.env.PRODUCT_BLOB_CONTAINER}`);
    for (const file of files) {
        const { originalname, size, buffer } = file;
        //filename refining
        const random = crypto_1.default.randomBytes(10).toString("hex");
        const extension = originalname.split(".").pop();
        const file_name = `${(0, urlGenerator_1.urlGenerator)(originalname).replace(/\.\w+$/, '')}-${random}.${extension}`;
        //resize file
        const reduce_size = getReductionSize(size);
        const image = yield jimp_1.default.read(buffer);
        yield image.resize(reduce_size, jimp_1.default.AUTO);
        const resizedImageBuffer = yield image.getBufferAsync(jimp_1.default.MIME_JPEG);
        yield containerClient.getBlockBlobClient(file_name).uploadData(size > 300 * 1024 ? resizedImageBuffer : buffer);
        yield models_1.default.Product_Image.create({
            product_id,
            image_url: PRODUCT_URL + file_name,
            image: file_name
        });
    }
});
exports.uploadProductImages = uploadProductImages;
const getUploadedImage = (res, file_name, container) => __awaiter(void 0, void 0, void 0, function* () {
    const containerClient = blobService.getContainerClient(container);
    const response = yield containerClient.getBlockBlobClient(file_name).downloadToBuffer();
    res.header('Content-Type', 'image/jpeg');
    res.send(response);
});
exports.getUploadedImage = getUploadedImage;
const deleteUploadedImage = (file_name, container) => __awaiter(void 0, void 0, void 0, function* () {
    const containerClient = blobService.getContainerClient(container);
    yield containerClient.getBlockBlobClient(file_name).deleteIfExists();
});
exports.deleteUploadedImage = deleteUploadedImage;
