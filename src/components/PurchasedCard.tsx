import { Card, Tag, Typography } from 'antd'
import { PurchasedCoin } from '../types/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PurchasedCard({ 
  idCrypto,
  name, 
  symbol, 
  icon, 
  price, 
  amount, 
  total,
  date, 
  currentPrice,
  grow, 
  totalProfit }: PurchasedCoin) {
  const [color, setColor] = useState('#000')

  return (
    <>
      <Card
        className={`max-w-[300px]`}
        type="inner"
        style={{
          boxShadow: `0 0 10px ${color}`
        }}
        title={
          <div className='flex items-center'>
            <img className='mr-1' width={28} src={icon} alt='icon' />
            {name} ({symbol})
          </div>
        }
        extra={
          <Link to={`../crypto/${idCrypto}`}>More...</Link>
        }
      >
        <ul className='flex flex-col gap-2'>
          <li>
            <Typography.Text strong>Amount: </Typography.Text>
            { amount }
          </li>
          <li>
            <Typography.Text strong>Date: </Typography.Text>
            { new Date(date).toLocaleDateString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }) }
          </li>
          <li>
            <Typography.Text strong>Price: </Typography.Text>
            { price.toFixed(2) }$
          </li>
          <li>
            <Typography.Text strong>Current Price: </Typography.Text>
            { currentPrice.toFixed(2) }$
          </li>
          <li>
            <Typography.Text strong>Total: </Typography.Text>
            <Tag color='gold'>{ total.toFixed(2) }$</Tag>
          </li>
          <li>
            <Typography.Text strong>Total Profit: </Typography.Text>
            <Tag color={grow ? 'green' : 'red'}>{ totalProfit.toFixed(2) }$</Tag>
          </li>
          <li>
            <Typography.Text strong>Total Percentage: </Typography.Text>
            <Tag color={grow ? 'green' : 'red'}>{ Math.round((total / totalProfit) * 100) }%</Tag>
          </li>
        </ul>  

        <div className='flex items-center mt-4'>
          <p className='italic mr-2'>Change shadow color pls :)</p>
          <input type='color' value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </Card>
    </>
  )
}
