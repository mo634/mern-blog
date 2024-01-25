import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashbaoard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Header from "./components/Header"
const App = () => {
  return (
    // config routes with react router
    <BrowserRouter>

    {/* add header component for all pages */}
    <Header/>
    
    <Routes>

    <Route path="/" element = {<Home/>}/>

    <Route path="/dashboard" element = {<Dashboard/>}/>
    <Route path="/sign-in" element = {<SignIn/>}/>
    <Route path="/sign-up" element = {<SignUp/>}/>
    <Route path="/about" element = {<About/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App