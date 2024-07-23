import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx-js-style';
import DailyExcel from '../../daily/DailyExcel';
import MobileExcel from '../../mobile/MobileExcel';
import SMSExcel from '../../sms/SMSExcel';
import MMSExcel from '../../mms/MMSExcel';
import useStore from '../../../store/Store';
import './ExcelBtn.css'; // Import the CSS file

const ExcelBtn = () => {
  const { dailyData, mobileData, SMSData, MMSData } = useStore();
  const location = useLocation();

  // Data download handler
  const handleDownloadExcel = () => {
    let dataToUse = null;
    let fileName = '';
    let service = '';

    switch (location.pathname) {
      case '/daily':
        if (dailyData.selectedDate === '일별 통계') {
          dataToUse = [dailyData.dayAxiosData];
          fileName = 'DAILY_Data.xlsx';
          service = '일별보고자료';
        } else if (dailyData.selectedDate === '월별 통계') {
          dataToUse = [dailyData.monthAxiosData];
          fileName = 'DAILY_Data.xlsx';
          service = '일별보고자료';
        }
        break;

      case '/mobile':
        if (mobileData.selectedDate === '일별 통계') {
          dataToUse = [mobileData.dayAxiosData];
          fileName = 'MOBILE_Data.xlsx';
          service = '이통사별 전송 건수';
        } else if (mobileData.selectedDate === '월별 통계') {
          dataToUse = [mobileData.monthAxiosData];
          fileName = 'MOBILE_Data.xlsx';
          service = '이통사별 전송 건수';
        }
        break;

      case '/sms':
        if (SMSData.selectedDate === '일별 통계') {
          dataToUse = SMSData.dayAxiosData;
          fileName = 'SMS_Data.xlsx';
          service = 'SMS';
        } else if (SMSData.selectedDate === '월별 통계') {
          dataToUse = SMSData.monthAxiosData;
          fileName = 'SMS_Data.xlsx';
          service = 'SMS';
        }
        break;

      case '/mms':
        if (MMSData.selectedDate === '일별 통계') {
          dataToUse = MMSData.dayAxiosData;
          fileName = 'MMS_Data.xlsx';
          service = 'MMS';
        } else if (MMSData.selectedDate === '월별 통계') {
          dataToUse = MMSData.monthAxiosData;
          fileName = 'MMS_Data.xlsx';
          service = 'MMS';
        }
        break;

      default:
        break;
    }

    if (dataToUse) {
      console.log(dataToUse);
      const workbook = XLSX.utils.book_new();
      let worksheet;
      switch (location.pathname) {
        case '/daily':
          worksheet = DailyExcel({ dataToUse });
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          XLSX.writeFile(workbook, fileName);
          break;
        case '/mobile':
          worksheet = MobileExcel({ dataToUse });
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          XLSX.writeFile(workbook, fileName);
          break;
        case '/sms':
          worksheet = SMSExcel({ dataToUse, service, SMSData });
          XLSX.utils.book_append_sheet(workbook, worksheet);
          XLSX.writeFile(workbook, fileName);
          break;
        case '/mms':
          worksheet = MMSExcel({ dataToUse, service, MMSData });
          XLSX.utils.book_append_sheet(workbook, worksheet);
          XLSX.writeFile(workbook, fileName);
          break;
      }
    }
  };

  return location.pathname === '/daily' || location.pathname === '/mobile' || location.pathname === '/sms' || location.pathname === '/mms' ? (
    <div className='excel-btn-container'>
      <button onClick={handleDownloadExcel} className='excel-btn'>
        <div className='excel-btn-text'>Excel</div>
      </button>
    </div>
  ) : null;
};

export default ExcelBtn;
