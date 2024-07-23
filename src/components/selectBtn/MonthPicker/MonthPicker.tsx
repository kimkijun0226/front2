import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MonthPicker.css'; // Import the CSS file

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
    setSelectedMonth(MonthValue());
  }, [location.pathname, dailyData.monthDate, mobileData.monthDate, SMSData.monthDate, MMSData.monthDate]);

  // Handler for month change
  const monthChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      switch (location.pathname) {
        case '/daily':
          return setDailyData({ ...dailyData, monthDate: value.toDate() });
        case '/mobile':
          return setMobileData({ ...mobileData, monthDate: value.toDate() });
        case '/sms':
          return setSMSData({ ...SMSData, monthDate: value.toDate() });
        case '/mms':
          return setMMSData({ ...MMSData, monthDate: value.toDate() });
      }
    }
  };

  return (
    <div className='month-picker-container'>
      <div className='month-picker-flex'>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label='원하는 달을 선택해주세요'
              value={dayjs(selectedMonth)}
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
              format={'YYYY / MM'}
              onChange={monthChange}
              openTo='month'
              views={['year', 'month']}
              className='date-picker' // Apply any additional styles if needed
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default MonthPicker;
