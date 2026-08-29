/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ActiveDivision } from './types';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ParentPortalView } from './components/ParentPortal/ParentPortalView';
import { ArchitectureBlueprintView } from './components/Architecture/ArchitectureBlueprintView';
import { AboutView } from './components/About/AboutView';
import { EnquiryModal } from './components/Modals/EnquiryModal';

function hashToDivision(): ActiveDivision {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'about') return 'about';
  if (hash === 'blueprint') return 'blueprint';
  return 'parent';
}

function divisionToHash(division: ActiveDivision) {
  if (division === 'parent') return '';
  return `#/${division}`;
}

/**
 * Parent brand portal only.
 * Aviation → Vela Aviation sibling site; Iceland → Vela Concierge sibling site.
 */
export default function App() {
  const [activeDivision, setActiveDivision] = useState<ActiveDivision>(() => hashToDivision());
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTopic, setEnquiryTopic] = useState('General Runway to Road VIP Service');

  useEffect(() => {
    const onHash = () => setActiveDivision(hashToDivision());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goDivision = (division: ActiveDivision) => {
    setActiveDivision(division);
    window.location.hash = divisionToHash(division);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (topic?: string) => {
    setEnquiryTopic(topic || 'General Runway to Road VIP Service');
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#C5A880] selection:text-[#080B0E]">
      <Navigation
        activeDivision={activeDivision}
        goDivision={goDivision}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <main className="flex-1">
        {activeDivision === 'parent' && (
          <ParentPortalView
            setActiveDivision={goDivision}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {activeDivision === 'about' && (
          <AboutView
            onOpenEnquiry={handleOpenEnquiry}
            onBackHome={() => goDivision('parent')}
          />
        )}

        {activeDivision === 'blueprint' && <ArchitectureBlueprintView />}
      </main>

      <Footer goDivision={goDivision} onOpenEnquiry={handleOpenEnquiry} />

      <AnimatePresence>
        {enquiryOpen && (
          <EnquiryModal
            key="enquiry"
            isOpen={enquiryOpen}
            onClose={() => setEnquiryOpen(false)}
            defaultTopic={enquiryTopic}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
