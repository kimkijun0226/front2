import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TypeSelectBtn.css'; // Import the CSS file
import useStore from '../../../store/Store';

const TypeSelectBtn: React.FC = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // 드롭다운 메뉴를 표시할 상태 추가

  const handleItemClick = (item: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, messageType: item });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, messageType: item });
        break;
      case '/sms':
        setSMSData({ ...SMSData, messageType: item });
        break;
      case '/mms':
        setMMSData({ ...MMSData, messageType: item });
        break;
    }
    setShowMenu(false); // 메뉴 항목을 클릭했을 때 메뉴를 닫음
  };

  const inputRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node) && !dropDownRef.current?.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [inputRef, dropDownRef]);

  return (
    <div ref={inputRef} className='type-select-btn-container'>
      <div className='type-select-btn-label'>타입 선택</div>
      <button
        onClick={() => setShowMenu(!showMenu)} // 클릭 시 메뉴 표시 상태 변경
        className='type-select-btn'>
        <>
          <span className='text-black'>{location.pathname === '/daily' ? dailyData.messageType : location.pathname === '/mobile' ? mobileData.messageType : location.pathname === '/sms' ? SMSData.messageType : location.pathname === '/mms' ? MMSData.messageType : 'SMS'}</span>
          <svg className={`arrow ${showMenu ? 'rotate' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </>
      </button>
      {showMenu && ( // 드롭다운 메뉴 표시 상태에 따라 메뉴 표시
        <div ref={dropDownRef} className='type-select-btn-dropdown show'>
          <div className='type-select-btn-dropdown-item' onClick={() => handleItemClick('SMS')}>
            SMS
          </div>
          <div className='type-select-btn-dropdown-item' onClick={() => handleItemClick('LMS')}>
            LMS
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeSelectBtn;
