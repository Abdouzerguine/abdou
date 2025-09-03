import React from 'react';
import { Users, Target, Heart, Award, MapPin, Mail, Phone } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-700 dark:to-teal-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/1751431085937.png" 
              alt="Tiny Treasure Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Tiny Treasure</h1>
          <p className="text-xl md:text-2xl text-teal-100 dark:text-teal-200 max-w-3xl mx-auto">
            Your trusted online store providing quality products with exceptional service since May 2025
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Founded in May 2025, Tiny Treasure started with a simple yet powerful vision: to provide Algerian customers 
                  with access to quality products through a reliable and user-friendly online shopping experience. We recognized 
                  the need for a trustworthy e-commerce platform that understands local preferences and delivery challenges.
                </p>
                <p>
                  Starting as a dedicated team focused on customer satisfaction, we've built a comprehensive online store 
                  that serves customers across all 58 wilayas in Algeria. Our platform combines the convenience of online 
                  shopping with the reliability of traditional customer service.
                </p>
                <p>
                  Today, we're proud to offer a carefully curated selection of products across multiple categories, 
                  ensuring quality, competitive pricing, and reliable delivery to every corner of Algeria.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">{products.filter(p => p.isActive).length}+</div>
                  <div className="text-gray-600 dark:text-gray-400">Products Available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">{categories.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Product Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">58</div>
                  <div className="text-gray-600 dark:text-gray-400">Wilayas Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">May 2025</div>
                  <div className="text-gray-600 dark:text-gray-400">Since Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're driven by core values that shape everything we do, from product development to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To provide Algerian customers with access to quality products through reliable online shopping and exceptional customer service
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Community First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We prioritize our customers' satisfaction, providing quality products and reliable service for a great shopping experience
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authenticity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer authentic, quality products that meet the needs and preferences of Algerian customers
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We strive for excellence in every aspect of our service, from product quality to customer support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We'd love to hear from you. Reach out to us anytime!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Location</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Algiers, Algeria<br />
                Delivering to all 58 wilayas
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="mailto:tiny05treasure@gmail.com" className="hover:text-teal-600 dark:hover:text-teal-400">
                  tiny05treasure@gmail.com
                </a>
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="tel:0781604556" className="hover:text-teal-600 dark:hover:text-teal-400">
                  0781604556
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;