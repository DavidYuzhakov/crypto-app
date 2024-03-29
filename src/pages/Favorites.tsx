import CardCrypto from "../components/CardCrypto";
import { useAppSelector } from "../hooks/hooks";

export default function Favorites () {
  const favoirtes = useAppSelector(state => state.app.favorites)

  return (
    <>
      {favoirtes?.map(crypto => <CardCrypto key={crypto.id} {...crypto} />)}
      {favoirtes?.length! < 1 && <p>Not found favorites crypto</p>}
    </>
  )
}