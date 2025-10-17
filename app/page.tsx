import React from 'react';
import { Heart, ArrowUpRight, Twitter, Instagram, Linkedin, Play } from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';
import Image from 'next/image';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 text-black">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <div className="w-6 h-6 grid grid-cols-2 gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                    </div>
                    <span>Music is Classic</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                    Inspiring Music.
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-8xl font-light text-gray-300">01</span>
                    <div>
                      <p className="text-gray-600 font-medium">Clear Sounds</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Making your dream music come true<br />
                        Stay with AETiC Sounds!
                      </p>
                    </div>
                  </div>
                  
                  <Link href="/products">
                    <button className="inline-flex items-center space-x-3 bg-lime-400 hover:bg-lime-500 px-8 py-4 rounded-full font-semibold text-gray-900 transition-all hover:scale-105 shadow-lg">
                      <span>View All Products</span>
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  </Link>
                  
                  <div className="mt-8 flex items-center space-x-6">
                    <span className="text-sm text-gray-500">Follow us on:</span>
                    <div className="flex space-x-4">
                      <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                      <Play className="w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
                      <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
                      <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative z-10">
                    <Image 
                      src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Blue Headphones" 
                      width={600}
                      height={600}
                      className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500 object-cover rounded-2xl"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 transform -translate-x-4 translate-y-4"></div>
                  <div className="absolute top-10 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 right-0 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">More Products</h3>
                  <p className="text-sm text-gray-500">460 plus items.</p>
                </div>
                <Heart className="w-6 h-6 text-red-500 cursor-pointer" />
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex space-x-4">
                  <Image
                    src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100&h=100"
                    alt="Product 1"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <Image
                    src="https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100"
                    alt="Product 2"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <Image
                    src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=100&h=100"
                    alt="Product 3"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-blue-500 text-white px-8 py-6 rounded-2xl text-center">
                    <div className="text-2xl font-bold">5m+</div>
                    <div className="text-sm opacity-90">Downloads</div>
                    <div className="flex items-center justify-center mt-2 space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        ))}
                      </div>
                      <span className="text-xs">4.8 reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium">Popular</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Listening Has Been Released</p>
                  <Image
                    src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100&h=100"
                    alt="Headphones"
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-xl object-cover mt-2"
                  />
                </div>
                
                <div className="relative">
                  <Image
                    src="https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg?auto=compress&cs=tinysrgb&w=120&h=120"
                    alt="VR Headset"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <ArrowUpRight className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full p-1 shadow-lg cursor-pointer" />
                  <div className="absolute bottom-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">4.7</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Popular Colors</h3>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="w-8 h-8 bg-cyan-500 rounded-full cursor-pointer hover:scale-110 transition-transform"></div>
              </div>
            </div>
            
            {/* New Gen X-Bud */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-semibold">New Gen</h3>
                <p className="text-xl font-bold mb-4">X-Bud</p>
                <ArrowUpRight className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <Image
                src="https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="X-Bud Headphones"
                width={200}
                height={200}
                className="absolute right-0 bottom-0 w-32 h-32 object-cover rounded-2xl transform rotate-12"
              />
            </div>
            
            {/* VR Headset */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <ArrowUpRight className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <Image
                src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200"
                alt="VR Headset"
                width={400}
                height={128}
                className="w-full h-32 object-cover rounded-2xl mb-4"
              />
            </div>
            
            {/* Light Grey Surface Headphone */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold">Light Grey Surface</h3>
              <p className="text-lg font-bold">Headphone</p>
              <p className="text-sm text-gray-500 mb-4">Boosted with bass</p>
              <Image
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt="Light Grey Headphones"
                width={400}
                height={96}
                className="w-full h-24 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;