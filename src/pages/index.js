import React, { useState, useCallback, useRef, useEffect } from "react"
import SEO from '../components/seo'
import { TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SuccessDialog from '../components/SuccessDialog'
import { Countries } from '../data/Countries'
import { Departements } from '../data/Departements'
import JsBarcode from 'jsbarcode'
import { createCanvas } from 'canvas'
import Card from '../components/Card'
import './index.scss'

const URL = 'https://barcode-attendance-system.herokuapp.com'
const useStyle = makeStyles(theme => ({
  Paper: {
    padding: 10,
    marginTop: 100
  },
  ButtonSubmit: {
    margin: '10px auto',
    display: 'block'
  }
}))

const IndexPage = () => {
  const classes = useStyle()

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  const [valid, setValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registered, setRegistered] = useState(true)
  const [nik, setNIK] = useState('')
  const [name, setName] = useState('')
  const [barcode, setBarcode] = useState('')
  const [departement, setDepartement] = useState(null)
  const [country, setCountry] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const inputPicture = useRef(null)

  const onSubmit = useCallback(() => {
    const body = new FormData()

    body.append('nik', nik)
    body.append('name', name)
    body.append('departementId', departement.id)
    body.append('country', country.value)
    body.append('picture', inputPicture.current.files[0])

    // fetch(`${URL}/register`, {
    //   method: 'POST',
    //   body
    // })
    //   .then(() => {
    setOpenSuccessDialog(true)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  }, [nik, name, departement, country])

  const checkNIK = useCallback(() => {
    const canvas = createCanvas(150, 150, 'svg')
    JsBarcode(canvas, nik ? nik : '29012343', {
      background: 'rgba(255,255,255)',
      lineColor: '#000'
    })
    setBarcode(canvas.toDataURL('image/png'))

    // fetch(`${URL}/nik/${nik}`)
    //   .then(result => result.json())
    //   .then(({ exist }) => {
    //     if (!exist) {
    setRegistered(true)
    setValid(true)
    //   } else {
    //     setRegistered(false)
    //     setValid(false)
    //   }
    // })
  }, [nik])

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (String(userAgent).includes('Mobile')) {
      setIsMobile(true)
    }
  }, [])

  return (
    <React.Fragment>
      <SEO title="Register" />
      <div className='wrapper'>
        <div className='card-form'>
          <Card id={isMobile ? 'mobile' : 'desktop'} departement={departement} country={country} name={name} barcode={barcode} />
          <div className='card-form__inner'>
            <FormControl
              fullWidth
              margin='normal'>
              <TextField
                error={!valid}
                fullWidth
                onChange={e => setNIK(e.target.value)}
                label='NIK'
                onKeyUp={checkNIK}
                helperText={registered ? '' : 'NIK has been registered'} />
            </FormControl>
            <FormControl
              fullWidth
              margin='normal'>
              <TextField
                fullWidth
                onChange={e => setName(e.target.value)}
                label='Name' />
            </FormControl>
            <FormControl
              fullWidth
              margin='normal'>
              <InputLabel id="input-departement-label">Departement</InputLabel>
              <Select
                labelId="input-departement-label"
                id="input-departement"
                value={departement ? departement.id : null}
                fullWidth
                onChange={e => setDepartement(e.target.value)}
              >
                {
                  Departements.map(item => (
                    <MenuItem value={item} key={item.name}>{item.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              margin='normal'>
              <InputLabel id="input-country-label">Country</InputLabel>
              <Select
                labelId="input-country-label"
                id="input-country"
                value={country ? country.value : null}
                fullWidth
                onChange={e => setCountry(e.target.value)}
              >
                {
                  Countries.map(item => (
                    <MenuItem value={item} key={item.value}>{item.text}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <input type='file' ref={inputPicture} />
            <Button color='primary' variant='contained' className={classes.ButtonSubmit} disabled={!valid} onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <SuccessDialog
        open={openSuccessDialog}
        data={{
          departement,
          country,
          nik,
          name,
          barcode
        }}
        onClose={() => setOpenSuccessDialog(false)} />
    </React.Fragment>
  )
}

export default IndexPage
