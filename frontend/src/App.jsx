import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './index.css'

function ProductGrid({ fetchUrl, title, description, mapData }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProducts(mapData ? mapData(data) : data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [fetchUrl, mapData])

  return (
    <>
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      {loading && <div className="loading">Loading amazing products...</div>}
      
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function LocalBackendProducts() {
  const fetchUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/products';
  return <ProductGrid 
    fetchUrl={fetchUrl} 
    title="Local Node API" 
    description="Premium gear from our custom Node.js backend Docker container." 
  />;
}

function ExternalApiProducts() {
  const fetchUrl = 'https://fakestoreapi.com/products';
  // FakeStore API payload needs mappings to match our renderer
  const mapData = (data) => data.map(item => ({
    id: item.id,
    name: item.title,
    price: item.price,
    image: item.image
  }));
  
  return <ProductGrid 
    fetchUrl={fetchUrl} 
    title="Global Store API" 
    description="Products fetched directly from FakeStoreAPI without touching the local backend."
    mapData={mapData}
  />;
}

function Navigation() {
  const location = useLocation();
  return (
    <nav className="main-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Local API</Link>
      <Link to="/external" className={location.pathname === '/external' ? 'active' : ''}>External API</Link>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<LocalBackendProducts />} />
          <Route path="/external" element={<ExternalApiProducts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
