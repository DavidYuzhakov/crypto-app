import { Link, useParams } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'
import { Flex, Typography } from 'antd'
import { Line } from 'react-chartjs-2'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { addFavorites, removeFavoirtes } from '../../store/slices/appSlice'
import { useGetCoinQuery } from '../../store/services/crypto.api'
import Error from '../../components/Error'
import styles from "./CryptoInfo.module.css"

import Like from "../../assets/like.svg?react"
import Liked from "../../assets/liked.svg?react"
import Buy from "../../assets/buy.svg?react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

export default function CryptoInfo() {
  const { id } = useParams()
  const favorites = useAppSelector(state => state.app.favorites)
  const dispatch = useAppDispatch()
  const { data: coins, isLoading, isError, error } = useGetCoinQuery(id || '')
  const isFavorite = favorites.some(f => f.id === id)
  

  if (coins && coins.length > 0) {
    const labels = ['change 1h', 'change 1w', 'change 1d']

    const coin = coins[0]
    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: '%',
          data: [coin.priceChange1h, coin.priceChange1w, coin.priceChange1d],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }

    function clickHandler () {
      if (isFavorite) {
        dispatch(removeFavoirtes(id!))
      } else {
        dispatch(addFavorites(coin))
      }
    }

    return (
      <>
        <Flex align='center' justify='center' style={{ marginBottom: 20}}>
          <img className="mr-2" width={40} src={coin.icon} alt="coin" />
          <Typography.Title
            style={{ color: '#fff', margin: 0 }}
            className="text-center"
          >
            {coin.name} ({coin.symbol})
          </Typography.Title>
        </Flex>
        <Flex className='mb-5' justify='center' gap={50}>
          <div>
            <Typography.Paragraph style={{ color: '#fff' }}>
              <Typography.Text style={{ color: '#fff' }} strong>Price: </Typography.Text>
              {coin.price}$
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: '#fff' }} >
              <Typography.Text style={{ color: '#fff' }}  strong>Price BTC: </Typography.Text>
              {coin.priceBtc}$
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: '#fff' }} >
              <Typography.Text style={{ color: '#fff' }}  strong>Market Cap: </Typography.Text>
              {coin.marketCap}$
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: '#fff' }} >
              <Typography.Text style={{ color: '#fff' }}  strong>Available Supply: </Typography.Text>
              {coin.availableSupply}
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: '#fff' }} >
              <Typography.Text style={{ color: '#fff' }}  strong>Total Supply: </Typography.Text>
              {coin.totalSupply}
            </Typography.Paragraph>
            <Typography.Paragraph style={{ color: '#fff' }} >
              <Typography.Text style={{ color: '#fff' }}  strong>Website URL: </Typography.Text>
              {coin.websiteUrl}
            </Typography.Paragraph>
          </div>
          <div className='min-w-[500px]'>
            <Line data={data} />
          </div>
        </Flex>
        <Flex justify='center' gap={42}>
          {isFavorite ? <Liked className={styles.liked} onClick={clickHandler} /> 
          : <Like className={styles.like} onClick={clickHandler}  />}
          <Link to={''}>
            <Buy className={styles.buy} />
          </Link>
        </Flex>
      </>
    )
  } else {
    return (
      <>
        {isLoading && <p>Loading...</p>}
        {isError && <Error error={error} />}
      </>
    )
  }
}
