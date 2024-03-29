import CardCrypto from '../components/CardCrypto'
import CardLoading from '../components/CardLoading'
import { useGetCryptoQuery } from '../store/services/crypto.api'
import Error from '../components/Error'
import Sorting from '../components/Sorting'
import { useAppSelector } from '../hooks/hooks'
import useDebounce from '../hooks/debounce'

export default function Home() {
   
  
  const value = useAppSelector(state => state.app.searchValue)
  const property = useAppSelector(state => state.sort.property)
  const debounce = useDebounce(value)
  
  const { data: cryptos, isLoading, isError, error } = useGetCryptoQuery({ 
    value: debounce ? `*${debounce}*` : '*', 
    property 
  })

  return (
    <>
      <Sorting />
      {cryptos?.map(crypto => <CardCrypto key={crypto.id} {...crypto} />)}
      {cryptos?.length! < 1 && <p>Not found crypto "{debounce}"</p>}
      {isLoading && [...new Array(3)].map((_, i) => <CardLoading key={i} />)}
      {isError && <Error error={error} />}
    </>
  )
}
