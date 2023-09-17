export const LOGIN_STYLES = {
  container: {
    display: 'flex',
    alignContent: 'center',
    margin: '2rem auto 3rem',
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    padding: '20px 20px 80px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.08), 0 0 30px rgba(0, 0, 0, 0.06), 0 0 40px rgba(0, 0, 0, 0.04)'
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '280px'
  },
  btnGoogle: {
    marginTop: '30px',
    width: '100%',
    background: 'white',
    color: 'black',
    '&:hover': {
      background: '#FFC107',
    }
  },
  txt: {
    maxWidth: '280px',
    margin: '1.75rem 0',
    fontSize: '16px',
    lineHeight: '1.4',
    textAlign: 'center'
  },
  link: {
      marginLeft: '20px',
      width: '100%',
      textDecoration: 'none',
      color: '#C99400',
      fontWeight: '700'
  },
  txt2: {
    margin: '1.5rem 0rem 0rem',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: '700'
  },
  txtLink: {
    margin: '1.5rem 0rem 0rem',
  }
}