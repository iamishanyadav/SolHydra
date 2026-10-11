/**
 * SOLHYDRA — CORPORATE CLIENT ENGINE
 * Creator & Contact: Ishan Yadav
 * Emails: ishanyadav2909@gmail.com, ishanyadavactive@gmail.com
 * Phone Placeholder: +91-XXXXXXXXXX
 * 
 * Features:
 * 1. Mobile Navigation Drawer
 * 2. Header Scroll Dynamics
 * 3. Interactive Fleet Calculator (Simple, clear metrics)
 * 4. Functional Contact Form with Dual Email Support (Formspree + Mailto fallback)
 * 5. Project Pitch Deck / Inquiry Modal
 * 6. FAQ Accordion
 * 7. Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initFleetCalculator();
  initPitchDeckModal();
  initFaqAccordion();
});

/* ==========================================================================
   1. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.textContent = isOpen ? '✕' : '☰';
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.textContent = '☰';
    }
  });
}

/* ==========================================================================
   3. INTERACTIVE FLEET CALCULATOR
   Helps fleet owners understand the real-world advantages of SolHydra:
   - Extra cargo capacity gained vs heavy battery-electric trucks (BEVs)
   - Onboard hydrogen made per day
   - Tailpipe CO2 emissions eliminated
   ========================================================================== */
function initFleetCalculator() {
  const trucksInput = document.getElementById('calc-trucks');
  const hoursInput = document.getElementById('calc-hours');

  if (!trucksInput || !hoursInput) return;

  const trucksDisplay = document.getElementById('calc-trucks-val');
  const hoursDisplay = document.getElementById('calc-hours-val');

  const outPayload = document.getElementById('out-payload');
  const outH2 = document.getElementById('out-h2');
  const outCo2 = document.getElementById('out-co2');

  function updateCalculations() {
    const trucks = parseInt(trucksInput.value, 10) || 10;
    const hours = parseFloat(hoursInput.value) || 8;

    // 1. Reclaimed Cargo Payload:
    // A battery-electric Class-8 truck carries ~8,000 kg battery.
    // SolHydra's lighter battery + fuel cell + water weighs ~3,800 kg.
    // That gives ~4,200 kg of additional cargo carrying capability per truck.
    const totalPayloadKg = trucks * 4200;

    // 2. Onboard H2 generated per day:
    // With 2.4 kW solar + regenerative braking buffer, average ~2.1 kg H2 synthesized per truck per day.
    const h2Daily = (trucks * 2.1 * (hours / 8)).toFixed(1);

    // 3. Annual CO2 avoided (metric tons):
    // Standard diesel commercial truck emits ~68 metric tons CO2 per year.
    const co2Annual = Math.round(trucks * 68);

    // Update UI elements
    if (trucksDisplay) trucksDisplay.textContent = `${trucks} Truck${trucks > 1 ? 's' : ''}`;
    if (hoursDisplay) hoursDisplay.textContent = `${hours} hrs / day`;

    if (outPayload) outPayload.textContent = `+${totalPayloadKg.toLocaleString()} kg`;
    if (outH2) outH2.textContent = `${h2Daily} kg / day`;
    if (outCo2) outCo2.textContent = `${co2Annual.toLocaleString()} MT / year`;
  }

  trucksInput.addEventListener('input', updateCalculations);
  hoursInput.addEventListener('input', updateCalculations);
  updateCalculations();
}


/* ==========================================================================
   5. PROJECT PITCH DECK / INQUIRY MODAL
   ========================================================================== */
function initPitchDeckModal() {
  const modal = document.getElementById('pitch-deck-modal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-open-deck-modal]');
  const closeButton = modal.querySelector('.modal-close-btn');

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items for a clean corporate feel
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
