import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderProvider'
import { CoinData } from '../models/CoinDataResponse'
import { URL_ALL_CRYPTOCURRENCIES } from '../utils/url'
interface ApiContextType {
    coinsData: CoinData[]
    fetchData: () => void
}

interface ChildrenApiProps {
    children: React.ReactNode
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const ApiProvider: React.FC<ChildrenApiProps> = ({ 
    children
}) => {
    const [coinsData, setCoinsData] = useState<CoinData[]>([])
    const { addLoading, removeLoading } = useLoader()

    const fetchData = async () => {
        try {
            addLoading()
            const response = await fetch(URL_ALL_CRYPTOCURRENCIES)
            if (response.ok) {
                const dataReponse = await response.json()

                const { status, data } = dataReponse
                if (status === 'true') {
                    setCoinsData(data)
                }
            } else {
                throw new Error('La respuesta de la red no fue exitosa.')
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error)
        } finally {
            removeLoading()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <ApiContext.Provider value={ { coinsData, fetchData } }>
            { children }
        </ApiContext.Provider>
    )
}

export const useApiContext = (): ApiContextType => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("useApiContext must be used within an ApiProvider")
    }
    return context
}