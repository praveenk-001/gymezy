import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeSeoData = {
  '/': {
    title: 'GYMEZY - Unlock Best Gyms in Chennai, Daily Passes & Personal Trainers',
    description:
      'Discover top-rated fitness centers in Chennai with GYMEZY. Book flexible daily gym drop-in passes, multi-gym memberships, and verified personal trainers with zero lock-in contracts.',
    canonical: 'https://gymezy.com/'
  },
  '/about': {
    title: 'About GYMEZY - Empowering Fitness Freedom & Flexible Gym Access in Chennai',
    description:
      'Learn about GYMEZY mission to eliminate fitness barriers by connecting athletes with verified fitness centers, certified trainers, and flexible passes across Chennai.',
    canonical: 'https://gymezy.com/about'
  },
  '/customers': {
    title: 'GYMEZY For Customers - Daily Gym Passes & Personal Trainers in Chennai',
    description:
      'Explore pay-per-session daily gym passes, flexible multi-duration memberships, and 1-on-1 personal coaches in Chennai with instant OTP front desk check-in.',
    canonical: 'https://gymezy.com/customers'
  },
  '/gym-owners': {
    title: 'GYMEZY For Gym Owners - Grow Membership & Monetize Capacity in Chennai',
    description:
      'Partner with GYMEZY to list your Chennai fitness center for free, capture walk-in drop-in revenue, and verify members with automated QR pass scanning.',
    canonical: 'https://gymezy.com/gym-owners'
  },
  '/trainers': {
    title: 'GYMEZY For Trainers - Build Your Coaching Brand in Chennai',
    description:
      'Join GYMEZY as a certified fitness trainer in Chennai. Connect with motivated clients, schedule 1-on-1 sessions, and manage workout nutrition plans effortlessly.',
    canonical: 'https://gymezy.com/trainers'
  }
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const data = routeSeoData[location.pathname] || routeSeoData['/'];

    // Update document title
    document.title = data.title;

    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', data.description);
    }

    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', data.description);
    }

    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', data.title);
    }

    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', data.canonical);
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', data.canonical);
    }
  }, [location.pathname]);

  return null;
}
