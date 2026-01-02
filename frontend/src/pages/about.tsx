import React from "react";
import { Star, Sparkles, Shield, Award } from "lucide-react";

export default function AboutPage() {
  const features = [
    { icon: <Sparkles className="w-6 h-6" />, text: "Handcrafted Quality" },
    { icon: <Shield className="w-6 h-6" />, text: "Premium Materials" },
    { icon: <Award className="w-6 h-6" />, text: "Artisan Certified" },
    { icon: <Star className="w-6 h-6" />, text: "Unique Designs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/40 to-transparent pointer-events-none" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm">
            About Us
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Crafting Elegance & Reflection
          </h1>

          <p className="text-white/70 text-lg leading-relaxed">
            At our studio, we create handcrafted mirrors and shell decor
            inspired by nature. Every piece is designed to bring a sense of
            calm, beauty, and uniqueness into your home. Our artisans combine
            premium materials with years of craftsmanship to deliver products
            that are not just decor, but a story.
          </p>
        </div>

        {/* Features / Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-white/90">{feature.icon}</div>
              <span className="text-white/90 font-medium text-center">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Join Our Journey
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Experience handcrafted home decor that tells a story of artistry
            and nature. Discover our collections and bring elegance into your
            space.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}
