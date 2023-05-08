
import { HashRouter, Route, Routes } from 'react-router-dom'
import Spinner from './components/Spinner'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRouter from './utils/ProtectedRouter'
import Home from './pages/Home'

function App() {

  const loading = useSelector(state => state.loading)

  return (
    <>
      <Main>

        <HashRouter>

          {loading && <Spinner />}

          <Routes>
          
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

           <Route element={<ProtectedRouter />}>
              <Route path="/:userName" element={<Home />} />
            </Route>

          </Routes>


        </HashRouter>

      </Main>
    </>
  )
}

export default App

const Main = styled.main`
  width: 100%;
  height: 100vh;
`