import logo from './logo.svg';
import './App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from "./Component/Home/Home"
import Layout from "./Component/Layout/Layout"
import Login from "./Component/Login/Login"
import Register from "./Component/Register/Register"
import NotFound from "./Component/NotFound/NotFound"
import  { Toaster } from 'react-hot-toast';
import  { userContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import CartContextProvider from './Context/CartContext';
import About from './Component/About/About';
import Adopt from './Component/Adopt/Adopt';
import Donate from './Component/Donate/Donate';
import Lost from './Component/Lost/Lost';
import LostDetails from './Component/LostDetails/LostDetails';
import AdoptDetails from './Component/AdoptDetails/AdoptDetails';
import UploadAdopt from './Component/UploadAdopt/UploadAdopt.jsx';
import UploadLost from './Component/UploadLost/UploadLost.jsx';
import AdoptForm from './Component/AdoptForm/AdoptForm.jsx';
import Blog from './Component/Blog/Blog.jsx';
import BlogDetails from './Component/BlogDetails/BlogDetails.jsx';
import Profile from '../src/Component/Profile/Profile.jsx';
import ProfileEdit from '../src/Component/ProfileEdit/ProfileEdit.jsx';
import Shelter from '../src/Component/Shelter/Shelter.jsx';
import ShelterDetails from '../src/Component/ShelterDetails/ShelterDetails.jsx';
import FosterDetails from '../src/Component/FosterDetails/FosterDetails.jsx';
import Foster from '../src/Component/Foster/Foster.jsx';
import FosterUpload from '../src/Component/FosterUpload/FosterUpload.jsx';
import Workshop from '../src/Component/Workshop/Workshop.jsx';
import WorkshopDetails from '../src/Component/WorkshopDetails/WorkshopDetails.jsx';
import VideoPage from '../src/Component/VideoPage/VideoPage.jsx';






let routers = createBrowserRouter([
  {path:"/", element:  <Layout/>  ,children:[
    {index:true , element: <Home/> },
    {path:"login" , element: <Login/>},
    {path:"about" , element: <About/>},
    {path:"Profile" , element: <Profile/>},
    {path:"ProfileEdit" , element: <ProfileEdit/>},
    {path:"adopt" , element: <Adopt/>},
    {path:"animal/:id" , element: <AdoptDetails/>},
    {path:"donate" , element: <Donate/>},
    {path:"lost" , element: <Lost/>},
    {path:"lost/:id" , element: <LostDetails/>},
    {path:"register" , element:<Register/>},
    {path:"UploadAdopt" , element:<UploadAdopt/>},
    {path:"UploadLost" , element:<UploadLost/>},
    {path:"AdoptForm" , element:<AdoptForm/>},
    {path:"Blog" , element:<Blog/>},
    {path:"Blog/:id" , element:<BlogDetails/>},
    {path:"Shelter/:id" , element:<ShelterDetails/>},
    {path:"Shelter" , element:<Shelter/>},
    {path:"Foster" , element:<Foster/>},
    {path:"Foster/:id" , element:<FosterDetails/>},
    {path:"FosterUpload" , element:<FosterUpload/>},
    {path:"Workshop" , element:<Workshop/>},
    {path:"WorkshopDetails" , element:<WorkshopDetails/>},
    {path:"VideoPage" , element:<VideoPage/>},

    {path:"*" , element:<NotFound/>},
  ]},
])


function App() {

  let {setUserToken} = useContext(userContext)


  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      setUserToken(localStorage.getItem("userToken"))
    }
  } , []);

  

  

  return <CartContextProvider>
<RouterProvider router={routers}></RouterProvider>
<Toaster />
</CartContextProvider>

}

export default App;
