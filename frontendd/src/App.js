import './App.css';
import Layout from './components/Layout'
import Home from './pages/Home'
import Detail from './pages/Detail';
import Menu from './pages/Menu';
import Checkout from './components/Checkout';
import Success from './components/Success';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/menu/:slug' element={<Detail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<Success />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
