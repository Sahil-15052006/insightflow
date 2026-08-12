import prisma from "../database/prismaConnection.js";
import { DatasetFileType,DatasetStatus } from "../../generated/prisma/enums.js";

export const uploadfile = async(name:string, fileName:string, fileType:DatasetFileType )=> {
    try{
        const uploadedFile = await prisma.dataset.create({
            data:{
                name,
                fileName,
                fileType,
                status:DatasetStatus.UPLOADED
            }
        })
        console.log(uploadedFile)
        return uploadedFile.id;
    }catch(err){
        console.log(`ERROR -> ${err}`)
    }
}

