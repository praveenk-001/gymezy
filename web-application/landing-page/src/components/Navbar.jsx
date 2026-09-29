import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gymezyLogo from '../assets/logo/gymezy.png';
import './Navbar.css';

export default function Navbar({
  ctaText = 'EXPLORE PASSES',
  ctaLink = '/#pricing',
  onCtaClick
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isDarkHeroPage = true; // All main pages feature the luxury hero aesthetic

  const handleCtaClickInternal = (e) => {
    setMobileMenuOpen(false);
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <>
      <header
        className={`fitnova-navbar ${
          isScrolled || !isDarkHeroPage ? 'fitnova-navbar-scrolled' : ''
        } ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}
      >
        <div className="fitnova-nav-container">
          <div className="fitnova-nav-left">
            <Link
              to="/"
              className="fitnova-logo"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src={gymezyLogo}
                alt="GYMEZY Logo"
                className={`fitnova-logo-img ${
                  isScrolled || !isDarkHeroPage ? '' : 'white-filter'
                }`}
              />
              <span className="fitnova-logo-text">GYMEZY</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="fitnova-nav-links">
            <Link
              to="/"
              className={`fitnova-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`fitnova-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About Us
            </Link>
            <Link
              to="/customers"
              className={`fitnova-nav-link ${location.pathname === '/customers' ? 'active' : ''}`}
            >
              For Customers
            </Link>
            <Link
              to="/gym-owners"
              className={`fitnova-nav-link ${location.pathname === '/gym-owners' ? 'active' : ''}`}
            >
              For Gym Owners
            </Link>
            <Link
              to="/trainers"
              className={`fitnova-nav-link ${location.pathname === '/trainers' ? 'active' : ''}`}
            >
              For Trainers
            </Link>
          </nav>

          {/* Right Action Area (Desktop CTA & Mobile Hamburger) */}
          <div className="fitnova-nav-actions">
            <div className="fitnova-nav-cta">
              {onCtaClick ? (
                <button
                  type="button"
                  className="fitnova-primary-btn"
                  onClick={handleCtaClickInternal}
                >
                  {ctaText}
                </button>
              ) : ctaLink.startsWith('/#') || ctaLink.startsWith('#') ? (
                <a href={ctaLink} className="fitnova-primary-btn">
                  {ctaText}
                </a>
              ) : (
                <Link to={ctaLink} className="fitnova-primary-btn">
                  {ctaText}
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line top-line"></span>
              <span className="hamburger-line middle-line"></span>
              <span className="hamburger-line bottom-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />
      
      <div
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-header">
          <div className="fitnova-logo">
            <img src={gymezyLogo} alt="GYMEZY Logo" className="fitnova-logo-img" />
            <span className="fitnova-logo-text drawer-logo-text">GYMEZY</span>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <Link
            to="/"
            className={`mobile-drawer-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Home</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
          <Link
            to="/about"
            className={`mobile-drawer-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>About Us</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
          <Link
            to="/customers"
            className={`mobile-drawer-link ${location.pathname === '/customers' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>For Customers</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
          <Link
            to="/gym-owners"
            className={`mobile-drawer-link ${location.pathname === '/gym-owners' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>For Gym Owners</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
          <Link
            to="/trainers"
            className={`mobile-drawer-link ${location.pathname === '/trainers' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>For Trainers</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
        </nav>

        <div className="mobile-drawer-footer">
          {onCtaClick ? (
            <button
              type="button"
              className="fitnova-primary-btn drawer-cta-btn"
              onClick={handleCtaClickInternal}
            >
              {ctaText}
            </button>
          ) : ctaLink.startsWith('/#') || ctaLink.startsWith('#') ? (
            <a
              href={ctaLink}
              className="fitnova-primary-btn drawer-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaText}
            </a>
          ) : (
            <Link
              to={ctaLink}
              className="fitnova-primary-btn drawer-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
