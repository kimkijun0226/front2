import { useEffect, useRef, useState } from 'react';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import instance from '../../../config/axiosInstance';
import './BillSelectBtn.css'; // CSS 파일 import

interface Group {
  name: string;
  grpCd: string;
  BillCode: string[];
}

const BillSelectBtn = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const location = useLocation();

  useEffect(() => {
    const axiosGroup = async (): Promise<void> => {
      try {
        const response = await instance.get('/groupCode');
        console.log(response.data, '123123123');
        const transformedGroups: Group[] = response.data.map((group: Record<string, any>) => {
          const [grpCd, [name, ...BillCode]] = Object.entries(group)[0];
          return { name, grpCd, BillCode };
        });
        setGroups(transformedGroups);
      } catch (error) {
        console.error('Error fetching group codes:', error);
      }
    };

    axiosGroup();
  }, []);

  const handleGroupChange = (bill: string) => {
    switch (location.pathname) {
      case '/daily': {
        const dailyGroup = groups.find((group) => group.grpCd === dailyData.grpCd);
        if (dailyGroup) {
          setDailyData({ ...dailyData, billCd: dailyGroup.BillCode.includes(bill) ? bill : dailyGroup.BillCode[0] });
        }
        break;
      }
      case '/mobile': {
        const mobileGroup = groups.find((group) => group.grpCd === mobileData.grpCd);
        if (mobileGroup) {
          setMobileData({ ...mobileData, billCd: mobileGroup.BillCode.includes(bill) ? bill : mobileGroup.BillCode[0] });
        }
        break;
      }
      case '/sms': {
        const smsGroup = groups.find((group) => group.grpCd === SMSData.grpCd);
        if (smsGroup) {
          setSMSData({ ...SMSData, billCd: smsGroup.BillCode.includes(bill) ? bill : smsGroup.BillCode[0] });
        }
        break;
      }
      case '/mms': {
        const mmsGroup = groups.find((group) => group.grpCd === MMSData.grpCd);
        if (mmsGroup) {
          setMMSData({ ...MMSData, billCd: mmsGroup.BillCode.includes(bill) ? bill : mmsGroup.BillCode[0] });
        }
        break;
      }
      default:
        break;
    }
    setShowOptions(false);
  };

  const inputRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node) && !dropDownRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [inputRef, dropDownRef]);

  useEffect(() => {
    switch (location.pathname) {
      case '/daily': {
        if (groups.length > 0) {
          const dailyGroup = groups.find((group) => group.grpCd === dailyData.grpCd);
          if (dailyGroup) {
            setDailyData({ ...dailyData, billCd: dailyGroup.BillCode[0] });
          }
        }
        break;
      }
      case '/mobile': {
        if (groups.length > 0) {
          const mobileGroup = groups.find((group) => group.grpCd === mobileData.grpCd);
          if (mobileGroup) {
            setMobileData({ ...mobileData, billCd: mobileGroup.BillCode[0] });
          }
        }
        break;
      }
      case '/sms': {
        if (groups.length > 0) {
          const smsGroup = groups.find((group) => group.grpCd === SMSData.grpCd);
          if (smsGroup) {
            setSMSData({ ...SMSData, billCd: smsGroup.BillCode[0] });
          }
        }
        break;
      }
      case '/mms': {
        if (groups.length > 0) {
          const mmsGroup = groups.find((group) => group.grpCd === MMSData.grpCd);
          if (mmsGroup) {
            setMMSData({ ...MMSData, billCd: mmsGroup.BillCode[0] });
          }
        }
        break;
      }
      default:
        break;
    }
  }, [groups, location.pathname, dailyData.grpCd, mobileData.grpCd, SMSData.grpCd, MMSData.grpCd]);

  return (
    <div ref={inputRef} className='bill-select-container'>
      <div className='bill-select-label'>부서 선택</div>
      <button onClick={() => setShowOptions(!showOptions)} className={`bill-select-button ${showOptions ? 'rotate' : ''}`} type='button' aria-haspopup='true' aria-expanded={showOptions ? 'true' : 'false'}>
        {(() => {
          switch (location.pathname) {
            case '/daily': {
              const dailyGroup = groups.find((group) => group.grpCd === dailyData.grpCd);
              return dailyGroup ? (dailyData.billCd === '0' ? '전체' : dailyGroup.BillCode.includes(dailyData.billCd) ? dailyData.billCd : dailyGroup.BillCode[0]) : '';
            }
            case '/mobile': {
              const mobileGroup = groups.find((group) => group.grpCd === mobileData.grpCd);
              return mobileGroup ? (mobileData.billCd === '0' ? '전체' : mobileGroup.BillCode.includes(mobileData.billCd) ? mobileData.billCd : mobileGroup.BillCode[0]) : '';
            }
            case '/sms': {
              const smsGroup = groups.find((group) => group.grpCd === SMSData.grpCd);
              return smsGroup ? (SMSData.billCd === '0' ? '전체' : smsGroup.BillCode.includes(SMSData.billCd) ? SMSData.billCd : smsGroup.BillCode[0]) : '';
            }
            case '/mms': {
              const mmsGroup = groups.find((group) => group.grpCd === MMSData.grpCd);
              return mmsGroup ? (MMSData.billCd === '0' ? '전체' : mmsGroup.BillCode.includes(MMSData.billCd) ? MMSData.billCd : mmsGroup.BillCode[0]) : '';
            }
            default:
              return '';
          }
        })()}
        <svg className={`arrow ${showOptions ? 'rotate' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>

      {showOptions && (
        <div ref={dropDownRef} className='bill-select-options' role='menu' aria-orientation='vertical' aria-labelledby='dropdownDefaultButton'>
          {(() => {
            switch (location.pathname) {
              case '/daily': {
                const dailyGroup = groups.find((group) => group.grpCd === dailyData.grpCd);
                return dailyGroup
                  ? dailyGroup.BillCode.map((bill) => (
                      <a key={bill} href='#' onClick={() => handleGroupChange(bill)} className='bill-option'>
                        {bill === '0' ? '전체' : bill}
                      </a>
                    ))
                  : null;
              }
              case '/mobile': {
                const mobileGroup = groups.find((group) => group.grpCd === mobileData.grpCd);
                return mobileGroup
                  ? mobileGroup.BillCode.map((bill) => (
                      <a key={bill} href='#' onClick={() => handleGroupChange(bill)} className='bill-option'>
                        {bill === '0' ? '전체' : bill}
                      </a>
                    ))
                  : null;
              }
              case '/sms': {
                const smsGroup = groups.find((group) => group.grpCd === SMSData.grpCd);
                return smsGroup
                  ? smsGroup.BillCode.map((bill) => (
                      <a key={bill} href='#' onClick={() => handleGroupChange(bill)} className='bill-option'>
                        {bill === '0' ? '전체' : bill}
                      </a>
                    ))
                  : null;
              }
              case '/mms': {
                const mmsGroup = groups.find((group) => group.grpCd === MMSData.grpCd);
                return mmsGroup
                  ? mmsGroup.BillCode.map((bill) => (
                      <a key={bill} href='#' onClick={() => handleGroupChange(bill)} className='bill-option'>
                        {bill === '0' ? '전체' : bill}
                      </a>
                    ))
                  : null;
              }
              default:
                return null;
            }
          })()}
        </div>
      )}
    </div>
  );
};

export default BillSelectBtn;
