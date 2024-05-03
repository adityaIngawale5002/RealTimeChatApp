
const fileFormat=(url="")=>{
    const fileExtension=url.split(".").pop();

    if(fileExtension==="mp4" ||fileExtension==="webm"||fileExtension==="ogg" ) return "video";

    if(fileExtension==="mp3" || fileExtension==="wav") return "audio";

    if(fileExtension==="png" || 
    fileExtension==="jpg" ||
    fileExtension==="jpeg" ||
    fileExtension==="gif") return "image";

    return "file";
};

const transformImage=(url="",width=100)=>{
    const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}/`);
    return newUrl;
}

export {fileFormat,transformImage}
