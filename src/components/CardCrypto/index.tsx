import { Card, Tag, Typography } from "antd"
import { Link } from "react-router-dom";

import { ICrypto } from "../../types/types";
import styles from "./CardCrypto.module.css"
import Buy from "../../assets/buy.svg?react"
import Info from "../../assets/info.svg"
import Like from "../../assets/like.svg"
import Liked from "../../assets/liked.svg"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addFavorites, onOpen, removeFavoirtes, updateId } from "../../store/slices/appSlice";

const { Meta } = Card

export default function CardCrypto ({id, name, icon, price, rank, symbol, marketCap, priceChange1h, priceChange1w, priceChange1d, priceBtc, availableSupply, explorers, redditUrl, totalSupply, twitterUrl, volume, websiteUrl}: ICrypto) {
  const favorites = useAppSelector(state => state.app.favorites)
  const dispatch = useAppDispatch()
  const isFavorite = favorites.some(fav => fav.id === id)

  function clickHandler () {
    if (isFavorite) {
      dispatch(removeFavoirtes(id))
    } else {
      const body = {
        id, name, icon, price, symbol, rank, priceBtc, marketCap, priceChange1d, priceChange1h, priceChange1w, availableSupply, explorers, redditUrl, totalSupply, twitterUrl, volume, websiteUrl
      }
  
      dispatch(addFavorites(body))
    }
  }

  function buyHandler() {
    dispatch(updateId(id))
    dispatch(onOpen())
  }

  return (
    <Card 
      className={styles.card} 
      title={
        <div className="flex items-cneter">
          <img className="mr-1" width={32} src={icon} alt="icon" />
          <h4 className="text-2xl">{ name } ({symbol})</h4>
        </div>
      }
      actions={[
        <img
          src={isFavorite ? Liked : Like}
          onClick={clickHandler}
          className={isFavorite ? styles.liked : styles.like} 
          style={{
            stroke: '#333'
          }}
        />,
        <Buy 
          className={styles.buy}
          width={20} 
          onClick={buyHandler}
          stroke={'#000'}
          />,
        <Link to={`../crypto/${id}`} relative="path">
          <img className='mx-auto' width={20} src={Info} />
        </Link>
      ]}
    >
      <Meta 
        title={<Typography.Title level={4} className="text-center">Prices</Typography.Title>}
        description={
          <ul className="text-black flex flex-col gap-2">
            <li>
              <span className="font-medium">Currest Price:</span> { Number(price).toFixed(2) }$</li>
            <li>
              <span className="font-medium">Market Cap:</span> {marketCap}$</li>
            <li>
              <span className="font-medium mr-2">Change in 1h:</span> 
              <Tag color={priceChange1h > 0 ? 'green' : 'red'}>{priceChange1h}%</Tag>
            </li>
            <li>
              <span className="font-medium mr-2">Change in 1w:</span> 
              <Tag color={priceChange1w > 0 ? 'green' : 'red'}>{priceChange1w}%</Tag>
            </li>
            <li>
              <span className="font-medium mr-2">Change in 1d:</span>
              <Tag color={priceChange1d > 0 ? 'green' : 'red'}>{priceChange1d}%</Tag>
            </li>
          </ul>
        }
      />
    </Card>
  )
}