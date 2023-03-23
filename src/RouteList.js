import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'
import Chat from './components/Main/Chat/Chat'
import PageNotFound from './components/PageNotFound/PageNotFound';
const Header = React.lazy(() => import("./components/Main/Header/Header"))

const RouteList = () => {
    
  return ( 
      <Routes>
        <Route exact path="/" element={<Dashboard />}  />
        <Route exact path="/dashboard" element={<Dashboard />} /> 
        
        <Route path='' element={<Header />} >
          <Route path='chat' element={<Chat />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
  )
}

export default RouteList