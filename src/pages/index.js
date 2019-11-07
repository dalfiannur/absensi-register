import React, { useState, useCallback } from "react"
import SEO from '../components/seo'
import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Countries} from '../data/Countries'
import { Departements } from '../data/Departements'

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


const IndexPage = () => {
  const classes = useStyle()

  const [valid, setValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [registered, setRegistered] = useState(true)
  const [nik, setNIK] = useState('')
  const [name, setName] = useState('')
  const [departement, setDepartement] = useState('')
  const [country, setCountry] = useState(null)
  const [picture, setPicture] = useState([])

  const onSubmit = useCallback(() => {
    const body = new FormData()
    body.append('nik', nik)
    body.append('name', name)
    body.append('depardement', departement)
    body.append('country', country)
    body.append('picture', picture[0])

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
  }, [nik, name, departement, country])

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
                value={departement}
                fullWidth
                onChange={e => setDepartement(e.target.value)}
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
            <input type='file' onChange={e => setPicture(e.target)} />
            <Button color='primary' variant='contained' className={classes.ButtonSubmit} disabled={!valid} onClick={onSubmit}>
              Submit
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
