import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AirVent,
  ArrowLeft,
  Bath,
  BedDouble,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleSlash,
  CookingPot,
  Dumbbell,
  Fan,
  Gift,
  Globe2,
  Grid3X3,
  Heart,
  Home,
  KeyRound,
  Map,
  Menu,
  MessageCircle,
  PawPrint,
  Search,
  Share,
  Shield,
  ShowerHead,
  Star,
  Tag,
  Tv,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  X,
} from 'lucide-react';
import './styles.css';

const images = import.meta.glob('./assets/**/*', { eager: true, import: 'default' });

const asset = (path) => {
  if (!path) return '';
  let cleanPath = path;
  if (cleanPath.startsWith('src/assets/')) {
    cleanPath = cleanPath.replace('src/assets/', '');
  } else if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.replace('assets/', '');
  }
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  // Fix typos and resolve
  if (cleanPath.startsWith('eedback/')) {
    cleanPath = cleanPath.replace('eedback/', 'feedback/');
  }
  const key = `./assets/${cleanPath}`;
  return images[key] || '';
};

const photos = [
  { id: 1, room: 'Living room 1', url: asset('Living room 1.jpeg') },
  { id: 2, room: 'Living room 2', url: asset('Living room 2.jpeg') },
  { id: 3, room: 'Full bathroom', url: asset('Full bathroom 1.jpeg') },
  { id: 4, room: 'Bedroom', url: asset('Bedroom 1.jpeg') },
  { id: 5, room: 'Exterior', url: asset('Exterior 1.jpeg') },
  { id: 6, room: 'Full kitchen', url: asset('Full kitchen 1.jpeg') },
  { id: 7, room: 'Pool', url: asset('Pool 1.jpeg') },
  { id: 8, room: 'Gym', url: asset('Gym 1.jpeg') },
  { id: 9, room: 'Additional photos', url: asset('Additional photos 1.jpeg') },
];

const tourGroups = [
  {
    title: 'Living room 1',
    details: 'Sofa · Air conditioning · Ceiling fan · TV',
    files: ['Full kitchen 1.jpeg', 'Living room 1.jpeg', 'Living room 10.jpeg', 'Living room 11.jpeg'],
  },
  {
    title: 'Living room 2',
    details: 'Sofa · Air conditioning · Ceiling fan · TV',
    files: ['Living room 2.jpeg', 'Living room 3.jpeg', 'Living room 4.jpeg', 'Living room 5.jpeg', 'Living room 6.jpeg'],
  },
  {
    title: 'Full kitchen',
    details: 'Coffee · Cooking basics · Crockery and cutlery · Freezer · Kettle · Kitchen · Microwave · Toaster',
    files: ['Full kitchen 1.jpeg', 'Full kitchen 2.jpeg', 'Living room 9.jpeg'],
  },
  {
    title: 'Bedroom',
    details: 'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    files: ['Bedroom 1.jpeg', 'Bedroom 2.jpeg', 'Bedroom 3.jpeg', 'Bedroom 4.jpeg', 'Bedroom 5.jpeg', 'Bedroom 6.jpeg'],
  },
  {
    title: 'Full bathroom',
    details: 'Hairdryer · Hot water · Shampoo · Shower gel',
    files: ['Full bathroom 1.jpeg'],
  },
  {
    title: 'Gym',
    details: 'Shared gym in building',
    files: ['Gym 1.jpeg', 'Gym 3.jpeg', 'Gym 4.jpeg', 'Gym 5.jpeg'],
  },
  {
    title: 'Exterior',
    details: 'Building exterior · Entrance · Parking area',
    files: ['Exterior 1.jpeg', 'Exterior 2.jpeg', 'Exterior 3.jpeg', 'Exterior 4.jpeg', 'Exterior 5.jpeg'],
  },
  {
    title: 'Pool',
    details: 'Shared pool · Outdoor seating',
    files: ['Pool 1.jpeg', 'Pool 2.jpeg', 'Pool 3.jpeg'],
  },
  {
    title: 'Additional photos',
    details: 'More photos of this stay',
    files: ['Additional photos 1.jpeg', 'Additional photos 2.jpeg', 'Additional photos 3.jpeg', 'Additional photos 4.jpeg', 'Additional photos 5.jpeg', 'Additional photos 6.jpeg', 'Additional photos 7.jpeg', 'Additional photos 8.jpeg', 'Additional photos 9.jpeg', 'Additional photos 10.jpeg', 'Gyn 1.jpeg', 'Living room 8.jpeg'],
  },
];

