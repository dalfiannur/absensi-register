import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core'
import { useStyle } from './style'
import Card from '../Card'
import HtmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import Button from '@material-ui/core/Button';

export default (props) => {
  const classes = useStyle();
  const [isMobile, setIsMobile] = useState(false)

  const download = () => {
    const node = document.querySelector(isMobile ? '#card-mobile-download' : '#card-desktop-download').children

    HtmlToImage.toBlob(node[0])
      .then(blob => {
        saveAs(blob, 'Card.png')
      })
  }

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (String(userAgent).includes('Mobile')) {
      setIsMobile(true)
    }
  }, [window])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}>
      <DialogTitle className={classes.DialogTitle}>
        REGISTRATION SUCCESS
      </DialogTitle>
      <DialogContentText className={classes.DialogContent}>
        <Card
          id={isMobile ? 'mobile-download' : 'desktop-download'}
          departement={props.data.departement}
          country={props.data.country}
          name={props.data.name}
          nik={props.data.nik}
          barcode={props.data.barcode} />
        <div className={classes.downloadMsg}>Please download your E-Card</div>
        <Button onClick={download} variant="contained" color="primary" className={classes.btnDownload}>
          Download
      </Button>
      </DialogContentText>
    </Dialog>
  )
}