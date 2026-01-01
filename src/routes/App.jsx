import './App.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Sidebar from '../components/sidebar.jsx'
import PostContextContainer from '../store/PostContext.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <PostContextContainer>
      <div className='app-container'>
        <Sidebar />
        <div className="main-content">
          <Header /> 
          <Outlet className="outlet-class" /> 
          <Footer />
        </div>
      </div>
    </PostContextContainer>
  )
}

export default App
