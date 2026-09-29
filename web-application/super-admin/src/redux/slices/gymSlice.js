import { createSlice } from '@reduxjs/toolkit';

// Initial Gyms fleet with full operational and profile data
const INITIAL_GYMS = [
  {
    id: 'GYM-1001',
    name: 'FitZone Gym',
    phone: '+91 98765 43210',
    email: 'contact@fitzone.com',
    ownerName: 'Ramesh Kumar',
    businessType: 'Private Limited',
    location: 'Anna Nagar, Chennai',
    fullAddress: 'Plot 42, 2nd Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    geoCoordinates: { lat: 13.0850, lng: 80.2101 },
    openingHours: '05:30 AM - 10:30 PM',
    singleSessionPrice: 199,
    rating: 4.8,
    reviewsCount: 256,
    membersCount: 420,
    monthlyRevenue: '₹ 1,85,000',
    status: 'Active',
    approvalStatus: 'Approved',
    subscriptionType: 'Hybrid',
    subscriptionStatus: 'Active',
    changesCount: 0,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    tags: ['Top Rated', 'Unisex', 'AC Gym', '24/7 Access'],
    badgeText: 'Trending',
    aboutText: 'FitZone is a high-performance fitness center with Olympic free weights, dedicated cardio theater, functional CrossFit turf, and certified elite trainers.',
    facilities: ['AC Gym', 'Locker Facility', 'Shower Available', 'Changing Room', 'Free Wi-Fi', 'Music System', 'Steam & Sauna', 'Dedicated Parking'],
    amenities: ['Drinking Water', 'Towel Service', 'Protein Bar', 'Juice Bar', 'First Aid Kit', 'CCTV 24/7'],
    workouts: ['GYM', 'Cardio', 'HIIT', 'CrossFit', 'Yoga', 'Zumba', 'Boxing'],
    trainers: [
      { id: 't1', name: 'Rohit Sharma', specialty: 'Hypertrophy & Strength', experienceYears: 7, rating: 4.9, monthlyFee: 2500, image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop' },
      { id: 't2', name: 'Sneha Iyer', specialty: 'Yoga & Mobility', experienceYears: 5, rating: 4.8, monthlyFee: 2000, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' },
    ],
    pricingPlans: {
      singleSession: 199,
      weeklyPass: 799,
      fiveSessions: 899,
      monthly: 1999,
      quarterly: 4999,
      halfYearly: 8999,
      annual: 14999,
    },
    rules: ['Mandatory clean shoes', 'Carry personal gym towel', 'Re-rack weights after use', 'Valid ID required at entry'],
    safety: ['Daily sanitization', 'CPR certified staff on duty', 'CCTV 24/7', 'Emergency first aid'],
    bankDetails: {
      accountHolder: 'FitZone Fitness Pvt Ltd',
      bankName: 'HDFC Bank',
      accountNumber: '50200012345678',
      ifsc: 'HDFC0001234',
      upiId: 'fitzone@okhdfcbank',
    },
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'GYM-1002',
    name: 'StrongFit Fitness',
    phone: '+91 91234 56789',
    email: 'support@strongfit.in',
    ownerName: 'Prakash Shetty',
    businessType: 'Partnership',
    location: 'Koramangala, Bengaluru',
    fullAddress: '80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka - 560034',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    geoCoordinates: { lat: 12.9352, lng: 77.6245 },
    openingHours: '06:00 AM - 10:00 PM',
    singleSessionPrice: 249,
    rating: 4.6,
    reviewsCount: 180,
    membersCount: 310,
    monthlyRevenue: '₹ 1,20,000',
    status: 'Pending',
    approvalStatus: 'Pending Approval',
    subscriptionType: 'App Only',
    subscriptionStatus: 'Active',
    changesCount: 5,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
    tags: ['CrossFit Hub', 'Strength Training', 'High Energy'],
    badgeText: 'Popular',
    aboutText: 'Premier strength training and CrossFit training hub in Koramangala with state-of-the-art conditioning rigs and certified powerlifting coaches.',
    facilities: ['AC Gym', 'Locker Facility', 'Shower Available', 'Free Wi-Fi', 'Dedicated Parking'],
    amenities: ['Drinking Water', 'Towel Service', 'First Aid Kit', 'CCTV 24/7'],
    workouts: ['GYM', 'CrossFit', 'HIIT', 'Powerlifting', 'Calisthenics'],
    trainers: [
      { id: 't3', name: 'Arun Mehta', specialty: 'Powerlifting & CrossFit', experienceYears: 6, rating: 4.7, monthlyFee: 2200, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
    ],
    pricingPlans: {
      singleSession: 249,
      weeklyPass: 899,
      fiveSessions: 999,
      monthly: 2299,
      quarterly: 5999,
      halfYearly: 10499,
      annual: 17999,
    },
    rules: ['Carry clean training shoes', 'Wipe down benches after workout', 'Respect gym equipment'],
    safety: ['First aid kit available', 'CCTV surveillance', 'Emergency contact desk'],
    bankDetails: {
      accountHolder: 'StrongFit Enterprises',
      bankName: 'ICICI Bank',
      accountNumber: '000205012345',
      ifsc: 'ICIC0000002',
      upiId: 'strongfit@okicici',
    },
    createdAt: '2026-02-10T12:30:00Z',
  },
  {
    id: 'GYM-1003',
    name: 'PowerHouse Gym',
    phone: '+91 99876 54321',
    email: 'info@powerhousemumbai.com',
    ownerName: 'Sandeep More',
    businessType: 'Sole Proprietorship',
    location: 'Thane West, Mumbai',
    fullAddress: 'Ghodbunder Road, Thane West, Mumbai, Maharashtra - 400607',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400607',
    geoCoordinates: { lat: 19.2183, lng: 72.9781 },
    openingHours: '05:00 AM - 11:00 PM',
    singleSessionPrice: 299,
    rating: 4.9,
    reviewsCount: 340,
    membersCount: 580,
    monthlyRevenue: '₹ 2,40,000',
    status: 'Active',
    approvalStatus: 'Approved',
    subscriptionType: 'Hybrid',
    subscriptionStatus: 'Active',
    changesCount: 0,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
    tags: ['Heavy Lifting', '24/7 Access', 'Steam Bath'],
    badgeText: 'SuperGym',
    aboutText: 'Mumbai’s premier body transformation sanctuary equipped with Hammer Strength machinery, infrared sauna, and personal training experts.',
    facilities: ['AC Gym', 'Locker Facility', 'Shower Available', 'Steam & Sauna', 'Changing Room', 'Free Wi-Fi', 'Parking (4W/2W)'],
    amenities: ['Drinking Water', 'Towel Service', 'Juice Bar', 'Protein Station', 'CCTV 24/7', 'BMI Station'],
    workouts: ['GYM', 'Strength', 'HIIT', 'Zumba', 'Boxing', 'MMA'],
    trainers: [
      { id: 't4', name: 'Vikram Sethi', specialty: 'Bodybuilding & Nutrition', experienceYears: 9, rating: 4.9, monthlyFee: 3000, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
    ],
    pricingPlans: {
      singleSession: 299,
      weeklyPass: 999,
      fiveSessions: 1199,
      monthly: 2499,
      quarterly: 6499,
      halfYearly: 11499,
      annual: 19999,
    },
    rules: ['Valid ID proof mandatory', 'Wipe sweat with towel', 'No dropping dumbells without pads'],
    safety: ['Certified trainers on floor', 'First aid & AED', 'Fire safety compliant'],
    bankDetails: {
      accountHolder: 'Powerhouse Fitness Club',
      bankName: 'State Bank of India',
      accountNumber: '30291827364',
      ifsc: 'SBIN0001827',
      upiId: 'powerhouse@oksbi',
    },
    createdAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'GYM-1004',
    name: 'Muscle Factory',
    phone: '+91 90012 34567',
    email: 'contact@musclefactory.com',
    ownerName: 'Arindam Ghosh',
    businessType: 'Private Limited',
    location: 'Salt Lake, Kolkata',
    fullAddress: 'Sector V, Salt Lake, Kolkata, West Bengal - 700091',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    geoCoordinates: { lat: 22.5868, lng: 88.4178 },
    openingHours: '06:00 AM - 10:00 PM',
    singleSessionPrice: 179,
    rating: 4.5,
    reviewsCount: 142,
    membersCount: 260,
    monthlyRevenue: '₹ 95,000',
    status: 'Active',
    approvalStatus: 'Approved',
    subscriptionType: 'App Only',
    subscriptionStatus: 'Active',
    changesCount: 0,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop',
    tags: ['Budget Friendly', 'Student Discounts', 'Cardio Floor'],
    badgeText: 'Verified',
    aboutText: 'Comprehensive cardio and resistance training center offering affordable fitness passes for young athletes, college students, and professionals.',
    facilities: ['AC Gym', 'Locker Facility', 'Shower Available', 'Free Wi-Fi'],
    amenities: ['Drinking Water', 'First Aid Kit', 'CCTV 24/7'],
    workouts: ['GYM', 'Cardio', 'HIIT', 'Yoga'],
    trainers: [],
    pricingPlans: {
      singleSession: 179,
      weeklyPass: 649,
      fiveSessions: 749,
      monthly: 1699,
      quarterly: 4299,
      halfYearly: 7499,
      annual: 12999,
    },
    rules: ['Carry shoes and gym towel', 'Keep floor clean'],
    safety: ['CCTV surveillance', 'First aid station'],
    bankDetails: {
      accountHolder: 'Muscle Factory Kolkata',
      bankName: 'Axis Bank',
      accountNumber: '91802001928374',
      ifsc: 'UTIB0000918',
      upiId: 'musclefactory@okaxis',
    },
    createdAt: '2026-03-20T14:15:00Z',
  },
  {
    id: 'GYM-1005',
    name: 'BodyCraft Gym',
    phone: '+91 95555 66777',
    email: 'info@bodycraftpune.com',
    ownerName: 'Vikram Patil',
    businessType: 'Partnership',
    location: 'Viman Nagar, Pune',
    fullAddress: 'Phoenix Road, Viman Nagar, Pune, Maharashtra - 411014',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    geoCoordinates: { lat: 18.5679, lng: 73.9143 },
    openingHours: '05:30 AM - 10:30 PM',
    singleSessionPrice: 220,
    rating: 4.7,
    reviewsCount: 215,
    membersCount: 390,
    monthlyRevenue: '₹ 1,50,000',
    status: 'Pending',
    approvalStatus: 'Pending Approval',
    subscriptionType: 'GMS',
    subscriptionStatus: 'Inactive',
    changesCount: 7,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
    tags: ['Premium Interior', 'CrossFit Rigs', 'Certified Coaches'],
    badgeText: 'Trending',
    aboutText: 'Modern fitness studio with high-end conditioning equipment, group class studio, and bespoke coaching programs.',
    facilities: ['AC Gym', 'Locker Facility', 'Shower Available', 'Changing Room', 'Free Wi-Fi', 'Parking'],
    amenities: ['Drinking Water', 'Towel Service', 'Protein Bar', 'First Aid Kit', 'CCTV 24/7'],
    workouts: ['GYM', 'CrossFit', 'Zumba', 'Pilates', 'HIIT'],
    trainers: [],
    pricingPlans: {
      singleSession: 220,
      weeklyPass: 799,
      fiveSessions: 949,
      monthly: 2099,
      quarterly: 5499,
      halfYearly: 9499,
      annual: 15999,
    },
    rules: ['Carry indoor footwear', 'Maintain hygiene'],
    safety: ['Trained emergency staff', '24/7 CCTV'],
    bankDetails: {
      accountHolder: 'Bodycraft Gym Pune',
      bankName: 'Kotak Mahindra Bank',
      accountNumber: '612345678901',
      ifsc: 'KKBK0000612',
      upiId: 'bodycraft@kotak',
    },
    createdAt: '2026-04-05T11:00:00Z',
  },
];

const loadInitialGyms = () => {
  try {
    const saved = localStorage.getItem('gymezy_gyms_fleet');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Fallback to default
  }
  return INITIAL_GYMS;
};

const initialState = {
  gyms: loadInitialGyms(),
  selectedGym: null,
  filterStatus: 'All',
  filterSubscription: 'All',
  searchQuery: '',
  loading: false,
  error: null,
};

const saveToLocalStorage = (gyms) => {
  try {
    localStorage.setItem('gymezy_gyms_fleet', JSON.stringify(gyms));
  } catch {
    // Ignore storage quota errors
  }
};

export const gymSlice = createSlice({
  name: 'gyms',
  initialState,
  reducers: {
    addGym: (state, action) => {
      const newGym = {
        id: action.payload.id || `GYM-${Math.floor(1000 + Math.random() * 9000)}`,
        rating: 4.9,
        reviewsCount: 0,
        membersCount: 0,
        monthlyRevenue: '₹ 0',
        changesCount: 0,
        status: action.payload.status || 'Active',
        approvalStatus: action.payload.approvalStatus || 'Approved',
        subscriptionStatus: 'Active',
        createdAt: new Date().toISOString(),
        ...action.payload,
      };
      state.gyms.unshift(newGym);
      saveToLocalStorage(state.gyms);
    },

    updateGym: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.gyms.findIndex((g) => g.id === id);
      if (index !== -1) {
        state.gyms[index] = {
          ...state.gyms[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        saveToLocalStorage(state.gyms);
      }
    },

    deleteGym: (state, action) => {
      state.gyms = state.gyms.filter((g) => g.id !== action.payload);
      saveToLocalStorage(state.gyms);
    },

    approveGym: (state, action) => {
      const index = state.gyms.findIndex((g) => g.id === action.payload);
      if (index !== -1) {
        state.gyms[index].approvalStatus = 'Approved';
        state.gyms[index].status = 'Active';
        state.gyms[index].changesCount = 0;
        saveToLocalStorage(state.gyms);
      }
    },

    rejectGym: (state, action) => {
      const { id, reason } = action.payload;
      const index = state.gyms.findIndex((g) => g.id === id);
      if (index !== -1) {
        state.gyms[index].approvalStatus = 'Rejected';
        state.gyms[index].rejectionReason = reason;
        saveToLocalStorage(state.gyms);
      }
    },

    setGymStatus: (state, action) => {
      const { id, status, approvalStatus } = action.payload;
      const index = state.gyms.findIndex((g) => g.id === id);
      if (index !== -1) {
        if (status) state.gyms[index].status = status;
        if (approvalStatus) state.gyms[index].approvalStatus = approvalStatus;
        saveToLocalStorage(state.gyms);
      }
    },

    setSelectedGym: (state, action) => {
      state.selectedGym = action.payload;
    },

    resetGymsFleet: (state) => {
      state.gyms = INITIAL_GYMS;
      saveToLocalStorage(INITIAL_GYMS);
    },
  },
});

export const {
  addGym,
  updateGym,
  deleteGym,
  approveGym,
  rejectGym,
  setGymStatus,
  setSelectedGym,
  resetGymsFleet,
} = gymSlice.actions;

export default gymSlice.reducer;
