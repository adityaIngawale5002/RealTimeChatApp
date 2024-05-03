import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { attachmentMulter } from '../middleware/multer.middleware.js'
import { newGroupChat, getMyChat, addGroupMember, getMyGroups, removeMember, leaveGroup, sendAttachment, getChatDetils, renameGroup, deleteChat, getMessages } from '../controller/chat.controller.js';
import { addMemberValidator, getMessageValidator, leaveGroupValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from '../lib/validators.js';
export const router = express();

router.use(isAuthenticated)
router.route("/newGroup").post(newGroupChatValidator(), validateHandler, newGroupChat)
router.route("/getMyChat").get(getMyChat)
router.route("/getMyGroups").get(getMyGroups)
router.route("/addGroupMember").put(addMemberValidator(), validateHandler, addGroupMember)
router.route("/removemember").put(removeMemberValidator(), validateHandler, removeMember)
router.route('/leaveGroup/:id').delete(leaveGroupValidator(), validateHandler, leaveGroup)
router.route('/attachmentMessage').post(attachmentMulter, sendAttachmentValidator(), validateHandler, sendAttachment)
 
router.route('/message/:id').get(getMessageValidator(), validateHandler, getMessages)



router.route('/:id')
    .get(getMessageValidator(), validateHandler, getChatDetils)
    .put(renameGroupValidator(), validateHandler, renameGroup)
    .delete(getMessageValidator(), validateHandler, deleteChat);