const tourPhotos = tourGroups.flatMap((group) => group.files.map((file) => ({
  id: 1000 + tourGroups.slice(0, tourGroups.indexOf(group)).reduce((sum, item) => sum + item.files.length, 0) + group.files.indexOf(file),
  group: group.title,
  details: group.details,
  url: asset(file),
})));

const previewAmenities = [
  ['Kitchen', Utensils, false],
  ['Wifi', Wifi, false],
  ['Dedicated workspace', BriefcaseBusiness, false],
  ['Free parking on premises', Car, false],
  ['Pool', Waves, false],
  ['Hot tub', Bath, false],
  ['Pets allowed', PawPrint, false],
  ['Exterior security cameras on property', Camera, false],
  ['Carbon monoxide alarm', CircleSlash, true],
  ['Smoke alarm', Bell, true],
];

const amenityGroups = [
  ['Bathroom', [['Hairdryer', ShowerHead], ['Cleaning products', CookingPot], ['Shampoo', Bath], ['Hot water', Waves], ['Shower gel', Bath]]],
  ['Bedroom and laundry', [['Washing machine', WashingMachine], ['Hangers', Home], ['Bed linen', BedDouble], ['Room-darkening blinds', Home], ['Iron', Home], ['Clothes storage', Home], ['Cot', BedDouble]]],
  ['Entertainment', [['TV', Tv]]],
  ['Family', [['Cot', BedDouble]]],
  ['Heating and cooling', [['Air conditioning', AirVent], ['Ceiling fan', Fan]]],
  ['Home safety', [['Exterior security cameras on property', Camera], ['Carbon monoxide alarm', CircleSlash], ['Smoke alarm', Bell]]],
  ['Internet and office', [['Wifi', Wifi], ['Dedicated workspace', BriefcaseBusiness]]],
  ['Kitchen and dining', [['Kitchen', Utensils], ['Fridge', CookingPot], ['Freezer', CookingPot], ['Microwave', CookingPot], ['Cooking basics', CookingPot], ['Crockery and cutlery', Utensils], ['Kettle', CookingPot], ['Coffee', CookingPot], ['Wine glasses', Utensils], ['Toaster', CookingPot], ['Blender', CookingPot], ['Cooker', CookingPot]]],
  ['Location features', [['Private entrance', KeyRound]]],
  ['Outdoor', [['Patio or balcony', Home], ['Outdoor dining area', Utensils]]],
  ['Parking and facilities', [['Free parking on premises', Car], ['Pool', Waves], ['Hot tub', Bath], ['Gym', Dumbbell]]],
  ['Services', [['Pets allowed', PawPrint], ['Cleaning available during stay', CookingPot], ['Long-term stays allowed', CalendarDays], ['Self check-in', KeyRound]]],
];

const ratingMetrics = [
  ['Cleanliness', '5.0', ShowerHead],
  ['Accuracy', '5.0', CircleCheck],
  ['Check-in', '5.0', KeyRound],
  ['Communication', '5.0', MessageCircle],
  ['Location', '4.8', Map],
  ['Value', '4.8', Tag],
];

const reviewChips = [
  ['Comfort', '6', '🛋️'],
  ['Accuracy', '5', '✅'],
  ['Hot tub', '5', '🛁'],
  ['Condition', '4', '🥤'],
  ['Hospitality', '8', '🎁'],
  ['Cleanliness', '4', '🧴'],
  ['Amenities', '2', '🧁'],
  ['Decor', '2', '🖼️'],
  ['Indoor spaces', '2', '🏠'],
  ['Location', '2', '📍'],
];

