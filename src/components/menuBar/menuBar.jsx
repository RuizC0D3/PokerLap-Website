"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Marcar que el componente está montado
  useEffect(() => {
    setMounted(true);
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    if (mounted) {
      setIsMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  }, [pathname, mounted]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Función para verificar si la ruta es activa
  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Iconos SVG minimalistas
  const icons = {
    inicio: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    clubs: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="3" r="1"></circle>
        <circle cx="20" cy="13" r="1"></circle>
        <circle cx="12" cy="20" r="1"></circle>
        <circle cx="4" cy="12" r="1"></circle>
        <circle cx="12" cy="12" r="8"></circle>
      </svg>
    ),
    tienda: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    ),
    torneos: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
        <polyline points="12 12.5 20 9 20 15 12 18.5 4 15 4 9 12 12.5"></polyline>
      </svg>
    ),
    aprende: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    sobrenosotros: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    descargas: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
    ingresar: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    ),
  };

  const menuItems = [
    { href: '/', label: 'Inicio', icon: icons.inicio },
    { href: '/clubs', label: 'Clubs', icon: icons.clubs },
    { href: '/tienda', label: 'Tienda', icon: icons.tienda },
    { href: '/torneos', label: 'Torneos', icon: icons.torneos },
    { href: '/aprende', label: 'Aprende', icon: icons.aprende },
    { href: '/sobrenosotros', label: 'Sobre Nosotros', icon: icons.sobrenosotros },
    { href: '/descargas', label: 'Descargas', icon: icons.descargas },
  ];

  // No renderizar hasta estar montado
  if (!mounted) return null;

  return (
    <>
      {/* Navbar Container */}
      <nav className="menubar-container">
        <div className="menubar-content">
          {/* Logo */}
          <Link href="/">
            <span className="menubar-logo">
              <Image 
                src="/images/logoblanco.png" 
                alt="PokerLap" 
                width={150} 
                height={40}
                className="logo-image"
                priority
              />
            </span>
          </Link>

          {/* Menú Desktop */}
          <div className="menubar-desktop">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
              >
                <span className={`menubar-link ${isActive(item.href) ? 'active' : ''}`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/ingresar">
              <span className="menubar-btn-ingresar">Ingresar</span>
            </Link>
          </div>

          {/* Botón Hamburguesa */}
          <button
            className={`menubar-hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="menubar-overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menú Móvil Lateral */}
      <div className={`menubar-mobile ${isMenuOpen ? 'mobile-open' : ''}`}>
        {/* Header del menú móvil */}
        <div className="mobile-header">
          <Link href="/">
            <span className="mobile-logo">
              <Image 
                src="/images/logoblanco.png" 
                alt="PokerLap" 
                width={120} 
                height={32}
                className="mobile-logo-image"
              />
            </span>
          </Link>
          <button
            className="mobile-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Lista de items del menú móvil */}
        <ul className="mobile-list">
          {menuItems.map((item, index) => (
            <li 
              key={item.href} 
              className="mobile-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link href={item.href}>
                <span className={`mobile-link ${isActive(item.href) ? 'active' : ''}`}>
                  <span className="mobile-icon">{item.icon}</span>
                  <span className="mobile-label">{item.label}</span>
                  <svg className="mobile-arrow" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer del menú móvil */}
        <div className="mobile-footer">
          <Link href="/ingresar">
            <span className="mobile-btn">
              <span className="mobile-btn-icon">{icons.ingresar}</span>
              Ingresar
            </span>
          </Link>
          <p className="mobile-copyright">© {new Date().getFullYear()} ROCAS</p>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
