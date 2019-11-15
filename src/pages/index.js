import React, { useState, useCallback, useRef, useMemo } from "react"
import SEO from '../components/seo'
import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SuccessDialog from '../components/SuccessDialog'
import { Countries } from '../data/Countries'
import { Departements } from '../data/Departements'
import JsBarcode from 'jsbarcode'
import { createCanvas } from 'canvas'
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
  const [departementId, setDepartementId] = useState(null)
  const [country, setCountry] = useState(null)
  const inputPicture = useRef(null)

  const onSubmit = useCallback(() => {
    const body = new FormData()

    body.append('nik', nik)
    body.append('name', name)
    body.append('departementId', departementId)
    body.append('country', country)
    body.append('picture', inputPicture.current.files[0])

    fetch(`${URL}/register`, {
      method: 'POST',
      body
    })
      .then(() => {
        setOpenSuccessDialog(true)
        setTimeout(() => {
          setOpenSuccessDialog(false)
        }, 4000)
      })
      .catch(error => {
        console.log(error)
      })
  }, [nik, name, departementId, country])

  const checkNIK = useCallback(() => {
    const canvas = createCanvas(150, 150, 'svg')
    JsBarcode(canvas, nik ? nik : '29012343', {
      background: 'rgba(0,0,0,0.5)',
      lineColor: '#ffffff'
    })
    setBarcode(canvas.toDataURL('image/png'))

    fetch(`${URL}/nik/${nik}`)
      .then(result => result.json())
      .then(({ exist }) => {
        if (!exist) {
          setRegistered(true)
          setValid(true)
        } else {
          setRegistered(false)
          setValid(false)
        }
      })
  }, [nik])

  return (
    <React.Fragment>
      <SEO title="Register" />
      <div className='wrapper'>
        <div className='card-form'>
          <div className='card-list'>
            <div className='card-item__wrapper'>
              <div className='card-item__side -front'>
                <div className='card-item__focus'></div>
                <div className='card-item__cover'>
                  <img className='card-item__bg' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/5.jpeg' />
                </div>
                <div className='card-item__wrapper'>
                  <div className='card-item__top'>
                    <img className='card-item__chip' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png' />
                    <div className='card-item__type'>
                      <img className='card-item__typeImg' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png' alt />
                    </div>
                  </div>
                  <label for='cardNumber' className='card-item__number'>

                  </label>
                  <div className='card-item__content'>
                    <label for='cardName' className='card-item__info'>
                      <div className='card-item__holder'>Card Holder</div>
                      <div className='card-item__name'>Dea Pratiwi Putri</div>
                    </label>
                    <div class='card-item__date'>
                      <img alt={nik} src={barcode} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-item__side -back'>
                <div className='card-item__cover'>
                  <img className='card-item__bg' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/5.jpeg' />
                </div>
                <div className='card-item__band' />
                <div className='card-item__cvv'>
                  <div className='card-item__cvvTitle'>CVV</div>
                  <div className='card-item__cvvBand' />
                  <div className='card-item__type'>
                    <img className='card-item__img' src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png' />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                value={departementId}
                fullWidth
                onChange={e => setDepartementId(e.target.value)}
              >
                {
                  Departements.map(item => (
                    <MenuItem value={item.id} key={item.name}>{item.name}</MenuItem>
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
                value={country}
                fullWidth
                onChange={e => setCountry(e.target.value)}
              >
                {
                  Countries.map(item => (
                    <MenuItem value={item.value} key={item.value}>{item.text}</MenuItem>
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
        onClose={() => setOpenSuccessDialog(false)} />
    </React.Fragment>
  )
}

export default IndexPage
