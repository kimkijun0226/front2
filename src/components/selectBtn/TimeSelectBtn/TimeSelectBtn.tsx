import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import './TimeSelectBtn.css'; // Import the CSS file
import { Select } from 'antd';

const TimeSelectBtn = () => {
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

  const options = [
    { value: '17', label: '17시 기준' },
    { value: '24', label: '24시 기준' },
  ].filter(
    (option) =>
      (location.pathname === '/mobile' && (option.value === '17' || option.value === '24')) ||
      (location.pathname === '/daily' && option.value === '17') ||
      ((location.pathname === '/sms' || location.pathname === '/mms') && option.value === '24')
  );

  const handleChange = (value: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, whatTime: value });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, whatTime: value });
        break;
      case '/sms':
        setSMSData({ ...SMSData, whatTime: value });
        break;
      case '/mms':
        setMMSData({ ...MMSData, whatTime: value });
        break;
      default:
        break;
    }
  };

  const getValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.whatTime;
      case '/mobile':
        return mobileData.whatTime;
      case '/sms':
        return SMSData.whatTime;
      case '/mms':
        return MMSData.whatTime;
      default:
        return ''; // 기본값으로 빈 문자열 반환
    }
  };

  return (
    <Select
      placeholder='시간을 선택해 주세요'
      value={getValue()}
      onChange={handleChange}
      options={options}
    />
  );
};

export default TimeSelectBtn;
