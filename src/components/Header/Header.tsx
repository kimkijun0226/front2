import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='logo'>
          <img src='/assets/logo.png' alt='standard Logo' />
        </Link>

        <div ref={menuRef} className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul className='menu-list'>
            <li onClick={closeMenu} className={`menu-item ${location.pathname === '/daily' ? 'active' : ''}`}>
              <Link to='/daily' className={`menu-item-link ${location.pathname === '/daily' ? 'active' : ''}`}>
                일별 보고 자료
              </Link>
            </li>
            <li onClick={closeMenu} className={`menu-item ${location.pathname === '/mobile' ? 'active' : ''}`}>
              <Link to='/mobile' className={`menu-item-link ${location.pathname === '/mobile' ? 'active' : ''}`}>
                이통사별 전송 건수
              </Link>
            </li>
            <li onClick={closeMenu} className={`menu-item ${location.pathname === '/sms' ? 'active' : ''}`}>
              <Link to='/sms' className={`menu-item-link ${location.pathname === '/sms' ? 'active' : ''}`}>
                SMS
              </Link>
            </li>
            <li onClick={closeMenu} className={`menu-item ${location.pathname === '/mms' ? 'active' : ''}`}>
              <Link to='/mms' className={`menu-item-link ${location.pathname === '/mms' ? 'active' : ''}`}>
                MMS
              </Link>
            </li>
          </ul>
        </div>

        <div className='navbar-links lg:flex lg:order-1'>
          <ul>
            <li className={`navbar-link-item ${location.pathname === '/daily' ? 'active' : ''}`}>
              <Link to='/daily' className={`navbar-link ${location.pathname === '/daily' ? 'active' : ''}`}>
                일별 보고 자료
              </Link>
            </li>
            <li className={`navbar-link-item ${location.pathname === '/mobile' ? 'active' : ''}`}>
              <Link to='/mobile' className={`navbar-link ${location.pathname === '/mobile' ? 'active' : ''}`}>
                이통사별 전송 건수
              </Link>
            </li>
            <li className={`navbar-link-item ${location.pathname === '/sms' ? 'active' : ''}`}>
              <Link to='/sms' className={`navbar-link ${location.pathname === '/sms' ? 'active' : ''}`}>
                SMS
              </Link>
            </li>
            <li className={`navbar-link-item ${location.pathname === '/mms' ? 'active' : ''}`}>
              <Link to='/mms' className={`navbar-link ${location.pathname === '/mms' ? 'active' : ''}`}>
                MMS
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
