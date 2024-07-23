import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import { dailyMonthData, dailyDayData } from '../../daily/AxiosData';
import { mobileMonthData, mobileDayData } from '../../mobile/AxiosData';
import { smsMonthData, smsDayData } from '../../sms/AxiosData';
import { mmsMonthData, mmsDayData } from '../../mms/AxiosData';

import './SearchBtn.css'; // Import the CSS file

const SearchBtn: React.FC = () => {
  const location = useLocation();
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();

  const fetchAxiosData = async () => {
    switch (location.pathname) {
      case '/daily':
        if (dailyData.selectedDate === '월별 통계') {
          dailyMonthData({ dailyData, setDailyData });
        } else if (dailyData.selectedDate === '일별 통계') {
          dailyDayData({ dailyData, setDailyData });
        }
        break;
      case '/mobile':
        if (mobileData.selectedDate === '월별 통계') {
          mobileMonthData({ mobileData, setMobileData });
        } else if (mobileData.selectedDate === '일별 통계') {
          mobileDayData({ mobileData, setMobileData });
        }
        break;
      case '/sms':
        if (SMSData.selectedDate === '월별 통계') {
          smsMonthData({ SMSData, setSMSData });
        } else if (SMSData.selectedDate === '일별 통계') {
          smsDayData({ SMSData, setSMSData });
        }
        break;
      case '/mms':
        if (MMSData.selectedDate === '월별 통계') {
          mmsMonthData({ MMSData, setMMSData });
        } else if (MMSData.selectedDate === '일별 통계') {
          mmsDayData({ MMSData, setMMSData });
        }
        break;
    }
  };

  const handleButtonClick = () => {
    fetchAxiosData();
  };

  return (
    <div className='search-btn-container'>
      <button onClick={handleButtonClick} className='search-btn'>
        조회
      </button>
    </div>
  );
};

export default SearchBtn;