const reviews = [
  {
    name: 'Amit',
    meta: '2 months on Airbnb',
    when: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
  },
  {
    name: 'Aheesh',
    meta: '3 years on Airbnb',
    when: '2 weeks ago',
    avatar: asset('feedback/Aheesh.jpeg'),
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    showMore: true,
  },
  {
    name: 'Samiksha',
    meta: '8 months on Airbnb',
    when: 'May 2026',
    avatar: asset('feedback/Samiksha.jpeg'),
    text: 'the host nitish was really great help',
  },
  {
    name: 'Vedant',
    meta: '4 years on Airbnb',
    when: 'May 2026',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....',
    showMore: true,
  },
  {
    name: 'Vaibhav S',
    meta: '3 years on Airbnb',
    when: 'May 2026',
    avatar: asset('feedback/Vaibhav S.jpeg'),
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  },
  {
    name: 'Mohd',
    meta: '5 years on Airbnb',
    when: 'May 2026',
    avatar: asset('feedback/Mohd.jpeg'),
    text: 'Great place. Exactly as described in the listing.',
  },
];

const coHosts = [
  ['Sharath', asset('Co-Hosts/Sharath.jpg')],
  ['Aman Dev Pahwa', asset('Co-Hosts/Aman Dev Pahwa.jpg')],
  ['Maria Karen Priyanka', asset('Co-Hosts/Maria Karen Priyanka.jpg')],
  ['Simran', asset('Co-Hosts/Simran.jpeg')],
  ['Pallavi', asset('feedback/Aheesh.jpeg')],
  ['Sanyukta', asset('feedback/Samiksha.jpeg')],
  ['Shruti', null],
  ['Amisha', null],
];

const nearbyStays = [
  ['The Tropical Studio | 5 mins to Beach', '₹22,824', '4.96', asset('More stays nearby/The Tropical Studio 5 mins to Beach.jpeg')],
  ['Luxury Casa Bella 1BHK with plunge pool, Calangute', '₹39,942', '4.95', asset('More stays nearby/Luxury Casa Bella 1BHK with plunge pool, Calangute.jpeg')],
  ['Kanso by Earthen Window | Jacuzzi | Terrace | Pool', '₹45,648', '5.0', asset('More stays nearby/Kanso by Earthen Window  Jacuzzi  Terrace  Pool.jpeg')],
  ['Luxury Apt | Private Pool | 6 Mins from Beach', '₹48,786', '4.93', asset('More stays nearby/Luxury Apt Private Pool 6 Mins from Beach.jpeg')],
  ['NAQAB - 1bhk with private pool', '₹42,218', '4.95', asset('More stays nearby/NAQAB - 1bhk with private pool.jpeg')],
  ['Greentique Luxury Flat with plunge pool, Calangute', '₹44,506', '4.94', asset('More stays nearby/Greentique Luxury Flat with plunge pool, Calangute.jpeg')],
  ['Beautiful Studio with a view to die for', '₹23,600', '4.91', asset('More stays nearby/Beautiful Studio with a view to die for.jpeg')],
];

