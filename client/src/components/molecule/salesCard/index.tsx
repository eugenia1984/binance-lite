import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { loginStyle } from '../Login/loginStyle';
import PrimaryButton from '../../atom/buttons/PrimaryButton';
import {Container, Typography} from "@mui/material"
import { useApiContext } from '../../../context/FetchContext';




const NumericInput = () => {

  const { coinsData } = useApiContext()
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = location.search
  const idCoin = urlSearch.split('=')[1]

  const coinToShow = coinsData.filter(coin => coin.uuid === idCoin)

  const handleInputChange = (e) =>  setInputValue(e.target.value)

const handleClick = () => {
    navigate(`/paymentmethod?moneda=${inputValue}`)
}
  

  
  return (
    <Container maxWidth="xs" sx={{minHeight: '82vh'}}>
      <Typography 
        variant='h2'
        align='left'
        gutterBottom
        sx={loginStyle.typography}
      >
        Vender {coinToShow[0]?.name}
      </Typography>
      <Typography variant="h3" style={{margin:"20px 0px 10px"}}>
        Quiero vender
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        placeholder='Ingrese un importe'
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        style={{marginBottom:"20px", marginTop:"10px", marginRight:"15px",}}
      />
      <PrimaryButton 
        ariaLabelText='Confirmar'
        text='Confirmar' 
        onClick={handleClick} 
        style={{marginBottom:"40px"}}
      />
    </Container>
  );
};

export default NumericInput;










// import React, { useState } from 'react';
// import { TextField, MenuItem, Box, Typography, Container } from '@mui/material';
// import { loginStyle } from '../components/molecule/Login/loginStyle';

// const CurrencyConverter = () => {
//   const [amount, setAmount] = useState('');
//   const [currency, setCurrency] = useState('ARG');

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const handleCurrencyChange = (event) => {
//     setCurrency(event.target.value);
//   };

//   return (
//     <Container maxWidth="xs">
//       <Typography variant="h5" gutterBottom sx={loginStyle.typography}>
//         Quiero Pagar
//       </Typography>
//       <Box display="flex" alignItems="center">
//         <TextField
//           label="Amount"
//           type="number"
//           variant="outlined"
//           value={amount}
//           onChange={handleAmountChange}
//           InputProps={{
//             endAdornment: (
//               <TextField
//                 select
//                 value={currency}
//                 onChange={handleCurrencyChange}
//                 variant="outlined"
//                 fullWidth
//                 size="small"
//               >
//                 <MenuItem value="Arg">Ars</MenuItem>
                
                
//               </TextField>
              
//             ),
//           }}
//         />
//       </Box>
//       <Typography style={{fontSize:"10px", marginTop:"15px"}} gutterBottom >
//         Importe estimado
//       </Typography>
      
//     </Container>
//   );
// };

// export default CurrencyConverter;





// import React from 'react'
// import NumericInput from '../../../pages/SellScreen'


// const SalesCard = () => {
//   return (
//     <NumericInput />
//   )
// }

// export default SalesCard