import multer from "multer"

export const multerFileHandler=multer({
    limits:{
        fileSize:1024*1024*5,
    },
    dest:'./public'
})

export const singleAvatar=multerFileHandler.single("avatar")
export const attachmentMulter=multerFileHandler.array('files',5)