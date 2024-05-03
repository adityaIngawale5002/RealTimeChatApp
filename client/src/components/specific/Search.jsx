import { Dialog, Stack, TextField,DialogTitle,InputAdornment, List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useInputValidation} from "6pp"
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/Useritem'
import { useDispatch,useSelector } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import toast from 'react-hot-toast'
import { useAsyncMutation } from '../../hooks/hook'

const Search = () => {
  const dispatch=useDispatch()
  const Search=useInputValidation("")
  const [user,setUser]=useState(null)
  const {isSearch}=useSelector(state=>state.misc)


  
//function to search the user
  const [searchUser]=useLazySearchUserQuery()
//debouncing the search bar
  useEffect(()=>{
    const timeOutId=setTimeout(()=>{
      searchUser(Search.value)
      .then((response)=>{
        setUser(response.data.users)
      }
      )
      .catch((response)=>{
        toast.error(response.message)
      })
    },500)

    return ()=>{clearTimeout(timeOutId)}
  },[Search.value])




  // addfriend handler
  const [sendFrinedRequest,isLoadingSendFriendRequest]=useAsyncMutation(useSendFriendRequestMutation);

  const addFriendHandler=async (id)=>{
    await sendFrinedRequest("sending friend request",{userId:id});
  }
  
  return (
    <Dialog open={isSearch} onClose={()=>{dispatch(setIsSearch(false))}}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"} >Find People</DialogTitle>

          <TextField label="search friend" value={Search.value} onChange={Search.changeHandler}            variant="outlined" size="small" InputProps={{startAdornment:(<InputAdornment   position="start">
           <SearchIcon/>
           </InputAdornment>)}}
         />

        <List>
            {user?.map((user)=>{
           
              return <ListItem key={user._id}>
                    <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
                 </ListItem>
            })}
        </List>
      </Stack>
    </Dialog>
  )
}

export default Search