export function acceptedFileType(fileType: string){
    if(fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png'){
        return true;
    }else{
        return false;
    }
}