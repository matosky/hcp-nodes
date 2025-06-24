import { Providers } from "./network/providers"
import { MainRoutes } from "./routes"

function App() {
  return (
    <Providers>
      <MainRoutes />
    </Providers>
  )
}

export default App
