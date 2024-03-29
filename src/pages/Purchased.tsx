import { Spin } from "antd"
import { useGetPurchasedCoinsQuery } from "../store/services/crypto.api"
import PurchasedCard from "../components/PurchasedCard"
import Error from "../components/Error"

export default function Purchased () {
  const {data, isLoading, isError, error} = useGetPurchasedCoinsQuery()

  return (
    <>
      {data?.length! === 0 && <p className="text-center">Buy at least 1 crypt</p>} 
      {data && data.length > 0 && data.map((coin) => <PurchasedCard key={coin.id} {...coin} />)}
      {isLoading && <Spin fullscreen />}
      {isError && <Error error={error} />}
    </>
  )
}