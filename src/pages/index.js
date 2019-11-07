import React, { useState, useCallback } from "react"
import SEO from '../components/seo'
import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const URL = 'https://barcode-attendance-system.herokuapp.com'
const useStyle = makeStyles(theme => ({
  Paper: {
    padding: 10
  },
  ButtonSubmit: {
    margin: '10px auto',
    display: 'block'
  }
}))

const Departements = [
  {
    id: 1,
    name: 'WH RPMP'
  },
  {
    id: 2,
    name: 'WH FG'
  },
  {
    id: 3,
    name: 'PPPC & PREPARASI PLANT'
  },
  {
    id: 4,
    name: 'PRODUKSI'
  },
  {
    id: 5,
    name: 'MAINTENANCE'
  },
  {
    id: 6,
    name: 'PPIC'
  },
  {
    id: 7,
    name: 'PROCUREMENT'
  },
  {
    id: 8,
    name: 'TPP'
  },
  {
    id: 9,
    name: 'PMD'
  },
  {
    id: 10,
    name: 'IT'
  },
  {
    id: 11,
    name: 'COSTING'
  },
  {
    id: 12,
    name: 'MS'
  },
]

const Countries = [
  {
    value: 'indonesia',
    text: 'Indonesia'
  }
]

const IndexPage = () => {
  const classes = useStyle()

  const [valid, setValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registered, setRegistered] = useState(true)
  const [nik, setNIK] = useState('')
  const [name, setName] = useState('')
  const [departementId, setDepartementId] = useState(null)
  const [country, setCountry] = useState(null)
  const [picture, setPicture] = useState(null)

  const onSubmit = useCallback(() => {
    const body = new FormData()
    if (picture !== null) {
      body.append('nik', nik)
      body.append('name', name)
      body.append('departementId', departementId)
      body.append('country', country)
      body.append('picture', picture)

      console.log(picture)

      fetch(`${URL}/register`, {
        method: 'POST',
        body
      })
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [nik, name, departementId, country])

  const checkNIK = useCallback(() => {
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

  const handlePicture = (e) => {
    setPicture(e.target.files[0])
  }

  return (
    <React.Fragment>
      <SEO title="Register" />
      <Grid container justify='center'>
        <Grid md={4}>
          <Paper className={classes.Paper}>
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
            <input type='file' onChange={handlePicture} />
            <Button color='primary' variant='contained' className={classes.ButtonSubmit} disabled={!valid} onClick={onSubmit}>
              Submint
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        message={<p>User successfully registered</p>}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)} />
    </React.Fragment>
  )
}

export default IndexPage