function App() {
  const [view, setView] = useState('listing');
  const [photoIndex, setPhotoIndex] = useState(() => Number(localStorage.getItem('last-photo') || 0));
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');
  const [showStickyNav, setShowStickyNav] = useState(false);
  const modalCloseRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('modal-open', view !== 'listing');
    if (view === 'amenities') modalCloseRef.current?.focus();
  }, [view]);

  useEffect(() => {
    const applyUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('modal') !== 'PHOTO_TOUR_SCROLLABLE') {
        setView('listing');
        return;
      }

      const modalItem = Number(params.get('modalItem'));
      if (modalItem) {
        const index = Math.max(0, tourPhotos.findIndex((photo) => photo.id === modalItem));
        setPhotoIndex(index);
        setView('lightbox');
        return;
      }

      setView('tour');
    };

    applyUrlState();
    window.addEventListener('popstate', applyUrlState);
    return () => window.removeEventListener('popstate', applyUrlState);
  }, []);

  useEffect(() => {
    localStorage.setItem('last-photo', String(photoIndex));
  }, [photoIndex]);

  useEffect(() => {
    const onScroll = () => {
      let currentSection = 'photos';
      ['photos', 'amenities', 'reviews', 'location'].forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top < 120) currentSection = id;
      });
      setActiveSection(currentSection);
      setShowStickyNav(window.scrollY > 620);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
      if (view === 'lightbox' && event.key === 'ArrowRight') moveLightbox(1);
      if (view === 'lightbox' && event.key === 'ArrowLeft') moveLightbox(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [view, photoIndex]);

  function setTourUrl(index, replace = false) {
    const url = index == null
      ? '?modal=PHOTO_TOUR_SCROLLABLE'
      : `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${tourPhotos[index].id}`;
    window.history[replace ? 'replaceState' : 'pushState'](null, '', url);
  }

  function openTour() {
    setView('tour');
    setTourUrl();
  }

  function closeModal() {
    setView('listing');
    window.history.pushState(null, '', window.location.pathname);
  }

  function openLightbox(index, replace = false) {
    setPhotoIndex(index);
    setView('lightbox');
    setTourUrl(index, replace);
  }

  function returnToTour() {
    setView('tour');
    setTourUrl();
  }

  function moveLightbox(delta) {
    const nextIndex = (photoIndex + delta + tourPhotos.length) % tourPhotos.length;
    openLightbox(nextIndex, true);
  }

  return (
    <>
      <Header />
      <StickyNav activeSection={activeSection} visible={showStickyNav} />
      <main>
        <Hero onTour={openTour} />
        <div className="content-wrap">
          <div className="left-col">
            <Intro />
            <Description expanded={showFullDescription} onToggle={() => setShowFullDescription((value) => !value)} />
            <SleepSection />
            <AmenitiesPreview onOpen={() => setView('amenities')} />
            <CalendarSection />
          </div>
          <aside className="right-col">
            <Promo />
            <ReserveCard />
            <a className="report" href="#report">⚑ Report this listing</a>
          </aside>
        </div>
        <Reviews />
        <LocationSection />
        <HostSection />
        <ThingsToKnow />
        <NearbyStays />
      </main>
      {view === 'amenities' && <AmenitiesModal closeRef={modalCloseRef} onClose={() => setView('listing')} />}
      {view === 'tour' && <PhotoTour onClose={closeModal} onOpen={openLightbox} />}
      {view === 'lightbox' && <Lightbox index={photoIndex} onClose={closeModal} onBack={returnToTour} onPrevious={() => moveLightbox(-1)} onNext={() => moveLightbox(1)} />}
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="logo" href="#photos" aria-label="Airbnb">
        <img src={asset("logo.png")} alt="Airbnb" />
      </a>
      <div className="search-pill" role="search">
        <img src={asset('searchbar-house.png')} alt="" />
        <button type="button">Anywhere</button>
        <button type="button">Anytime</button>
        <button type="button" className="muted">Add guests</button>
        <button type="button" className="search-round" aria-label="Search"><Search size={17} /></button>
      </div>
      <nav className="host-nav">
        <a href="#host">Become a host</a>
        <button type="button" aria-label="Language"><Globe2 size={18} /></button>
        <button type="button" aria-label="Menu"><Menu size={19} /></button>
      </nav>
    </header>
  );
}

