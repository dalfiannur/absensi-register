import React from 'react'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core'
import { useStyle } from './style'

export default (props) => {
  const classes = useStyle();

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={props.open}
      onClose={props.onClose}>
      <DialogTitle className={classes.DialogTitle}>
        Registration Success
      </DialogTitle>
      <DialogContentText className={classes.DialogContent}>
        User Successfully Registered
      </DialogContentText>
    </Dialog>
  )
}