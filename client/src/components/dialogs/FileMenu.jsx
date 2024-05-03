import { ListItemText, Menu, MenuList, Tooltip,MenuItem } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc'
import { Image ,AudioFile, VideoFile, UploadFile} from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({anchorE1,chatId}) => {
  const dispatch=useDispatch()
  const {isFileMenu}=useSelector(state=>state.misc)

  const imageRef=useRef(null);
  const audioRef=useRef(null);
  const videoRef=useRef(null);
  const fileRef=useRef(null);
 
 //api to send attachment
  const [sendAttachment]=useSendAttachmentsMutation()

  const selectImage=()=>imageRef.current?.click()
  const selectAudio=()=>audioRef.current?.click()
  const selectVideo=()=>videoRef.current?.click()
  const selectFile=()=>fileRef.current?.click()

  const fileChangeHandler=async (e,key)=>{
    const files=Array.from(e.target.files);
    
    if(files.length<=0)return ;
  
    if(files.length>5) return toast.error('you can only send 5 files at a time');
    
    dispatch(setUploadingLoader(true));
    const toastId=toast.loading("sending file");
    dispatch(setIsFileMenu(false));
   

    try { 
      const myForm=new FormData()
      myForm.append("chatId",chatId);
      
      files.map((file)=>{console.log(file)})
      files.forEach((file)=>myForm.append("files",file))
      const response=await sendAttachment(myForm);
      if(response.data){
        toast.success("files sent sucesfully",{id:toastId});
      }
      else{
        toast.error("failed to send the files",{id:toastId})
      }
    }catch (error) {
      toast.error(error,{id:toastId});

    }
    finally{
      dispatch(setUploadingLoader(false))
    }

  } 

  return (<>
     <Menu anchorEl={anchorE1} open={isFileMenu} onClose={()=>{dispatch(setIsFileMenu(false))}} 

     >
      <div style={{width:"10rem"}}>

       <MenuList>

          <MenuItem  onClick={selectImage}>
            <Tooltip title="images">
              <Image/>
            </Tooltip>
            <ListItemText style={{marginLeft:"0.5rem"}}>
              Images
            </ListItemText>
            <input type="file" multiple accept='image/png,image/jpeg,image/gif' style={{display:"none"}} onChange={(e)=>fileChangeHandler(e,"Images")} ref={imageRef}/>
          </MenuItem>
     

       
      
            <MenuItem onClick={selectAudio}>
              <Tooltip title="Audio">
                <AudioFile/>
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>
                Audio
              </ListItemText>
              <input type="file" multiple accept='audio/mpeg, audio/wav' style={{display:"none"}} onChange={(e)=>fileChangeHandler(e,"Audios")} ref={audioRef}/>
            </MenuItem>
       


       
       
            <MenuItem onClick={selectVideo}>
              <Tooltip title="Video">
                <VideoFile/>
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>
                Videos
              </ListItemText>
              <input type="file" multiple accept='video/mp4,video/webm,video/ogg' style={{display:"none"}} onChange={(e)=>fileChangeHandler(e,"Videos")} ref={videoRef}/>
            </MenuItem>
      

    
            <MenuItem onClick={selectFile}>
              <Tooltip title="Files">
                <UploadFile/>
              </Tooltip>
              <ListItemText style={{marginLeft:"0.5rem"}}>
                Files
              </ListItemText>
              <input type="file" multiple accept='*' style={{display:"none"}} onChange={(e)=>fileChangeHandler(e,"Files")} ref={fileRef}/>
            </MenuItem>

       </MenuList>
       </div>

     </Menu>
     </>
  )
}

export default FileMenu