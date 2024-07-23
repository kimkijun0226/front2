import useStore from '../../../store/Store';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TimeSelectBtn.css'; // Import the CSS file

const TimeSelectBtn = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // 드롭다운 메뉴를 표시할 상태 추가

  const handleItemClick = (item: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, whatTime: item });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, whatTime: item });
        break;
      case '/sms':
        setSMSData({ ...SMSData, whatTime: item });
        break;
      case '/mms':
        setMMSData({ ...MMSData, whatTime: item });
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
    <div ref={inputRef} className='time-select-container'>
      <div className='time-select-label'>시간 선택</div>
      <button onClick={() => setShowMenu(!showMenu)} className='time-select-button'>
        <>
          <span>{location.pathname === '/daily' ? `${dailyData.whatTime}시 기준` : location.pathname === '/mobile' ? `${mobileData.whatTime}시 기준` : location.pathname === '/sms' ? `${SMSData.whatTime}시 기준` : location.pathname === '/mms' ? `${MMSData.whatTime}시 기준` : '17시'}</span>

          <svg className={`arrow ${showMenu ? 'rotate' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </>
      </button>
      {showMenu && (
        <div ref={dropDownRef} className='time-select-menu'>
          {location.pathname === '/mobile' || location.pathname === '/daily' ? (
            <div className='time-select-menu-item' onClick={() => handleItemClick('17')}>
              17시 기준
            </div>
          ) : null}

          {location.pathname === '/mobile' || location.pathname === '/sms' || location.pathname === '/mms' ? (
            <div className='time-select-menu-item' onClick={() => handleItemClick('24')}>
              24시 기준
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TimeSelectBtn;
