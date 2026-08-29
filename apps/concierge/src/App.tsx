import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { StoryBooking } from './components/StoryBooking';
import { InquiriesDashboard } from './components/InquiriesDashboard';
import { StaffLogin } from './components/StaffLogin';
import { EnquiryModal } from './components/EnquiryModal';
import {
  canAccessInquiries,
  clearSession,
  loadSession,
  type AuthSession,
} from './lib/auth';

type View = 'home' | 'about' | 'staff-login' | 'inquiries';

function pathToView(session: AuthSession | null): View {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'about') return 'about';
  if (hash === 'inquiries' || hash === 'owner' || hash === 'staff') {
    if (session && canAccessInquiries(session.role)) return 'inquiries';
    return 'staff-login';
  }
  return 'home';
}

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [view, setView] = useState<View>(() => pathToView(loadSession()));
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingVehicleId, setBookingVehicleId] = useState<string | undefined>();
  const [bookingTourId, setBookingTourId] = useState<string | undefined>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTopic, setEnquiryTopic] = useState('Vela Concierge');

  useEffect(() => {
    const onHash = () => {
      const next = pathToView(session);
      setView(next);
      if (window.location.hash.replace(/^#\/?/, '') === 'book') {
        setBookingOpen(true);
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [session]);

  const openBooking = (opts?: { vehicleId?: string; tourId?: string }) => {
    setBookingVehicleId(opts?.vehicleId);
    setBookingTourId(opts?.tourId);
    setBookingOpen(true);
    window.location.hash = '#/book';
  };

  const closeBooking = () => {
    setBookingOpen(false);
    if (window.location.hash.includes('book')) {
      window.location.hash = '';
    }
  };

  const goStaffArea = () => {
    if (session && canAccessInquiries(session.role)) {
      setView('inquiries');
      window.location.hash = '#/inquiries';
    } else {
      setView('staff-login');
      window.location.hash = '#/staff';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goAbout = () => {
    setView('about');
    window.location.hash = '#/about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (next: AuthSession) => {
    setSession(next);
    setView('inquiries');
    window.location.hash = '#/inquiries';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setView('staff-login');
    window.location.hash = '#/staff';
  };

  const showChrome = view === 'home' || view === 'about';

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#C5A880] selection:text-[#080B0E]">
      {showChrome && (
        <Navigation
          activeView={view === 'about' ? 'about' : 'home'}
          onOpenBooking={() => openBooking()}
          onOpenEnquiry={(topic) => {
            setEnquiryTopic(topic || 'Vela Concierge');
            setEnquiryOpen(true);
          }}
          onOpenStaff={goStaffArea}
          staffSignedIn={Boolean(session && canAccessInquiries(session.role))}
          onGoHome={goHome}
          onOpenAbout={goAbout}
        />
      )}

      <main className="flex-1">
        {view === 'home' && (
          <HomeView
            onOpenBooking={openBooking}
            onOpenEnquiry={(topic) => {
              setEnquiryTopic(topic || 'Vela Concierge');
              setEnquiryOpen(true);
            }}
          />
        )}
        {view === 'about' && (
          <AboutView
            onOpenBooking={() => openBooking()}
            onOpenEnquiry={(topic) => {
              setEnquiryTopic(topic || 'Vela Concierge');
              setEnquiryOpen(true);
            }}
            onBackHome={goHome}
          />
        )}
        {view === 'staff-login' && (
          <StaffLogin onSuccess={handleLoginSuccess} onCancel={goHome} />
        )}
        {view === 'inquiries' && session && canAccessInquiries(session.role) && (
          <InquiriesDashboard
            session={session}
            onBack={goHome}
            onLogout={handleLogout}
          />
        )}
      </main>

      {showChrome && (
        <Footer
          onOpenBooking={() => openBooking()}
          onOpenEnquiry={(topic) => {
            setEnquiryTopic(topic || 'Vela Concierge');
            setEnquiryOpen(true);
          }}
          onOpenStaff={goStaffArea}
          onOpenAbout={goAbout}
        />
      )}

      <AnimatePresence>
        {bookingOpen && (
          <StoryBooking
            key="story-booking"
            initialVehicleId={bookingVehicleId}
            initialTourId={bookingTourId}
            onClose={closeBooking}
            onComplete={closeBooking}
          />
        )}
      </AnimatePresence>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultTopic={enquiryTopic}
        brandLabel="VELA CONCIERGE"
      />
    </div>
  );
}
