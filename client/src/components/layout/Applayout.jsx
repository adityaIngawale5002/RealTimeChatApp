import React, { useCallback, useRef } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import Profile from '../specific/Profile'
import {Drawer, Grid, Skeleton} from "@mui/material"
import ChatList from '../specific/ChatList'
import { useParams } from 'react-router-dom'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobileMenuFriend, setSelectedDeleteChat } from '../../redux/reducers/misc'
import { useErrors, useSocketEvent } from '../../hooks/hook'
import { getSocket } from '../../socket'
import { incrementNotification, setnewMessagesAlert } from '../../redux/reducers/Chat'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'

const Applayout=()=>(WrappedComponent)=>{

    return (props)=>{
        const {user}=useSelector(state=>state.auth)
        const {isMobileMenuFriend}=useSelector(state=>state.misc)
        const {chatId}=useParams();
        const dispatch=useDispatch();

        
        //get alert from the store
        const {newMessagesAlert}=useSelector(state=>state.chat)

        const deleteMenuAnchor=useRef(null);
        
        //getting my chat list here
        const {isloading,data,isError,error,refetch}=useMyChatsQuery("");
       
        
        
        //error handling for any rtk query
        useErrors([{isError,error}])

        //delete chat handler
        const handleDeleteChat=(e,_id,groupChat)=>{
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({chatId:_id,groupChat}))
            deleteMenuAnchor.current=e.currentTarget;
        }
       
        
        //function to handle socket events 
        const newMessagesAlertHandler=useCallback((data)=>{
            if(data.chatId==chatId)return 
            dispatch(setnewMessagesAlert(data))
        },[chatId])
        const newRequestHandler=useCallback(()=>{
            dispatch(incrementNotification());
        },[])
        const refetchHandler=useCallback((data)=>{
            refetch()
        },[])

       

        //socket implementation
        const socket=getSocket();
        //socket event names with handler function
        const eventHandler={"NEW_MESSAGE_ALERT":newMessagesAlertHandler,"NEW_REQUEST":newRequestHandler,"REFETCH_CHAT":refetchHandler};
        //hook to handle socket events
        useSocketEvent(socket,eventHandler)


        return (
            <>
                 <Title/>              
                 <Header/>
                 <DeleteChatMenu deleteOptionAnchor={deleteMenuAnchor}/>

                {   isloading?
                    <Skeleton/>:
                    <Drawer open={isMobileMenuFriend} onClose={()=>{dispatch(setIsMobileMenuFriend(false))}}>
                          <ChatList w="70vw" chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={[]} handleDeleteChat={handleDeleteChat} />
                    </Drawer>
                }

                 <Grid container sx={{height:"calc(100vh-4rem)"}} >

                    {/* chatList here */}
                    <Grid item sx={{display:{xs:"none",sm:"block"},height:"100%",overflowY:"hidden"}} sm={4} md={3}  >

                            {isloading?
                            <Skeleton/> :
                            <ChatList chats={data?.chats} chatId={chatId} newMessagesAlert={newMessagesAlert} onlineUsers={[1,3]} handleDeleteChat={handleDeleteChat} />}

                    </Grid>


                        <Grid item xs={12} sm={8} md={5} lg={6} sx={{height:"100%"}}  >
                            <WrappedComponent {...props} chatId={chatId} user={user}/>
                        </Grid>

                        {/* profile component */}
                        <Grid item  md={4}  lg={3} sx={{display:{xs:"none",md:"block"},padding:"2rem",bgcolor:"rgb(1,1,1,0.6)",height:"90vh"} }  >
                             <Profile />
                        </Grid>
                 </Grid>
              
               
            </>
        )
    }
}
export default Applayout