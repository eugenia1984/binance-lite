import React, { useState } from "react"
import { Radio, RadioGroup, FormControlLabel, FormControl, Button, Container, Typography } from "@mui/material"
import { loginStyle } from "../../Login/loginStyle"
import { useLocation, useNavigate } from "react-router-dom"

const BuyPaymentMethod = () => {
  const location = useLocation()
  const moneda = new URLSearchParams(location.search).get("moneda")
  const navigate = useNavigate()
  const [method, setMethod] = useState("")

  const handleMethodChange = (event) => setMethod(event.target.value)

  const handleClick = () => navigate("/agregar-tarjeta")

  return (
    <Container maxWidth="xs" sx={ { minHeight: "82vh" } }>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={ loginStyle.typography }
        style={ { marginBottom: "50px" } }
      >
        Seleccionar metodo de cobro para comprar
      </Typography>
      <Typography variant="h1" align="center" marginBottom="20px">
        { moneda } unidades
      </Typography>
      <FormControl component="fieldset">
        <Typography variant="h3" align="center" marginBottom="20px">
          Método de Pago:
        </Typography>
        <RadioGroup
          aria-label="method"
          name="method"
          value={ method }
          onChange={ handleMethodChange }
        >
          <FormControlLabel
            value="tarjeta"
            control={ <Radio /> }
            label="Tarjeta de credito"
          />
          <FormControlLabel
            value="marcado-pago"
            control={ <Radio /> }
            label="Mercado Pago"
          />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary" onClick={ handleClick } sx={ { marginTop: '24px' } }>
        Confirmar Método de Pago
      </Button>
    </Container>
  )
}

export default BuyPaymentMethod
