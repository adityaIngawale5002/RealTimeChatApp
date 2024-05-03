import React, { Suspense, lazy, useEffect } from 'react'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import LayoutLoader from './components/layout/Loaders'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userNotExists,userExists } from './redux/reducers/auth'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './socket'


//lazy loading
const Home=lazy(()=>import('./pages/Home'))
const Login=lazy(()=>import('./pages/Login'))
const Groups=lazy(()=>import('./pages/Groups'))
const Chat=lazy(()=>import('./pages/Chat'))
const AdminLogin=lazy(()=>import('./pages/Admin/AdminLogin'))
const Dashboad=lazy(()=>import('./pages/Admin/Dashboard'))





const App = () => {
  const dispatch=useDispatch();
  const { user , loader }=useSelector(state=>state.auth);

  useEffect(()=>{

    axios.get("http://localhost:3000/user/getProfile",{withCredentials:true})
    .then((res)=>{
      dispatch(userExists(res.data.user))
    })
    .catch((res)=>{
      dispatch(userNotExists())
    })

  },[])

  return loader? (<LayoutLoader/> ) : (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
        <Routes>
         
              <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider> }>
                  <Route path="/" element={<Home/>} />
                  <Route path="/groups" element={<Groups/>} />
                  <Route path="/chat/:chatId" element={<Chat/>} />
              </Route>


              <Route path="/login" element={<ProtectRoute user={!user} redirect={"/"}><Login/></ProtectRoute>} />

              {/* <Route path='/admin' element={<AdminLogin/>} />
              <Route path='/admin/dashboard' element={<Dashboad/>} /> */}
            

              <Route path="*" element={<Home/>}/>
        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />
    </BrowserRouter>     
  )
}

export default App