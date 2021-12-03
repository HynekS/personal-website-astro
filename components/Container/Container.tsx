import Header from "@/components/Header"
import Footer from "@/components/Footer"

type ContainerProps = {
  children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <div tw="flex">{children}</div>
      <Footer />
    </>
  )
}

export default Container
