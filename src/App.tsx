import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { CommissionProvider } from './contexts/CommissionContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ShoppingCart from './components/UI/ShoppingCart';
import AIChatbot from './components/UI/AIChatbot';
import Home from './pages/Home';
import Categories from './pages/Categories';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import Checkout from './pages/Checkout';
import PlatformAdmin from './pages/admin/PlatformAdmin';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <CommissionProvider>
            <CartProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-all duration-500">
                  <Header />
                  <main className="flex-1 relative overflow-hidden">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/help" element={<HelpCenter />} />
                      <Route path="/checkout" element={<Checkout />} />
                      {/* Admin Access */}
                      <Route path="/admin" element={<PlatformAdmin />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ShoppingCart />
                  <AIChatbot />
                </div>
              </Router>
            </CartProvider>
          </CommissionProvider>
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;