import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DayPicker.css'; // Import the CSS file

const DayPicker: React.FC = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();

  // Handler for start date change
  const handleStartDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
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
  const handleEndDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
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

  return (
    <div className='day-picker-container'>
      <div className='day-picker-flex'>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label='시작 날짜를 선택해주세요'
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              format={'YYYY / MM / DD'}
              value={dayjs(startValue)}
              onChange={handleStartDateChange}
              openTo='day'
              views={['year', 'month', 'day']}
              className='date-picker' // Apply any additional styles if needed
            />
            <p>~</p>
            <DatePicker
              label='종료 날짜를 선택해주세요'
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              format={'YYYY / MM / DD'}
              value={dayjs(endValue)}
              onChange={handleEndDateChange}
              openTo='day'
              views={['year', 'month', 'day']}
              className='date-picker' // Apply any additional styles if needed
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DayPicker;
