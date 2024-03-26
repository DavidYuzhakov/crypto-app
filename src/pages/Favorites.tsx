import { Flex, Typography } from "antd";
import CardCrypto from "../components/CardCrypto";
import { useAppSelector } from "../hooks/hooks";

export default function Favorites () {
  const favoirtes = useAppSelector(state => state.app.favorites)

  return (
    <>
      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center'}}>Favorites</Typography.Title>
      <Flex align='center' justify='center' wrap='wrap' gap={20} >
        {favoirtes?.map(crypto => <CardCrypto key={crypto.id} {...crypto} />)}
        {favoirtes?.length! < 1 && <p>Not found favorites crypto</p>}
      </Flex>
    </>
  )
}