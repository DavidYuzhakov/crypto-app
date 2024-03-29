import { useState } from "react"
import { Sort, SortPropertyEnum } from "../types/types"
import { Tag } from "antd"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { updateLabel, updateProperty } from "../store/slices/sortSlice"

export default function Sorting () {
  const dispatch = useAppDispatch()
  const label = useAppSelector(state => state.sort.label)
  const [isOpen, setIsOpen] = useState(false)

  const list: Sort[] = [
    {name: 'popular', property: SortPropertyEnum.POPULAR },
    {name: 'price (ask)', property: SortPropertyEnum.PRICE_ASK },
    {name: 'price (desk)', property: SortPropertyEnum.PRICE_DESC }
  ] 

  function clickLabelHandler (item: Sort) {
    setIsOpen(false)
    dispatch(updateLabel(item.name))
    dispatch(updateProperty(item.property))
  }

  return (
    <>
      <div onClick={() => setIsOpen(prev => !prev)} className='absolute top-3 right-3 cursor-pointer'>
        The sort by: <Tag color='gold'>{ label }</Tag>
      </div>
      {isOpen && 
      <ul className='absolute right-3 top-10 w-[150px] bg-white text-black text-center p-1 rounded z-10 shadow-lg border-2 border-gray-400'>
        {list.map(item => (
          <li key={item.name} className='mb-1 cursor-pointer hover:bg-slate-300 transition-colors rounded' onClick={() => clickLabelHandler(item)}>{ item.name }</li>
        ))}
      </ul>}
    </>
  )
}