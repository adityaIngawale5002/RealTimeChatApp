import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open ,handleClose,deletehandler}) => {

  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>confirm delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are u sure to delete the group
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={deletehandler}>Yes</Button>
            <Button color="error" onClick={handleClose}>No</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog