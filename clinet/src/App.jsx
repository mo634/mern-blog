import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashbaoard"
import UpdatePost from "./pages/UpdatePost"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"
import PrivateRoute from "./components/PrivateRoute"
import PrivateRouteAdmin from "./components/PrivateRouteAdmin"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
const App = () => {
  return (
    // config routes with react router
    <BrowserRouter>

    {/* add header component for all pages */}
    <Header/>
    

    
    <Routes>

    <Route path="/" element = {<Home/>}/>

    {/* make dashboard private */}
    
    <Route element = {<PrivateRoute/>}>
      <Route path="/dashboard" element = {<Dashboard/>}/>
    </Route>

    {/* make create post page only for admin  */}
    <Route element = {<PrivateRouteAdmin/>}>
    <Route path="/create-post" element = {<CreatePost/>}/>
    <Route path="/update-post/:postId" element = {<UpdatePost/>}/>
    </Route>


    <Route path="/post/:slug" element = {<Post/>}/>
    <Route path="/sign-in" element = {<SignIn/>}/>
    <Route path="/sign-up" element = {<SignUp/>}/>
    <Route path="/about" element = {<About/>}/>

    </Routes>

    {/* add footer component */}

      <FooterComp/>
    
    </BrowserRouter>
  )
}

export default App