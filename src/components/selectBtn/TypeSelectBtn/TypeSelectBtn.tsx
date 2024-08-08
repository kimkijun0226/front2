import { useLocation } from 'react-router-dom';
import './TypeSelectBtn.css'; // Import the CSS file
import useStore from '../../../store/Store';
import { Select } from 'antd';

const TypeSelectBtn: React.FC = () => {
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
        setDailyData({ ...dailyData, messageType: value });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, messageType: value });
        break;
      case '/sms':
        setSMSData({ ...SMSData, messageType: value });
        break;
      case '/mms':
        setMMSData({ ...MMSData, messageType: value });
        break;
      default:
        break;
    }
  };

  const options = [
    { value: 'SMS', label: 'SMS' },
    { value: 'MMS', label: 'MMS' },
  ];

  const getValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.messageType;
      case '/mobile':
        return mobileData.messageType;
      case '/sms':
        return SMSData.messageType;
      case '/mms':
        return MMSData.messageType;
      default:
        return ''; // 기본값으로 빈 문자열 반환
    }
  };

  return (
    <Select
      placeholder='타입을 선택해 주세요'
      onChange={handleChange}
      options={options}
      value={getValue()}
    />
  );
};

export default TypeSelectBtn;
