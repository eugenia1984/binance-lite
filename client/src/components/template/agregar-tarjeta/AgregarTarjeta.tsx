import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  TextField,
  Alert,
  AlertTitle,
  InputLabel,
} from "@mui/material";
import PrimaryButton from "../../atom/buttons/PrimaryButton";

import useAuth from "../../../hooks/useAuth";
import { PERSONAL_STYLES } from "../personal-account/PersonalAccountStyles";

const AgregarTarjeta = () => {
  const auth = useAuth(); // Usar el hook useAuth para obtener el contexto
  const { registerAuth } = auth;

  const [numero, setNumero] = useState<number | undefined>();
  const [titular, setTitular] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [cvv, setCvv] = useState<number | undefined>();
  const [direccion, setDireccion] = useState<string>("");
  const [codigoPostal, setCodigoPostal] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState({ text: "", msg: "" });
  const [nextButton, setNextButton] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNextClick = () => {
    if (!numero || !titular || !dateInput || !cvv || !direccion || !codigoPostal) {
      setError(true);
      setMessage({
        text: "Todos los campos son obligatorios",
        msg: "Tarjeta",
      });
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    navigate('/buy-coin')
  };

  const handleTitularTarjeta = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = value.replace(/[^a-zA-Z]/g, '');

    setTitular(formattedValue);
    habilitarContinuar();
  }


  const handleCP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setCodigoPostal(value);
      habilitarContinuar();
    }
  };

  const handleFechaVencimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Utiliza una expresión regular para permitir solo números y la barra "/"
    const formattedValue = value.replace(/[^\d/]/g, '');

    // Asegúrate de que siempre haya una barra "/" en la posición correcta (MM/AA)
    const parts = formattedValue.split('/');
    if (parts.length === 1 && formattedValue.length === 2) {
      const newValue = `${ formattedValue }/`;
      setDateInput(newValue);
    } else if (parts.length === 2) {
      const month = parts[0].slice(0, 2);
      const year = parts[1].slice(0, 2);
      const newValue = `${ month }/${ year }`;
      setDateInput(newValue);
    } else {
      setDateInput(formattedValue);
    }

    habilitarContinuar();
  };

  const habilitarContinuar = () => {
    if (numero && titular && dateInput && cvv && direccion && codigoPostal) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  };

  if (!auth) {
    // Manejar el caso en que el contexto no esté definido
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        No se puede registrar
      </Alert>
    );
  }

  return (
    <main style={ PERSONAL_STYLES.main }>
      <Container maxWidth="sm" sx={ PERSONAL_STYLES.container }>
        <Box sx={ PERSONAL_STYLES.boxContainer }>
          <Typography
            sx={ { textAlign: "center", marginLeft: '24px', marginRight: '24px' } }
            variant="h2"
            component="h1"
            mb={ 4 }
          >
            Datos de la tarjeta
          </Typography>
          <form style={ { maxWidth: "400px" } }>
            <InputLabel
              htmlFor="numero-tarjeta"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              Numero de la tarjeta
            </InputLabel>
            <TextField
              type="number"
              id="numero-tarjeta"
              label="Ingrese numero de la tarjeta"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ numero || "" }
              onChange={ (e) => setNumero(parseInt(e.target.value)) }
            />

            <InputLabel
              htmlFor="titular-tarjeta"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              Titular de la tarjeta
            </InputLabel>
            <TextField
              type="text"
              id="titular-tarjeta"
              label="Ingrese al titular de la tarjeta"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ titular }
              onChange={ handleTitularTarjeta }
            />

            <InputLabel
              htmlFor="fecha-vencimiento"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              Fecha de vencimiento
            </InputLabel>
            <TextField
              type="text"
              id="fecha-vencimiento"
              label="MM/AA"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ dateInput }
              onChange={ handleFechaVencimiento }
              inputProps={ {
                pattern: "\\d{2}/\\d{2}",
                inputMode: "numeric",
                maxLength: 5,
              } }
            />

            <InputLabel
              htmlFor="cvv-tarjeta"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              CVV
            </InputLabel>
            <TextField
              type="number"
              id="cvv-tarjeta"
              label="CVV"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ cvv || "" }
              onChange={ (e) => setCvv(parseInt(e.target.value)) }
            />

            <Typography variant="h3" component="h1" mb={ 4 }>
              Datos de Facturacion
            </Typography>
            <InputLabel
              htmlFor="direccion-facturacion"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              Direccion
            </InputLabel>
            <TextField
              type="text"
              id="direccion-facturacion"
              label="Direccion"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ direccion }
              onChange={ (e) => setDireccion(e.target.value) }
            />

            <InputLabel
              htmlFor="codigo-postal"
              sx={ PERSONAL_STYLES.textBold }
              style={ { textAlign: "left", fontSize: "18px" } }
            >
              Código Postal
            </InputLabel>
            <TextField
              type="number"
              id="codigo-postal"
              label="Código postal"
              variant="filled"
              style={ { width: "100%", marginBottom: "20px" } }
              value={ codigoPostal }
              onChange={ handleCP }
            />
            { error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { message.text } — <strong>{ message.msg }</strong>
              </Alert>
            ) }
            <PrimaryButton
              text={ "Siguiente" }
              ariaLabelText="Continuar"
              variant="contained"
              color="primary"
              disabled={ !nextButton }
              onClick={ handleNextClick }
            />
          </form>
        </Box>
      </Container>
    </main>
  );
};

export default AgregarTarjeta;
