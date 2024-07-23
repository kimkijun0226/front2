import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MonthDaySelectedBtn.css'; // Import the CSS file
import useStore from '../../../store/Store';

const MonthDaySelectedBtn = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false); // 드롭다운 메뉴를 표시할 상태 추가

  const handleItemClick = (item: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, selectedDate: item });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, selectedDate: item });
        break;
      case '/sms':
        setSMSData({ ...SMSData, selectedDate: item });
        break;
      case '/mms':
        setMMSData({ ...MMSData, selectedDate: item });
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
    <div ref={inputRef} className='month-day-select-container'>
      <div className='month-day-select-label'>통계 선택</div>
      <button onClick={() => setShowMenu(!showMenu)} className='month-day-select-button'>
        <>
          <span>{location.pathname === '/daily' ? dailyData.selectedDate : location.pathname === '/mobile' ? mobileData.selectedDate : location.pathname === '/sms' ? SMSData.selectedDate : location.pathname === '/mms' ? MMSData.selectedDate : '월별 통계'}</span>
          <svg className={`arrow ${showMenu ? 'rotate' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
          </svg>
        </>
      </button>
      {showMenu && (
        <div ref={dropDownRef} className='month-day-select-menu'>
          <div className='month-day-select-menu-item' onClick={() => handleItemClick('월별 통계')}>
            월별 통계
          </div>
          <div className='month-day-select-menu-item' onClick={() => handleItemClick('일별 통계')}>
            일별 통계
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthDaySelectedBtn;
