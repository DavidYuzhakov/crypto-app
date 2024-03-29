import { InputNumber, Form, Button, Result } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FieldType, ICrypto, PurchasedCoin } from '../types/types'
import { useRef, useState } from 'react'
import { useAddPurchasedCoinMutation } from '../store/services/crypto.api'
import { useAppDispatch } from '../hooks/hooks'
import { onClose } from '../store/slices/appSlice'

export default function FormCrypto({ name, id, price, symbol, icon }: ICrypto) {
  const [form] = useForm()
  const coinRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const [submited, setSubmited] = useState(false)
  const [createPost] = useAddPurchasedCoinMutation()

  if (submited && coinRef.current) {
    return (
      <Result
        className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
        status={'success'}
        title={'Successfuly has been added!'}
        subTitle={`You bought ${coinRef.current.amount + ' ' + name} for ${coinRef.current.price}$`}
        extra={[
          <Button type='dashed' key={'done'} onClick={() => dispatch(onClose())}>
            Done!
          </Button>
        ]}
      />
    )
  }

  function amountHandler (value: number | null) {
    if (value) {
      const price = Number(form.getFieldValue('price'))
      form.setFieldsValue({
        total: +(value * price).toFixed(2),
      })
    }
  }

  function priceHandler (value: number | null) {
    if (value) {
      const amount = form.getFieldValue('amount')
      form.setFieldsValue({
        total: +(amount * value).toFixed(2)
      })
    }
  }

  async function finishHandler (values: any) {
    if (values) {
      const body: PurchasedCoin = {
        idCrypto: id,
        name,
        symbol,
        icon,
        currentPrice: price,
        amount: values.amount,
        price: values.price,
        date: new Date(),
        grow: values.price < price,
        totalProfit: values.amount * price - values.amount * values.price,
        total: values.amount * values.price,
      }

      coinRef.current = body
      await createPost(body)
    } 
    setSubmited(true)
  }

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      onFinish={finishHandler}
      initialValues={{
        price: price.toFixed(2),
        amount: 0,
      }}
    >
      <Form.Item<FieldType>
        label="Amount (pieces)"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please enter the number of coins!',
            type: 'number',
            min: 1,
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} onChange={amountHandler} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Price ($)"
        name="price"
        rules={[{ required: true, message: 'Please input your price' }]}
      >
        <InputNumber onChange={priceHandler} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item<FieldType> label="Total ($)" name="total">
        <InputNumber style={{ width: '100%' }} disabled />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Buy</Button>
      </Form.Item>
    </Form>
  )
}
