import { PropsWithChildren } from 'react'
import { Header } from './Header'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      <Header />
      <div className="mt-4">{children}</div>
    </div>
  )
}
