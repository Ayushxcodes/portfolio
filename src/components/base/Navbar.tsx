"use client";
import StaggeredMenu from '@/components/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Works', ariaLabel: 'Learn about us', link: '/works' },
  { label: 'Blog', ariaLabel: 'View our services', link: '/blog' },
  { label: 'Projects', ariaLabel: 'Get in touch', link: '/projects' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const Navbar = () => (
  <header
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      background: 'transparent',
      padding: '0.5rem 2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}
  >
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#000"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#B19EEF', '#5227FF']}
      logoUrl="/Logo.png"
      accentColor="#ff6b6b"
      isFixed={true}
      onMenuOpen={() => console.log('Menu opened')}
      onMenuClose={() => console.log('Menu closed')}
    />
    <style>{`
      .sm-logo-img {
        width: 110px !important;
        height: 32px !important;
        min-width: 110px !important;
        min-height: 32px !important;
        max-width: 110px !important;
        max-height: 32px !important;
        object-fit: contain !important;
        aspect-ratio: 110/32 !important;
        background: transparent !important;
        transition: none !important;
        display: block !important;
      }
    `}</style>
  </header>
);

export default Navbar;