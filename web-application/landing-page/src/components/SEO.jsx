import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeSeoData = {
  '/': {
    title: 'GYMEZY - Best Gyms in Chennai & Personal Trainers',
    description:
      'Find top gyms in Chennai with GYMEZY. Book daily drop-in passes, flexible multi-gym memberships, and personal trainers with zero lock-in contracts.',
    canonical: 'https://gymezy.com/'
  },
  '/about': {
    title: 'About GYMEZY - Best Gym Access & Fitness in Chennai',
    description:
      'Learn how GYMEZY connects athletes with verified fitness centers, certified trainers, and flexible daily passes across Chennai with zero lock-in.',
    canonical: 'https://gymezy.com/about'
  },
  '/customers': {
    title: 'GYMEZY For Customers - Gym Passes & Trainers Chennai',
    description:
      'Explore pay-per-session daily gym passes, flexible memberships, and verified personal coaches in Chennai with instant OTP and QR front desk check-in.',
    canonical: 'https://gymezy.com/customers'
  },
  '/gym-owners': {
    title: 'GYMEZY For Gym Owners - Grow Membership in Chennai',
    description:
      'Partner with GYMEZY to list your Chennai fitness center for free, monetize off-peak floor capacity, and verify members with automated QR pass scanning.',
    canonical: 'https://gymezy.com/gym-owners'
  },
  '/trainers': {
    title: 'GYMEZY For Trainers - Coaching Platform in Chennai',
    description:
      'Join GYMEZY as a certified fitness trainer in Chennai. Connect with motivated clients, schedule 1-on-1 sessions, and manage workout routines effortlessly.',
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
