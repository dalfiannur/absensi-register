import React from 'react'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core'
import { useStyle } from './style'
import Card from '../Card'
import HtmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'

export default (props) => {
  const classes = useStyle();

  const download = () => {
    const node = document.getElementById('card')
    HtmlToImage.toBlob(node)
      .then(blob => {
        saveAs(blob, 'Card.png')
      })
  }

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
        <Card
          departement={props.data.departement}
          country={props.data.country}
          name={props.data.name}
          nik={props.data.nik}
          barcode={props.data.barcode} />
        <button onClick={download} style={{
          marginTop: 150
        }} >Download</button>
      </DialogContentText>
    </Dialog>
  )
}