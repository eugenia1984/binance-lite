import { HashRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/molecule/footer/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Market from './pages/Market'
import Wallets from './pages/Wallets'
import NotFound from './pages/NotFound'
import CreatePersonalAccount from './pages/CreatePersonalAccount'
import LoginView from './components/molecule/Login'

import { AuthProvider } from './context/AuthContext'
import { ApiProvider } from './context/FetchContext'
import Sales from './pages/Sell'
import Buy from './pages/Buy'
import { GoogleAuthContextProvider } from './context/googleContext'
import Header from './components/molecule/header/Header'
import Deposit from './pages/Deposit'
import AgregarTarjeta from './components/template/agregar-tarjeta/AgregarTarjeta'
import SalesCard from './components/molecule/salesCard'
import PaymentMethod from './components/molecule/salesCard/PaymentMethod'
import SellCoin from './components/template/sell-coin/SellCoin'
import MontoInput from './components/molecule/BuyCard'
import BuyPaymentMethod from './components/molecule/BuyCard/BuyPaymentMethod'
import BuyCoin from './components/template/buy-coin/BuyCoin'

function App() {
  return (
    <HashRouter>
      <GoogleAuthContextProvider>
        <AuthProvider>
          <ApiProvider>
            <Header />
            <Routes>
              <Route path="/" element={ <Login /> } />
              <Route path="/login" element={ <LoginView /> } />
              <Route path="/sell" element={ <Sales /> } />
              <Route path="/sell/screen" element={ <SalesCard /> } />
              <Route path="/buy" element={ <Buy /> } />
              <Route path="/buy/screen" element={ <MontoInput /> } />
              <Route path="/buypaymentmethod" element={ <BuyPaymentMethod /> } />
              <Route path="paymentmethod" element={ <PaymentMethod /> } />
              <Route path="sell-coin" element={ <SellCoin /> } />
              <Route path="/deposit" element={ <Deposit /> } />
              <Route path="/market" element={ <Market /> } />
              <Route path="/wallets" element={ <Wallets /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/agregar-tarjeta" element={ <AgregarTarjeta /> } />
              <Route path="/buy-coin" element={ <BuyCoin /> } />
              <Route path="/register/continue" element={ <CreatePersonalAccount /> } />
              <Route path="*" element={ <NotFound /> } />
            </Routes>
          </ApiProvider>
          <Footer />
        </AuthProvider>
      </GoogleAuthContextProvider>
    </HashRouter>
  )
}

export default App
