"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptedFileType = void 0;
function acceptedFileType(fileType) {
    if (fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png') {
        return true;
    }
    else {
        return false;
    }
}
exports.acceptedFileType = acceptedFileType;
