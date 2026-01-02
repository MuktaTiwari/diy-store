import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Star, Award, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Initialize navigation


  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      title: "Artisanal Mirrors & Shell Decor",
      subtitle: "Handcrafted elegance for your home",
      accentColor: "from-amber-500 to-orange-500"
    },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Sparkles className="w-5 h-5" />, text: "Handcrafted Quality" },
    { icon: <Shield className="w-5 h-5" />, text: "Premium Materials" },
    { icon: <Award className="w-5 h-5" />, text: "Artisan Certified" },
    { icon: <Star className="w-5 h-5" />, text: "Unique Designs" }
  ];

  return (
    <div className=" overflow-hidden ">
      {/* Hero Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 lg:pt-32">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white/90 text-sm font-medium">Premium Home Decor</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span className="text-white/70 text-sm">Since 2015</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Transform Your Space</span>
            <span className="block">With Nature's</span>
            <span className={`bg-gradient-to-r ${heroSlides[currentSlide].accentColor} bg-clip-text text-transparent`}>
              Elegance & Reflection
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            Discover our exclusive collection of handcrafted mirrors and natural shell decor.
            Each piece tells a story of craftsmanship and natural beauty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {/* Enhanced Explore Collection Button */}
            <Button
              onClick={() => navigate("/products")}
              className="group relative px-10 py-6 font-semibold rounded-full overflow-hidden text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Animated gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full animate-pulse-slow"></span>

              {/* Button text and arrow */}
              <span className="relative flex items-center gap-3">
                Explore Collection
                <ChevronRight className="w-5 h-5 animate-bounce-slow group-hover:translate-x-3 transition-transform duration-500" />
              </span>
            </Button>
           
          </div>


          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-white/90 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
              ? 'w-8 bg-white'
              : 'bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 right-6 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;