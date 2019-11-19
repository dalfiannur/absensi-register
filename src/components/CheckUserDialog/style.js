import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  DialogTitle: {
    alignSelf: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  DialogContent: {

  },
  Dialog: {
    width: 'fit-content'
  },
  btnDownload: {
    // marginTop: 150,
    alignSelf: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 150
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  downloadMsg: {
    width: '100%',
    marginTop: 15,
    textAlign: 'center',
    marginBottom: 30
  },
  TextField: {
    padding: 15
  }
}))