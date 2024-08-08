import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import './BillSelectBtn.css'; // CSS 파일 import
import { Select } from 'antd';

const BillSelectBtn = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();

  const handleChange = (value: string) => {
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, billCd: value });
        break;
      case '/mobile':
        setMobileData({ ...mobileData, billCd: value });
        break;
      case '/sms':
        setSMSData({ ...SMSData, billCd: value });
        break;
      case '/mms':
        setMMSData({ ...MMSData, billCd: value });
        break;
      default:
        break;
    }
  };

  const options = (() => {
    // locationBillCode를 항상 string[] 타입으로 설정합니다.
    let locationBillCode: string[] = [];
    switch (location.pathname) {
      case '/daily':
        locationBillCode = dailyData.selectedGroupBillCd ?? [];
        break;
      case '/mobile':
        locationBillCode = mobileData.selectedGroupBillCd ?? [];
        break;
      case '/sms':
        locationBillCode = SMSData.selectedGroupBillCd ?? [];
        break;
      case '/mms':
        locationBillCode = MMSData.selectedGroupBillCd ?? [];
        break;
      default:
        break;
    }

    // locationBillCode를 기반으로 options을 생성합니다.
    return locationBillCode.map((code) => ({
      value: code,
      label: code === '0' ? '전체' : code, // value가 0일 때 label을 '전체'로 설정
    }));
  })();

  const getValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.billCd;
      case '/mobile':
        return mobileData.billCd;
      case '/sms':
        return SMSData.billCd;
      case '/mms':
        return MMSData.billCd;
      default:
        return ''; // 기본값으로 빈 문자열 반환
    }
  };

  return <Select showSearch value={getValue()} placeholder='그룹을 선택해 주세요' onChange={handleChange} options={options} filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())} />;
};

export default BillSelectBtn;
