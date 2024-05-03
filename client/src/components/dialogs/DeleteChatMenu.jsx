import React, { useEffect } from 'react'
import { Menu, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { Delete, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteGroupMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({ deleteOptionAnchor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc)
  const closeHandler = () => { dispatch(setIsDeleteMenu(false)) }


  const [deleteChat, isloadingDeleteChat, deleteChatdata] = useAsyncMutation(useDeleteGroupMutation)
  const [leaveGroup, isloadingLeaveGroup, LeaveGroupdata] = useAsyncMutation(useLeaveGroupMutation)

  const leavegroup = () => {
    closeHandler()
    leaveGroup("leaving the group", { chatId: selectedDeleteChat.chatId })
    deleteOptionAnchor.current = null;
  }

  const removeChat = () => {
    closeHandler()
    deleteChat("deleting the chat", { chatId: selectedDeleteChat.chatId })
    deleteOptionAnchor.current = null;
  }

  useEffect(() => {
    if (deleteChatdata || LeaveGroupdata) navigate("/")

  }, [deleteChatdata, LeaveGroupdata])

  return (
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorE1={deleteOptionAnchor.current}       transformOrigin={{ vertical: 'center', horizontal: "center" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Stack sx={{ width: '10rem', padding: "0.5rem", cursor: "pointer" }} direction={"row"} alignItems={"center"} spacing={"0.5rem"} onClick={selectedDeleteChat.groupChat ? leavegroup : removeChat}>

        {selectedDeleteChat.groupChat ?
          <><ExitToApp /> <Typography>Leave Group</Typography> </>
          :
          <><Delete /> <Typography>Delete Chat</Typography>  </>
        }

      </Stack>
    </Menu>
  )
}

export default DeleteChatMenu