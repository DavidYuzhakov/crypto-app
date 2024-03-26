import { Flex, Typography } from 'antd'
import CardCrypto from '../components/CardCrypto'
import CardLoading from '../components/CardLoading'
import { useGetCryptoQuery } from '../store/services/crypto.api'
import Error from '../components/Error'
import { useAppSelector } from '../hooks/hooks'
import useDebounce from '../hooks/debounce'

export default function Home() {
  const value = useAppSelector(state => state.app.searchValue)
  const debounce = useDebounce(value)

  const { data: cryptos, isLoading, isError, error } = useGetCryptoQuery(`*${debounce}*`)

  return (
    <>
      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center'}}>Home</Typography.Title>
      <Flex align='center' justify='center' wrap='wrap' gap={20} >
        {cryptos?.map(crypto => <CardCrypto key={crypto.id} {...crypto} />)}
        {cryptos?.length! < 1 && <p>Not found crypto "{debounce}"</p>}
        {isLoading && [...new Array(3)].map((_, i) => <CardLoading key={i} />)}
        {isError && <Error error={error} />}
      </Flex>
    </>
  )
}