function StickyNav({ activeSection, visible }) {
  const navItems = ['Photos', 'Amenities', 'Reviews', 'Location'];
  return (
    <nav className={visible ? 'sticky-nav visible' : 'sticky-nav'} aria-label="Page sections">
      <div>
        {navItems.map((item) => (
          <a key={item} className={activeSection === item.toLowerCase() ? 'active' : ''} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </div>
      <div className="sticky-book">
        <span><strong>₹28,499</strong> for 5 nights<br /><small>★ 4.95 · 19 reviews</small></span>
        <button type="button">Reserve</button>
      </div>
    </nav>
  );
}

function Hero({ onTour }) {
  const [saved, setSaved] = React.useState(false);
  const [shareTooltip, setShareTooltip] = React.useState(false);
  const [savedTooltip, setSavedTooltip] = React.useState(false);

  function handleShare() {
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  }

  function handleSave() {
    const next = !saved;
    setSaved(next);
    if (next) {
      setSavedTooltip(true);
      setTimeout(() => setSavedTooltip(false), 2000);
    }
  }

  return (
    <section id="photos" className="hero-section">
      <div className="title-line">
        <h1>Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>
        <div className="hero-actions">
          <button type="button" className="hero-action-btn" onClick={handleShare}>
            <Share size={15} strokeWidth={2.2} /> Share
          </button>
          <button type="button" className={`hero-action-btn${saved ? ' saved' : ''}`} onClick={handleSave}>
            <Heart
              size={16}
              fill={saved ? '#ff385c' : 'none'}
              color={saved ? '#ff385c' : '#222'}
              strokeWidth={2}
            />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <div className="real-photo-grid">
        {photos.slice(0, 5).map((photo) => (
          <button type="button" key={photo.id} onClick={onTour} aria-label={`${photo.room} photo`}>
            <img src={photo.url} alt="" />
          </button>
        ))}
        <button type="button" className="all-photos" onClick={onTour}><Grid3X3 size={15} /> Show all photos</button>
        {/* Bottom-centre action tooltips — appear over the photo grid */}
        {shareTooltip && (
          <div className="photo-grid-toast">
            <Share size={14} /> Share options
          </div>
        )}
        {savedTooltip && (
          <div className="photo-grid-toast">
            <Heart size={14} fill="#fff" color="#fff" /> Saved to wishlist
          </div>
        )}
      </div>
    </section>
  );
}


function Intro() {
  return (
    <section className="intro">
      <h2>Entire serviced apartment in Candolim, India</h2>
      <p>3 guests · 1 bedroom · 1 bed · 1 bathroom</p>
      <div className="guest-card">
        <strong>Guest<br />favourite</strong>
        <span>One of the most loved homes on Airbnb, according to guests</span>
        <b>4.95<br /><small>★★★★★</small></b>
        <b>19<br /><small>Reviews</small></b>
      </div>
      <div className="host-row">
        <span className="host-mini-logo">MIRASHYA</span>
        <div><strong>Hosted by Mirashya Homes</strong><span>2 years hosting</span></div>
      </div>
      <div className="feature-stack">
        <Feature icon={CookingPot} title="Outdoor entertainment" text="The pool and alfresco dining are great for summer trips." />
        <Feature icon={Fan} title="Designed for staying cool" text="Beat the heat with the A/C and ceiling fan." />
        <Feature icon={KeyRound} title="Self check-in" text="You can check in with the building staff." />
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="feature-row">
      <Icon size={24} />
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Description({ expanded, onToggle }) {
  return (
    <section className="description-block">
      <div className="translate">Some info has been automatically translated. <button type="button">Show original</button></div>
      <div className={`desc-wrapper${expanded ? '' : ' collapsed'}`}>
        <p>
          🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴
          {expanded && ' The apartment is set up for slow mornings, easy evenings and quick access to North Goa beaches.'}
        </p>
      </div>
      <button type="button" className="text-link" onClick={onToggle}>
        {expanded ? 'Show less' : 'Show more'} <ChevronRight size={16} />
      </button>
    </section>
  );
}

function SleepSection() {
  return (
    <section className="sleep-section">
      <h2>Where you'll sleep</h2>
      <div className="sleep-grid">
        <SleepCard img={photos[3].url} title="Bedroom" text="1 double bed" />
        <SleepCard img={photos[5].url} title="Living room" text="1 sofa" />
      </div>
    </section>
  );
}

function SleepCard({ img, title, text }) {
  return <article><img src={img} alt="" /><strong>{title}</strong><span>{text}</span></article>;
}

function AmenitiesPreview({ onOpen }) {
  return (
    <section id="amenities" className="amenities-section">
      <h2>What this place offers</h2>
      <div className="amenity-preview">
        {previewAmenities.map(([label, Icon, unavailable]) => (
          <div className={unavailable ? 'amenity muted-line' : 'amenity'} key={label}>
            <Icon size={24} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <button type="button" className="outline-btn" onClick={onOpen}>Show all 50 amenities</button>
    </section>
  );
}

function CalendarSection() {
  return (
    <section className="calendar-section">
      <h2>5 nights in Candolim</h2>
      <p>18 Oct 2026 - 23 Oct 2026</p>
      <div className="calendar-head">
        <button aria-label="Previous month"><ChevronLeft size={18} /></button>
        <strong>October 2026</strong>
        <strong>November 2026</strong>
        <button aria-label="Next month"><ChevronRight size={18} /></button>
      </div>
      <div className="months">
        <Month start={4} days={31} rangeStart={18} rangeEnd={23} />
        <Month start={0} days={30} faded={[18, 19, 20, 21, 22, 23, 24, 29, 30]} />
      </div>
      <div className="calendar-foot"><CalendarDays size={22} /><button>Clear dates</button></div>
    </section>
  );
}

function Month({ start, days, rangeStart, rangeEnd, faded = [] }) {
  const cells = [];
  
  // Add empty slots for the month's start day offset
  for (let i = 0; i < start; i++) {
    cells.push(<div key={`blank-${i}`} className="day-cell blank" />);
  }
  
  for (let day = 1; day <= days; day++) {
    let cellClass = "day-cell";
    
    if (rangeStart && rangeEnd) {
      if (day === rangeStart) {
        cellClass += " range-start";
      } else if (day === rangeEnd) {
        cellClass += " range-end";
      } else if (day > rangeStart && day < rangeEnd) {
        cellClass += " range-in-between";
      }
    }
    
    if (faded.includes(day)) {
      cellClass += " faded";
    }
    
    cells.push(
      <div key={day} className={cellClass}>
        <span className="day-number">{day}</span>
      </div>
    );
  }
  
  return (
    <div className="month">
      <b>S</b><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b>
      {cells}
    </div>
  );
}

function Promo() {
  return (
    <div className="promo">
      <Tag size={28} fill="#56a564" color="#56a564" />
      <span>Get 10% off your next stay.<br /><a href="#terms">Terms apply</a></span>
      <button type="button">Claim</button>
    </div>
  );
}

function ReserveCard() {
  return (
    <div className="reserve-card">
      <div className="price-line"><strong>₹28,499</strong> <span>for 5 nights</span></div>
      <div className="booking-grid">
        <label>CHECK-IN<span>10/18/2026</span></label>
        <label>CHECKOUT<span>10/23/2026</span></label>
        <label>GUESTS<span>2 guests <ChevronDown size={18} /></span></label>
      </div>
      <div className="cancel-note">Free cancellation before <b>17 October</b></div>
      <button type="button" className="reserve-btn">Reserve</button>
      <p>You won't be charged yet</p>
    </div>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="reviews-section full-section">
      <div className="favourite-score">
        <div className="score-line">
          <span className='laurel-parant'><img className='laurel left' src={asset('laurel-left.png')} alt="" /></span>
            <strong>4.95</strong>
          <span className='laurel-parant'><img className='laurel right' src={asset('laurel-right.png')} alt="" /></span>
        </div>
        <h2>Guest favourite</h2>
        <p>This home is a guest favourite based on ratings, reviews and reliability</p>
        <button type="button">How reviews work</button>
      </div>
      <div className="rating-grid">
        <div className="overall-rating">
          <strong>Overall rating</strong>
          {[5, 4, 3, 2, 1].map((value) => <div key={value}><span>{value}</span><i style={{ '--fill': `${value === 5 ? 94 : value === 4 ? 5 : 0}%` }} /></div>)}
        </div>
        {ratingMetrics.map(([label, value, Icon]) => (
          <div className="metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <Icon size={32} strokeWidth={1.8} />
          </div>
        ))}
      </div>
      <div className="chip-row" aria-label="Review categories">
        {reviewChips.map(([label, count, icon]) => <button type="button" key={label}><span>{icon}</span>{label}<small>{count}</small></button>)}
      </div>
      <div className="review-grid">
        {reviews.map((review) => <Review key={review.name} {...review} />)}
      </div>
      <button className="outline-btn reviews-button" type="button">Show all 19 reviews</button>
    </section>
  );
}

function Review({ name, meta, when, text, avatar, showMore }) {
  console.log(avatar);
  const [expanded, setExpanded] = React.useState(false);
  const LIMIT = 180;
  const isTruncatable = showMore && text.length > LIMIT;
  const displayText = isTruncatable && !expanded ? text.slice(0, LIMIT) + '\u2026' : text;

  return (
    <article className="review">
      {avatar
        ? <img src={avatar} alt={name} />
        : <div aria-hidden="true">{name[0]}</div>
      }
      <div className="review-copy">
        <strong>{name}</strong>
        <small>{meta}</small>
      </div>
      <p className="stars">★★★★★ · {when}</p>
      <p>{displayText}</p>
      {isTruncatable && (
        <button type="button" className="inline-link" onClick={() => setExpanded(v => !v)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </article>
  );
}

function LocationSection() {
  return (
    <section id="location" className="location-section full-section">
      <h2>Where you’ll be</h2>
      <strong>Candolim, Goa, India</strong>
      <div className="map-card" aria-label="Map of Candolim">
        <button type="button" className="map-search" aria-label="Search map"><Search size={18} /></button>
        <div className="map-zoom"><button type="button">+</button><button type="button">−</button></div>
        <div className="map-water" />
        <div className="map-park park-one" />
        <div className="map-park park-two" />
        <div className="home-pin"><Home size={34} /></div>
      </div>
      <p>Exact location will be provided after booking.</p>
      <h3>Neighbourhood highlights</h3>
      <p className="location-copy">Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.</p>
      <button type="button" className="text-link">Show more <ChevronRight size={18} /></button>
    </section>
  );
}

function HostSection() {
  return (
    <section id="host" className="host-section full-section">
      <h2>Meet your host</h2>
      <div className="host-grid">
        <div>
          <div className="host-profile-card">
            <div className="host-logo">MIRASHYA</div>
            <span className="host-check">✓</span>
            <h3>Mirashya<br />Homes</h3>
            <p>Host</p>
            <div className="host-stats">
              <strong>1,463<small>Reviews</small></strong>
              <strong>4.68★<small>Rating</small></strong>
              <strong>2<small>Years hosting</small></strong>
            </div>
          </div>
          <div className="host-facts">
            <p><Gift size={24} /> Born in the 80s</p>
            <p><Home size={24} /> Where I went to school: NICMAR GOA</p>
          </div>
        </div>
        <div>
          <h3>Co-Hosts</h3>
          <div className="cohost-grid">
            {coHosts.map(([name, img]) => (
              <div className="cohost" key={name}>
                {img ? <img src={img} alt="" /> : <span>{name[0]}</span>}
                <p>{name}</p>
              </div>
            ))}
          </div>
          <h3>Host details</h3>
          <p>Response rate: 100%</p>
          <p>Responds within an hour</p>
          <button type="button" className="message-host">Message host</button>
          <p className="protect-note"><Shield size={23} /> To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
        </div>
      </div>
    </section>
  );
}

function ThingsToKnow() {
  return (
    <section className="things-section full-section">
      <h2>Things to know</h2>
      <div className="things-grid">
        <InfoColumn icon={CalendarDays} title="Cancellation policy" lines={['Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.', 'Review this host’s full policy for details.']} />
        <InfoColumn icon={KeyRound} title="House rules" lines={['Check-in after 2:00 pm', 'Checkout before 11:00 am', '3 guests maximum']} />
        <InfoColumn icon={Shield} title="Safety & property" lines={['Carbon monoxide alarm not reported', 'Smoke alarm not reported', 'Exterior security cameras on property']} />
      </div>
    </section>
  );
}

function InfoColumn({ icon: Icon, title, lines }) {
  return (
    <article className="info-column">
      <Icon size={25} />
      <h3>{title}</h3>
      {lines.map((line) => <p key={line}>{line}</p>)}
      <a href="#learn">Learn more</a>
    </article>
  );
}

function NearbyStays() {
  const scrollRef = React.useRef(null);

  function scroll(dir) {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector('.stay-card');
    const cardW = card ? card.offsetWidth + 20 : 220;
    scrollRef.current.scrollBy({ left: dir * cardW * 2, behavior: 'smooth' });
  }

  return (
    <section className="nearby-section full-section">
      <div className="nearby-head">
        <h2>More stays nearby</h2>
        <div>
          <button type="button" aria-label="Scroll left" onClick={() => scroll(-1)}><ChevronLeft size={18} /></button>
          <button type="button" aria-label="Scroll right" onClick={() => scroll(1)}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="nearby-grid" ref={scrollRef}>
        {nearbyStays.map(([title, price, rating, img]) => (
          <article className="stay-card" key={title}>
            <img src={img} alt={title} />
            <h3>{title}</h3>
            <p><strong>{price}</strong> <span>★ {rating}</span></p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AmenitiesModal({ closeRef, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="amenities-modal" role="dialog" aria-modal="true" aria-labelledby="amenities-title">
        <button ref={closeRef} className="modal-close" type="button" aria-label="Close" onClick={onClose}><X size={20} /></button>
        <div className="modal-scroll">
          <h2 id="amenities-title">What this place offers</h2>
          {amenityGroups.map(([group, items]) => (
            <div className="amenity-group" key={group}>
              <h3>{group}</h3>
              {items.map(([label, Icon]) => (
                <div className="modal-amenity" key={`${group}-${label}`}>
                  <Icon size={24} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PhotoTour({ onClose, onOpen }) {
  function scrollToGroup(index) {
    document.getElementById(`tour-group-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function groupStartIndex(groupIndex) {
    return tourGroups.slice(0, groupIndex).reduce((sum, group) => sum + group.files.length, 0);
  }

  return (
    <section className="tour-view" role="dialog" aria-modal="true" aria-label="Photo tour">
      <header className="tour-header">
        <button type="button" onClick={onClose} aria-label="Back"><ArrowLeft size={22} /></button>
        <h1>Photo tour</h1>
        <div><button type="button" aria-label="Share"><Share size={18} /></button><button type="button" aria-label="Save"><Heart size={20} /></button></div>
      </header>
      <div className="tour-content">
        <nav className="tour-thumbs" aria-label="Rooms">
          {tourGroups.map((group, index) => (
            <button type="button" key={group.title} onClick={() => scrollToGroup(index)}>
              <img src={asset(group.files[0])} alt="" />
              <span>{group.title}</span>
            </button>
          ))}
        </nav>
        <div className="tour-sections">
          {tourGroups.map((group, groupIndex) => {
            const startIndex = groupStartIndex(groupIndex);
            return (
              <section className="tour-room" id={`tour-group-${groupIndex}`} key={group.title}>
                <div className="tour-room-copy">
                  <h2>{group.title}</h2>
                  <p>{group.details}</p>
                </div>
                <div className={group.title === 'Bedroom' ? 'tour-photo-grid compact' : 'tour-photo-grid'}>
                  {group.files.map((file, imageIndex) => {
                    const tourIndex = startIndex + imageIndex;
                    const isLarge = group.title !== 'Bedroom' && imageIndex === 0;
                    return (
                      <button
                        type="button"
                        className={isLarge ? 'large' : ''}
                        key={file}
                        onClick={() => onOpen(tourIndex)}
                        aria-label={`${group.title} image ${imageIndex + 1}`}
                      >
                        <img src={asset(file)} alt="" />
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ index, onClose, onBack, onPrevious, onNext }) {
  const photo = tourPhotos[index] || tourPhotos[0];
  return (
    <section className="lightbox-view" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <header className="lightbox-header">
        <button type="button" onClick={onBack} aria-label="Show all photos"><Grid3X3 size={22} /></button>
        <h1>{photo.group}</h1>
        <div>
          <span>{index + 1} of {tourPhotos.length}</span>
          <button type="button" onClick={onClose} aria-label="Close"><X size={22} /></button>
        </div>
      </header>
      <button className="photo-nav prev" aria-label="Previous" onClick={onPrevious}><ChevronLeft size={30} /></button>
      <img className="lightbox-photo" src={photo.url} alt="" />
      <button className="photo-nav next" aria-label="Next" onClick={onNext}><ChevronRight size={30} /></button>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
