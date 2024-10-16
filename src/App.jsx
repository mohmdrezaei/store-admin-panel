import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./Dashboard"
import RegisterPage from "./pages/RegisterPage"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Dashboard /> */}
      <RegisterPage />
    </QueryClientProvider>
  )
}

export default App