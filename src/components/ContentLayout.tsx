import { Flex, Typography } from "antd";

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export default function ContentLayout ({ title, children }: ContentLayoutProps) {
 return (
  <>
    <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center'}}>{ title }</Typography.Title>
    <Flex align='center' justify='center' wrap='wrap' gap={20} >
      { children }
    </Flex>    
  </>
 )
}