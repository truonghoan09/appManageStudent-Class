import AppProvider from "./provider/AppProvider"
import AppRouters from "./route/AppRouters"

const App = () => {
  return(
    <>
      <AppProvider>
        <AppRouters/>    
      </AppProvider>
    </>
  )
}

export default App
