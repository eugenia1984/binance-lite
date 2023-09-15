import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material'
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const WalletsIcons: React.FC = () => {
    const navigate = useNavigate();
    const handleClickDeposit = () => {
        navigate('/deposit');
    };
    const handleClickCash = () => {
        navigate('/cash');
    };
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', my: '2rem' }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    <IconButton aria-label="álito" onClick={handleClickDeposit} >
                        <ArrowUpward />
                        <MailOutlineOutlinedIcon sx={{ width: 30, height: 30, color: "primary" }} />
                    </IconButton>
                    Deposito
                </Typography>


                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                    <IconButton aria-label="álito" onClick={handleClickCash} >
                        <ArrowDownward />
                        <MailOutlineOutlinedIcon sx={{ width: 30, height: 30, color: "primary" }} />
                    </IconButton>
                    Retiro
                </Typography>
            </Box>
        </Box>
    )
}

export default WalletsIcons
