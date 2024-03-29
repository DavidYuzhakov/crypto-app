import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearValue, updateValue } from "../store/slices/appSlice";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "antd";

export default function Navigation() {
  const inputRef = useRef<HTMLInputElement>(null)
  const value = useAppSelector(state => state.app.searchValue)
  const location = useLocation()
  const dispatch = useAppDispatch()

  function clearSearch () {
    dispatch(clearValue())
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }


  return (
    <>
      {location.pathname === '/' && <div className="relative max-w-[180px] ">
        <input
          ref={inputRef}
          className='h-[32px] p-2 w-full text-white bg-[#002c56] rounded outline-none'
          value={value}
          onChange={(e) => dispatch(updateValue(e.target.value))}
          placeholder="Enter crypto name..."
        />
        {value.length > 0 && (
          <button className='absolute top-1/2 right-1 -translate-y-1/2 leading-none' type="button" onClick={clearSearch}>
            &times;
          </button>
        )}
      </div>
      }
      {location.pathname === '/favorites' && <Typography.Title style={{ color: '#fff' }} level={3}>The best crypto</Typography.Title>}
      {location.pathname === '/purchased' && <Typography.Title style={{ color: '#fff' }} level={3}>My crypto</Typography.Title>}
      <ul className="flex items-center">
        <li className="mr-5">
          <Link to={'/'}>Home</Link>
        </li>
        <li className="mr-5">
          <Link to={'/favorites'}>Favorites</Link>
        </li>
        <li>
          <Link to={'/purchased'}>Purchased</Link>
        </li>
      </ul>
    </>
  )
}
