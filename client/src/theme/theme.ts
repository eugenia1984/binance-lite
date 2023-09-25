import { createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Palette {
    primaryYellow: string
    primaryYellowDark: string
    textBlack: string
    textRed: string
    textGreen: string
    bgGray: string
    bgGrayLight: string
    bgWhite: string
  }
  interface PaletteOptions {
    primaryYellow: string
    primaryYellowDark: string
    textBlack: string
    textRed: string
    textGreen: string
    bgGray: string
    bgGrayLight: string
    bgWhite: string
  }
}

export interface CustomStyleProps {
  primaryYellow?: string
  primaryYellowDark?: string
  textBlack?: string
  textRed?: string
  textGreen?: string
  bgGray?: string
  bgGrayLight?: string
  bgWhite?: string
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    anchor: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    anchor?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    anchor: true
  }
}

export const binanceTheme = createTheme({
  palette: {
    primaryYellow: '#FCD535',
    primaryYellowDark: '#C99400',
    textBlack: '#1E2329',
    textRed: '#CF304A',
    textGreen: '#03A66D',
    bgGray: '#929AA5',
    bgGrayLight: '#EAECEF',
    bgWhite: '#FFFFFF',
    primary: {
      main: '#049C3D'
    },
    secondary: {
      main: '#DF3045'
    },
    error: {
      main: '#CF304A'
    },
    warning: {
      main: '#C99400'
    },
    success: {
      main: '#03A66D'
    }
  },
  typography: {
    fontFamily: 'Arial,sans-serif',
    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: '800',
      color: '#1E2329',
      margin: '20px auto'
    },
    h2: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '700',
      color: '#1E2329',
      margin: '18px auto'
    },
    h3: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: '500',
      color: '#1E2329',
      margin: '0'
    },
    h4: {
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: '500',
      color: '#1E2329',
      margin: '0'
    },
    h5: {
      fontSize: '15px',
      lineHeight: '21px',
      fontWeight: '500',
      color: '#1E2329',
      margin: '0'
    },
    body1: {
      fontFamily: 'Arial,sans-serif',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      margin: '0'
    },
    body2: {
      fontFamily: 'Arial,sans-serif',
      fontSize: '10px',
      lineHeight: '14px',
      fontWeight: '400',
      margin: '0'
    },
    caption: {
      fontFamily: 'Arial,sans-serif',
      fontSize: '11px',
      lineHeight: '15px',
      fontWeight: '600'
    },
    button: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '600',
      textTransform: 'none',
      margin: '0'
    },
    anchor: {
      fontSize: '13px',
      fontWeight: 700,
      color: '#1226AA',
      textDecoration: 'underline',
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled'
      },
      styleOverrides: {
        root: {
          input: {
            '&[type=number]': {
              'MozAppearance': 'textfield',
            },
            '&::-webkit-outer-spin-button': {
              'WebkitAppearance': 'none',
              margin: 0,
            },
            '&::-webkit-inner-spin-button': {
              'WebkitAppearance': 'none',
              margin: 0,
            }
          }
        }
      }
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontSize: '22px',
          '&.Mui-error': {
            color: 'black'
          },
          '&.Mui-focused': {
            color: 'black'
          }
        }
      }
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #C7C8C8',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          fontSize: '18px',
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ]),
          ':hover': {
            backgroundColor: '#FFFFFF',
          },
          '&.Mui-error': {
            borderColor: '#CD1812',
          }
        })
      }
    },
    MuiSelect: {
      defaultProps: {
        variant: 'filled'
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          fontStyle: 'normal',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '24px',
          textDecoration: 'uppercase',
          textAlign: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 24px',
          minWidht: '80px',
          color: 'rgb(24, 26, 32)',
          borderRadius: '4px',
          minHeight: '24px',
          border: 'none',
          backgroundImage: 'none',
          backgroundColor: 'rgb(252, 213, 53)',
          width: '100%'
        },
        text: {
          textDecoration: 'uppercase',
          '&.Mui-focusVisible': {
            backgroundColor: '#095C3C',
          },
          ':hover': {
            boxShadow: 'none',
            backgroundImage: 'none',
            backgroundColor: 'rgb(252, 213, 53)',
            opacity: '0.9'
          }
        },
        outlined: {
          border: '2px solid',
          textDecoration: 'uppercase',
          ':hover': {
            border: '2px solid',
            background: '#deb409',
          },
          ':focus': {
            color: 'white',
            background: '#095C3CA'
          },
          '&.Mui-disabled': {
            border: '2px solid #8F9193',
            color: '#8F9193'
          }
        },
        containedPrimary: {
          textDecoration: 'uppercase',
          background: 'rgb(252, 213, 53)',
          ':hover': {
            backgroundColor: 'rgb(252, 213, 53)',
            opacity: '0.9'
          },
          ':focus': {
            backgroundColor: 'rgb(252, 213, 53)'
          },
          '&.Mui-disabled': {
            background: 'rgb(252, 213, 53)'
          }
        },
        containedSecondary: {
          textDecoration: 'uppercase',
          background: 'rgb(234, 236, 239)',
          ':hover': {
            backgroundColor: 'rgb(245, 245, 245)'
          },
          ':focus': {
            backgroundColor: 'rgb(245, 245, 245)'
          },
          '&.Mui-disabled': {
            background: 'rgb(245, 245, 245)',
          }
        },
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          lineHeight: '21px',
          color: '#202327',
          textAlign: 'left',
          borderBottom: 'none'
        },
        head: {
          color: '#555555',
          fontSize: '13px',
          lineHeight: '15px',
          fontFamily: 'Nunito Sans, sans-serif'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          ":nth-of-type(odd)": {
            background: 'rgba(231,233,247,0.4)',
          }
        },
        head: {
          backgroundColor: '#fff !important'
        },
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 32,
          height: 18,
          padding: 0,
          display: 'flex',
          ':active': {
            '& .MuiSwitch-thumb': {
              width: 15,
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(14px) !important',
          },
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(12px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
              },
            },
          },
          '& .Mui-focusVisible': {
            backgroundColor: '#1226AA',
            color: '#F1F2FA',

          },
          '& .Mui-checked.Mui-focusVisible': {
            backgroundColor: 'black',
            color: 'white',

          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 14,
            height: 14,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
              duration: 200,
            }),
          },
          '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.1,
              backgroundColor: "#fff"
            }
          }
        })
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px'
        }
      }
    },
    MuiSnackbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiSnackbarContent-root': {
            padding: '1em',
            fontSize: '15px',
            lineHeight: '17px',
            color: 'black',
            backgroundColor: theme.palette.textBlack
          }
        })
      }
    },
    MuiAutocomplete: { // fix popper wont open
      defaultProps: {
        componentsProps: {
          popper: {
            sx: {
              height: 0
            }
          },
          paper: {
            sx: {
              width: 'max-content'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: ({ theme }) => ({
          background: theme.palette.bgGrayLight,
          borderRadius: '8px',
          fontSize: '9px',
          fontWeight: 700,
          color: theme.palette.primary.main
        })
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.bgGray,
          borderWidth: '1px'
        })
      }
    }
  }
})