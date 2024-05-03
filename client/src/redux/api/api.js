import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`http://localhost:3000/`}),
    tagTypes:['Chat','User',],
   

    endpoints:(builder)=>({
        myChats:builder.query({
            query:()=>({
                url:"chat/getMyChat",
                credentials:"include",
            }),
            providesTags:["Chat"]
        }),
       
        
        searchUser:builder.query({
            query:(name)=>({
                url:`user/search?name=${name}`,
                credentials:"include",
            }),
            providesTags:['User']
        }),
        
        sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:"/user/request",
                method:"PUT",
                credentials:"include",
                body:data,
            }),
            invalidateTags:["User"],
        })
        ,
        
        getNotification:builder.query({
            query:()=>({
                url:"/user/notification",
                credentials:"include",
                
            }),
            keepUnusedDataFor:0,
        }),
        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:"/user/acceptRequest",
                method:"POST",
                credentials:"include",
                body:data,
            }),
            invalidateTags:["Chat"],
        }),
        chatDetails:builder.query({
            query:({chatId,populate=false})=>{
                
               let url=`chat/${chatId}`;
               if(populate) url+="?populate=true";
               return{
                url,
                credentials:"include"
               }
            },
            providesTags:["Chat"],
        }),
        getOldMessages:builder.query({
            query:({chatId,page})=>({
                url:`chat/message/${chatId}?pages=${page}`,
                credentials:"include",
            }),
            keepUnusedDataFor:0,
        }),
        sendAttachments:builder.mutation({
            query:(data)=>({
                url:`chat/attachmentMessage`,
                method:"POST",
                credentials:"include",
                body:data
            }),
     
        }),
        getMyGroups:builder.query({
            query:(data)=>({
                url:`chat/getMyGroups`,
                credentials:"include",
               
            }),
            providesTags:['Chat'],
        }),
        availableFriends:builder.query({
            query:(chatId)=>{
                let  url='user/friends';
                if(chatId){
                    url+=`?chatId=${chatId}`
                };

                return {
                    url,
                    credentials:"include"
                }

            },
            providesTags:["Chat"]
        }),
        newGroup:builder.mutation({
            query:({name,members})=>({
                url:"chat/newGroup",
                method:"POST",
                credentials:"include",
                body:{name,members}
            }),
            invalidatesTags:["Chat"],
        }),
        renameGroup:builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:["Chat"],
        }),
        removerMember:builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/removemember`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId}
            }),
            invalidatesTags:["Chat"],
        }),
        addMember:builder.mutation({
            query:({chatId,members})=>({
                url:`chat/addGroupMember`,
                method:"PUT",
                credentials:"include",
                body:{chatId,members}
            }),
            invalidatesTags:["Chat"],
        }),
        deleteGroup:builder.mutation({
            query:({chatId})=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
                
            }),
            invalidatesTags:["Chat"],
        }),
        leaveGroup:builder.mutation({
            query:({chatId})=>({
                url:`chat/leaveGroup/${chatId}`,
                method:"DELETE",
                credentials:"include",
                
            }),
            invalidatesTags:["Chat"],
        }),


    })

   
})

export default api;
export const {useMyChatsQuery,useLazySearchUserQuery,useSendFriendRequestMutation,useGetNotificationQuery,useAcceptFriendRequestMutation,useChatDetailsQuery,useGetOldMessagesQuery,useSendAttachmentsMutation,useGetMyGroupsQuery,useAvailableFriendsQuery,
useNewGroupMutation,useRenameGroupMutation,useRemoverMemberMutation,useAddMemberMutation,useDeleteGroupMutation,useLeaveGroupMutation}=api