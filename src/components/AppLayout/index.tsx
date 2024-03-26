import { useRef } from "react";
import { Link, Route, Routes } from "react-router-dom"
import { Layout } from "antd";

import styles from "./AppLayout.module.css"
import { clearValue, updateValue } from "../../store/appSlice";

import Home from "../../pages/Home"
import CryptoInfo from "../../pages/CryptoInfo";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Favorites from "../../pages/Favorites";
import Drawer from "../Drawer";

export default function AppLayout () {
  const inputRef = useRef<HTMLInputElement>(null)
  const value = useAppSelector(state => state.app.searchValue)
  const dispatch = useAppDispatch()

  function clearSearch () {
    dispatch(clearValue())
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }


  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <div className="relative max-w-[180px] ">
          <input 
            ref={inputRef}
            className={styles.input}
            value={value} 
            onChange={(e) => dispatch(updateValue(e.target.value))}
            placeholder="Enter crypto name..." 
          />
          {value.length > 0  && <button 
            className={styles.button} type="button" 
            onClick={clearSearch}
          >&times;</button>}
        </div>
        <ul className="flex items-center">
          <li className='mr-5'>
            <Link to={'/'}>Home</Link>
          </li>
          <li className='mr-5'>
            <Link to={'/favorites'}>Favorites</Link>
          </li>
          <li>
            <Link to={'/my-crypto'}>My crypto</Link>
          </li>
        </ul>
      </Layout.Header>
      <Layout.Content>
        <div className={styles.content}>
          <Routes>
            <Route 
              element={<Home />}
              path="/"
            />
            <Route 
              element={<CryptoInfo />}
              path="/crypto/:id"
            />
            <Route 
              element={<Favorites />}
              path="/favorites"
            />
          </Routes>
          <Drawer />
        </div> 

      </Layout.Content>
    </Layout>
  )
}