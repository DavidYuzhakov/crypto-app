import {
  Form,
  Typography,
  Button,
  InputNumber,
  Result,
} from 'antd'
import styles from './Drawer.module.css'
import { useGetCryptoQuery } from '../../store/services/crypto.api'
import { FieldType } from '../../store/types'
import { useForm } from 'antd/es/form/Form'
import { useRef, useState } from 'react'

export default function Drawer() {
  const [form] = useForm()
  const { data } = useGetCryptoQuery(`**`)
  const [submited, setSubmited] = useState(false)
  const coinRef = useRef<any>(null)
  // const id = useAppSelector(state => state.app.id)
  const id = 'bitcoin'
  const coin = data?.find((c) => c.id === id)

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

  function finishHandler (values: any) {
    if (coin && values) {
      const body = {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        name: coin.name,
        symbol: coin.symbol,
        grow: values.price < coin.price,
        totalProfit: values.amount * coin.price - values.amount * values.price
      }

      coinRef.current = body
    } 
    setSubmited(true)
  }

  if (submited && coinRef.current && coin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center'}} className={styles.drawer}>
        <Result
          status={'success'}
          title={'Successfuly has been added!'}
          subTitle={`You bought ${coinRef.current.amount + ' ' + coin.name} for ${coinRef.current.price}$`}
          extra={[
            <Button type='dashed' key={'done'}>
              Done!
            </Button>
          ]}
        />
      </div>
    )
  }

  return (
    <>
      <div className={styles.drawer}>
        <Typography.Title level={3} className="text-center">
          {!coin && 'Loading...'}
          {coin && `Buy crypto "${coin.symbol}"`}
        </Typography.Title>
        {coin && (
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={finishHandler}
            initialValues={{
              price: coin.price.toFixed(2),
              amount: 0
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
                  min: 1
                },
              ]}
            >
              <InputNumber style={{ width: '100%'}} onChange={amountHandler} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Price ($)"
              name="price"
              rules={[
                { required: true, message: 'Please input your price' },
              ]}
            >
              <InputNumber onChange={priceHandler} style={{ width: '100%'}} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Total ($)"
              name="total"
            >
              <InputNumber style={{ width: '100%'}} disabled />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <div className={styles.dropdown}></div>
    </>
  )
}
