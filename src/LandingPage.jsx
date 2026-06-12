import React, { useState } from 'react';

const LandingPage = ({ onEnterDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', active: true, href: '#' },
    { name: 'Challenge', active: false, href: '#' },
    { name: 'Matching Talent', active: false, href: '#' },
    { name: 'Naulive', active: false, href: '#' },
  ];

  const featureCards = [
    {
      title: 'On-site events',
      desc: 'Experience the energy of live interactions and real-world networking.',
      icon: '🌐',
      color: 'brandBlue'
    },
    {
      title: 'Challenge',
      desc: 'Push your limits with competitive tasks and innovative solutions.',
      icon: '🚀',
      color: 'brandPurple'
    },
    {
      title: 'Matching Talent',
      desc: 'Connect with the best professionals and find your perfect match.',
      icon: '🤝',
      color: 'brandCoral'
    },
    {
      title: 'Naulive',
      desc: 'Stream the excitement and stay connected with the event in real-time.',
      icon: '📺',
      color: 'brandBlue'
    },
  ];

  return (
    <div className="min-h-screen bg-brandWhite font-montserrat text-brandText overflow-x-hidden">
      {/* HEADER */}
      <header className="bg-brandTeal sticky top-0 z-50 shadow-sm">
        <div className="max-w-[2000px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              src="https://naufest.com/wp-content/uploads/2026/06/Junior-Achievement-Americas_Comb.png"
              alt="Junior Achievement Americas"
              className="h-12 w-auto max-w-[500px] object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-brandBlue ${item.active ? 'font-black' : 'font-medium'}`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onEnterDashboard}
              className="bg-brandBlue text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-800 transition-all shadow-md"
            >
              Dashboard
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-brandText"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-brandTeal transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-8 py-6 flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`text-lg uppercase tracking-wider ${item.active ? 'font-black text-brandBlue' : 'font-medium text-brandText'}`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={onEnterDashboard}
              className="bg-brandBlue text-white py-3 rounded-xl text-sm font-bold uppercase tracking-widest"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-[2000px] mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 w-1/3 opacity-20 pointer-events-none">
          <img src="https://naufest.com/wp-content/uploads/2026/06/orbitas.png" alt="orbits" className="w-full h-auto" />
        </div>

        <div className="flex-1 text-center lg:text-left z-10">
          <img
            src="https://naufest.com/wp-content/uploads/2026/06/LOGO-NAUFEST.png"
            alt="NAufest 2026 Logo"
            className="h-24 md:h-32 mx-auto lg:mx-0 mb-8"
          />
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 max-w-2xl">
            Unlock your <span className="text-brandBlue">potential</span> and shape the future.
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-xl font-medium">
            Join the most innovative gathering of young entrepreneurs and tech enthusiasts. Discover opportunities, build connections, and accelerate your growth.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="h-[55px] px-8 bg-brandBlue text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              Get Started
            </button>
            <button className="h-[55px] px-8 border-2 border-brandBlue text-brandBlue rounded-full font-bold uppercase tracking-widest hover:bg-brandBlue hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-2xl z-10">
          <div className="relative aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-1"></div>
              </div>
            </div>
            {/* Video Placeholder / Embedded Layout */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1"
              className="w-full h-full"
              title="NAufest Event Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FEATURE GRID (FLIP BOXES) */}
      <section className="max-w-[2000px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((card, idx) => (
            <div key={idx} className="group h-80 [perspective:1000px]">
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT */}
                <div className="absolute inset-0 w-full h-full bg-transparent border-2 border-slate-100 rounded-[30px] flex flex-col items-center justify-center p-8 text-center [backface-visibility:hidden]">
                  <span className="text-5xl mb-4">{card.icon}</span>
                  <h3 className="text-2xl font-bold text-brandText mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">Hover to discover more</p>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 w-full h-full bg-cardBackBlend text-white rounded-[30px] flex flex-col items-center justify-center p-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] border border-white/10 shadow-xl">
                  <span className="text-5xl mb-4">{card.icon}</span>
                  <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                  <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                    {card.desc}
                  </p>
                  <button className="h-[55px] w-full bg-white text-brandBlue rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-50 transition-colors">
                    Explore Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brandDarkBg text-white py-12 border-t border-white/10">
        <div className="max-w-[2000px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <img
            src="https://naufest.com/wp-content/uploads/2026/06/Junior-Achievement-Americas_Comb.png"
            alt="Junior Achievement"
            className="h-10 w-auto invert opacity-80"
          />
          <div className="flex gap-8 text-xs font-medium uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <p className="text-white/30 text-xs font-medium">
            © 2026 NAufest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
