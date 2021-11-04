import Header from "../Header"

const Container = props => {
  const { children } = props

  return (
    <>
      <Header />
      <div>{children}</div>
      <div tw="flex justify-center">
        <footer tw="max-w-prose p-4">© 2019–{new Date().getFullYear()} Hynek Svacha</footer>
      </div>
    </>
  )
}

export default Container
