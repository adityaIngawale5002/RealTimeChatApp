import React from 'react'
 import { transformImage } from '../../lib/Feature';
import { FileOpen } from '@mui/icons-material';
const RenderAttachment = ({file,url}) => {
    switch (file){
        case "video":
             return <Video src={url} preload="none" width={"200px"} controls />
            

        case  'image':
            return <img src={transformImage(url,200)} alt="attachment" width={"200px"} height={"150px"} style={{objectFit:"contain"}} />
            
        case "audio":
             return <audio src={url} preload="none"  controls />
              
    
        default:
           return  <FileOpen />;
    }

}

export default RenderAttachment