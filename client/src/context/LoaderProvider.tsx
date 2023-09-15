import { createContext, useContext } from 'react'
import { Backdrop, Box } from '@mui/material'
import useLoading from '../hooks/useLoading'
import LoadingBars from '../components/atom/LoadingBars'

const defaultContext = {
  addLoading: () => { },
  removeLoading: () => { }
}

interface AppContextProps {
  addLoading: Function
  removeLoading: Function
}

type LoaderProviderProps = {
  children: JSX.Element
}

export const LoaderContext = createContext<AppContextProps>(defaultContext)

export const useLoader = () => useContext(LoaderContext)

const LoaderProvider: React.FC<LoaderProviderProps> = ({ 
  children 
}) => {
  const [loading, addLoading, removeLoading] = useLoading()

  return (
    <LoaderContext.Provider value={ { addLoading, removeLoading } }>
      <Backdrop
        sx={ {
          color: 'primary',
          zIndex: (theme) => theme.zIndex.modal + 1
        } }
        open={ loading }
      >
        <Box
          style={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem'
          } }
        >
          <LoadingBars />
        </Box>
      </Backdrop>
      { children }
    </LoaderContext.Provider>
  )
}

export default LoaderProvider