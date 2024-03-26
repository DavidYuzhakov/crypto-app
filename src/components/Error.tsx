import { Alert } from "antd";

export default function Error (error: any) {
  console.log(error)

  return <Alert message={'Error'} description={'something went wrong... Please try again later'} type='error' />
}