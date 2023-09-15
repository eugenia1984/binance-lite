import { useState, useEffect } from 'react'

export default (): [boolean, Function, Function] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [loaders, setLoaders] = useState<number>(0)

  const addLoading = () => setLoaders(prevState => prevState + 1)

  const removeLoading = () => setTimeout(() => setLoaders(prevState => prevState - 1), 2000)

  useEffect(() => {
    setLoading(loaders > 0)
  }, [loaders])

  return [loading, addLoading, removeLoading]
}