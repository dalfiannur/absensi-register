import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContentText, TextField } from '@material-ui/core'
import { useStyle } from './style'
import Card from '../Card'
import HtmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import Button from '@material-ui/core/Button';
import JsBarcode from 'jsbarcode'
import { createCanvas } from 'canvas'

const URL = 'https://barcode-attendance-system.herokuapp.com'

export default (props) => {
  const classes = useStyle();
  const [isMobile, setIsMobile] = useState(false)
  const [barcode, setBarcode] = useState('')
  const [user, setUser] = useState({
    nik: '',
    name: '',
    departement: '',
    country: ''
  })

  const download = () => {
    const node = document.querySelector(isMobile ? '#card-mobile-download-check' : '#card-desktop-download-check').children

    HtmlToImage.toBlob(node[0])
      .then(blob => {
        saveAs(blob, 'Card.png')
      })
  }

  const findUser = (nik) => {
    fetch(`${URL}/user/${nik}`)
      .then(res => res.json())
      .then(user => {
        setUser(user)
        const canvas = createCanvas(150, 150, 'svg')
        JsBarcode(canvas, user ? user.nik : '29012343', {
          background: 'rgba(255,255,255)',
          lineColor: '#000'
        })
        setBarcode(canvas.toDataURL('image/png'))
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (String(userAgent).includes('Mobile')) {
      setIsMobile(true)
    }
  }, [])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}>
      <DialogTitle className={classes.DialogTitle}>
        CHECK USER
      </DialogTitle>
      <DialogContentText className={classes.DialogContent}>
        <TextField
          className={classes.TextField}
          placeholder='NIK'
          fullWidth
          onChange={(v) => findUser(v.target.value)} />

        <Card
          id={isMobile ? 'mobile-download-check' : 'desktop-download-check'}
          departement={user.departement}
          country={user.country}
          name={user.name}
          nik={user.nik}
          barcode={barcode} />
        <div className={classes.downloadMsg}>Please download your E-Card</div>
        <Button onClick={download} variant="contained" color="primary" disable={user.nik !== '' ? false : true} className={classes.btnDownload}>
          Download
      </Button>
      </DialogContentText>
    </Dialog>
  )
}