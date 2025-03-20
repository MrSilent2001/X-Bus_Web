import './App.css'
import {BrowserRouter} from "react-router-dom"
import PageRoutes from "@/routes/pageRoutes.tsx";
import {AuthProvider} from "@/context/authContext.tsx";

function App() {

  return (
      <BrowserRouter>
          <AuthProvider>
              <PageRoutes/>
          </AuthProvider>
      </BrowserRouter>
  )
}

export default App
