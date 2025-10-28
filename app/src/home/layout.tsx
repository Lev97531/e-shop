import { Header } from './header'
import { SideMenu } from './side-menu'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto bg-[#313c4b] h-screen">
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex grow">
          <SideMenu />
          <div className="grow bg-[#545475]">{children}</div>
        </div>
      </div>
    </div>
  )
}
