import { useLocation } from 'react-router-dom';
import './MonthDaySelectedBtn.css'; // Import the CSS file
import useStore from '../../../store/Store';
import { Select } from 'antd';

const MonthDaySelectedBtn = () => {
  const {
    dailyData,
    setDailyData,
    mobileData,
    setMobileData,
    SMSData,
    setSMSData,
    MMSData,
    setMMSData,
  } = useStore();
  const location = useLocation();

  const handleChange = (value: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, selectedDate: value });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, selectedDate: value });
        break;
      case '/sms':
        setSMSData({ ...SMSData, selectedDate: value });
        break;
      case '/mms':
        setMMSData({ ...MMSData, selectedDate: value });
        break;
      default:
        break;
    }
  };

  const options = [
    { value: '월별 통계', label: '월별 통계' },
    { value: '일별 통계', label: '일별 통계' },
  ];

  const getValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.selectedDate;
      case '/mobile':
        return mobileData.selectedDate;
      case '/sms':
        return SMSData.selectedDate;
      case '/mms':
        return MMSData.selectedDate;
      default:
        return ''; // 기본값으로 빈 문자열 반환
    }
  };

  return (
    <Select
      placeholder='통계를 선택해 주세요'
      onChange={handleChange}
      options={options}
      value={getValue()}
    />
  );
};

export default MonthDaySelectedBtn;
