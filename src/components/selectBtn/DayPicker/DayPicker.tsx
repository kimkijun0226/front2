import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../../../store/Store';

import { DatePicker } from 'antd';

import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
const { RangePicker } = DatePicker;

dayjs.extend(weekday);
dayjs.extend(localeData);

const DayPicker: React.FC = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();

  // Get default values for start and end dates
  const dayStartValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.startDate;
      case '/mobile':
        return mobileData.startDate;
      case '/sms':
        return SMSData.startDate;
      case '/mms':
        return MMSData.startDate;
      default:
        return '';
    }
  };

  const dayEndValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.endDate;
      case '/mobile':
        return mobileData.endDate;
      case '/sms':
        return SMSData.endDate;
      case '/mms':
        return MMSData.endDate;
      default:
        return '';
    }
  };

  const [startValue, setStartValue] = useState(dayStartValue());
  const [endValue, setEndValue] = useState(dayEndValue());

  useEffect(() => {
    setStartValue(dayStartValue());
  }, [location.pathname, dailyData.startDate, mobileData.startDate, SMSData.startDate, MMSData.startDate]);

  useEffect(() => {
    setEndValue(dayEndValue());
  }, [location.pathname, dailyData.endDate, mobileData.endDate, SMSData.endDate, MMSData.endDate]);

  // Handler for start date change
  const handleStartDateChange = (value: Dayjs | null) => {
    if (value !== null && value !== undefined) {
      switch (location.pathname) {
        case '/daily':
          setDailyData({ ...dailyData, startDate: value.toDate() });
          break;
        case '/mobile':
          setMobileData({ ...mobileData, startDate: value.toDate() });
          break;
        case '/sms':
          setSMSData({ ...SMSData, startDate: value.toDate() });
          break;
        case '/mms':
          setMMSData({ ...MMSData, startDate: value.toDate() });
          break;
      }
    }
  };

  // Handler for end date change
  const handleEndDateChange = (value: Dayjs | null) => {
    if (value !== null && value !== undefined) {
      switch (location.pathname) {
        case '/daily':
          setDailyData({ ...dailyData, endDate: value.toDate() });
          break;
        case '/mobile':
          setMobileData({ ...mobileData, endDate: value.toDate() });
          break;
        case '/sms':
          setSMSData({ ...SMSData, endDate: value.toDate() });
          break;
        case '/mms':
          setMMSData({ ...MMSData, endDate: value.toDate() });
          break;
      }
    }
  };

  useEffect(() => {
    console.log(startValue);
    console.log(dayjs(startValue));
    console.log(endValue);
  }, [startValue, endValue]);

  return (
    <div className='day-picker-container'>
      <div className='day-picker-flex'>
        <RangePicker
          format='YYYY-MM-DD'
          defaultValue={[startValue ? dayjs(startValue) : null, endValue ? dayjs(endValue) : null]}
          onChange={(value) => {
            handleStartDateChange(value && value[0] ? value[0] : null);
            handleEndDateChange(value && value[1] ? value[1] : null);
          }}
        />
      </div>
    </div>
  );
};

export default DayPicker;
