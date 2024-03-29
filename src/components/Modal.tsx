import { Drawer } from "antd";
import { useGetCryptoQuery } from '../store/services/crypto.api'
import FormCrypto from './FormCrypto'
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { onClose } from "../store/slices/appSlice";
import { SortPropertyEnum } from "../types/types";

export default function Modal() {
  const { data } = useGetCryptoQuery({ value: '*', property: SortPropertyEnum.POPULAR })
  const {id, drawer} = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const coin = data?.find((c) => c.id === id)

  return (
    <>
      {coin && <Drawer 
        width={600} 
        title={'Add Asset'} 
        onClose={() => dispatch(onClose())} 
        open={drawer}
        destroyOnClose
      >
        <FormCrypto {...coin} />
      </Drawer>}
    </>
  )
}
