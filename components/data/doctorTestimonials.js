// Vertical (9:16) video testimonials from doctors and clinic owners.
// Drop MP4 files into public/doctors/videos/ and reference them as
// "/doctors/videos/<file>.mp4". Posters live in public/doctors/posters/.
// If videoSrc is empty, the card renders a "coming soon" placeholder
// so we can ship the page before the footage is finished.

export const doctorTestimonials = [
  {
    id: 'dr-meera',
    name: 'Dr. Meera Nair',
    role: 'Dermatologist & Clinic Owner',
    location: 'Bangalore',
    highlight: 'Fully booked 3 weeks in advance',
    accentGradient: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 42,
  },
  {
    id: 'dr-sumit',
    name: 'Dr. Sumit Doraya',
    role: 'Orthopaedic Surgeon',
    location: 'Jaipur',
    highlight: '10+ inbound consults a month from content',
    accentGradient: 'linear-gradient(135deg, #6C63FF, #9c8fff)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 51,
  },
  {
    id: 'dr-mukesh',
    name: 'Dr. Mukesh Sharma',
    role: 'Senior Consultant',
    location: 'Jaipur',
    highlight: '0 → 8,200 followers, 12 consults/month',
    accentGradient: 'linear-gradient(135deg, #00D4AA, #5ee7c8)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 47,
  },
  {
    id: 'rohit-clinic',
    name: 'Rohit Sharma',
    role: 'Multispecialty Clinic Owner',
    location: 'Delhi',
    highlight: 'Appointment bookings up 220% in 4 months',
    accentGradient: 'linear-gradient(135deg, #FF6B35, #6C63FF)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 38,
  },
  {
    id: 'ananya-wellness',
    name: 'Dr. Ananya Reddy',
    role: 'Wellness & Physio Studio',
    location: 'Hyderabad',
    highlight: '40 memberships sold out in 30 days',
    accentGradient: 'linear-gradient(135deg, #6C63FF, #FF6B35)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 34,
  },
  {
    id: 'dr-doraya-2',
    name: 'Dr. Vikas Shah',
    role: 'Dental Surgeon',
    location: 'Mumbai',
    highlight: '5x walk-ins from local Google + Meta ads',
    accentGradient: 'linear-gradient(135deg, #00D4AA, #FF6B35)',
    videoSrc: '',
    posterSrc: '',
    durationSec: 44,
  },
];
