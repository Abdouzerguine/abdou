import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { CommissionProvider } from './contexts/CommissionContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import PlatformAdmin from './pages/admin/PlatformAdmin';
import ShoppingCart from './components/UI/ShoppingCart';
import AIChatbot from './components/UI/AIChatbot';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <CommissionProvider>
              <CartProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    <Routes>
                      <Route path="/admin" element={<PlatformAdmin />} />
                      <Route path="/*" element={
                        <>
                          <Header />
                          <main>
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/categories" element={<Categories />} />
                              <Route path="/product/:id" element={<ProductPage />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route path="/about" element={<AboutUs />} />
                              <Route path="/help" element={<HelpCenter />} />
                            </Routes>
                          </main>
                          <Footer />
                          <ShoppingCart />
                          <AIChatbot />
                        </>
                      } />
                    </Routes>
                  </div>
                </Router>
              </CartProvider>
            </CommissionProvider>
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;