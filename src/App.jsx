import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import CollectionPage from './pages/CollectionPage'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="collections/woman" element={<CollectionPage audience="Woman" />} />
          <Route path="collections/man" element={<CollectionPage audience="Man" />} />
          <Route path="collections/unisex" element={<CollectionPage audience="Unisex" />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
