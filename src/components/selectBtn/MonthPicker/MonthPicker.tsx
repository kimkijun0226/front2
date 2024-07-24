import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import 'antd/dist/reset.css'; // Import AntD styles
import './MonthPicker.css'; // Import the CSS file
import locale from 'antd/lib/locale/ko_KR';

import { ConfigProvider } from 'antd';
import { DatePicker } from 'antd';

const MonthPicker = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();

  // Get the current month value based on the location pathname
  const MonthValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.monthDate;
      case '/mobile':
        return mobileData.monthDate;
      case '/sms':
        return SMSData.monthDate;
      case '/mms':
        return MMSData.monthDate;
      default:
        return '';
    }
  };

  const [selectedMonth, setSelectedMonth] = useState(MonthValue());

  useEffect(() => {
    console.log(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    setSelectedMonth(MonthValue());
  }, [location.pathname, dailyData.monthDate, mobileData.monthDate, SMSData.monthDate, MMSData.monthDate]);

  // Handler for month change
  const monthChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      switch (location.pathname) {
        case '/daily':
          setDailyData({ ...dailyData, monthDate: date.toDate() });
          break;
        case '/mobile':
          setMobileData({ ...mobileData, monthDate: date.toDate() });
          break;
        case '/sms':
          setSMSData({ ...SMSData, monthDate: date.toDate() });
          break;
        case '/mms':
          setMMSData({ ...MMSData, monthDate: date.toDate() });
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className='month-picker-container'>
      <div className='month-picker-flex'>
        <ConfigProvider locale={locale}>
          <DatePicker
            picker='month'
            value={selectedMonth ? dayjs(selectedMonth) : null}
            onChange={monthChange}
            format='YYYY / MM'
            className='date-picker' // Apply any additional styles if needed
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default MonthPicker;
