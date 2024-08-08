import React, { useEffect, useState } from 'react';
import useStore from '../../store/Store';
import dayjs from 'dayjs';
import './DailyTable.css'; // CSS 파일을 임포트합니다.

interface Item {
  date: string;
  smsTotal: number;
  smsSuccess: number;
  smsMonthTotal: number;
  smsMonthSuccess: number;
  lmsTotal: number;
  lmsSuccess: number;
  lmsMonthTotal: number;
  lmsMonthSuccess: number;
}

const DailyTable: React.FC = () => {
  const { dailyData } = useStore(); // 데일리 테이블데이터 (일별 또는 월별 데이터가 들어옴)
  const [monthItems, setMonthItems] = useState<Item[]>([]);
  const [dayItems, setDayItems] = useState<Item[]>([]);

  useEffect(() => {
    dailyData.dayAxiosData = {};
    dailyData.monthAxiosData = {};
  }, []);

  useEffect(() => {
    const formatMonthData = Object.entries(dailyData.monthAxiosData).map(([date, data]) => {
      const smsData = (data as any[]).find((item: any) => item.type === 'SMS');
      const lmsData = (data as any[]).find((item: any) => item.type === 'LMS');

      return {
        date: date,
        smsTotal: smsData?.todayTotal && Number(smsData?.todayTotal), // 숫자로 변환
        smsSuccess: smsData?.todaySuccess && Number(smsData?.todaySuccess), // 숫자로 변환
        smsMonthTotal: smsData?.monthTotal && Number(smsData?.monthTotal), // 숫자로 변환
        smsMonthSuccess: smsData?.monthSuccess && Number(smsData?.monthSuccess), // 숫자로 변환

        lmsTotal: lmsData?.todayTotal && Number(lmsData.todayTotal),
        lmsSuccess: lmsData?.todaySuccess && Number(lmsData.todaySuccess),
        lmsMonthTotal: lmsData?.monthTotal && Number(lmsData.monthTotal),
        lmsMonthSuccess: lmsData?.monthSuccess && Number(lmsData.monthSuccess),
      };
    });
    setMonthItems(formatMonthData);
  }, [dailyData.monthAxiosData]);

  useEffect(() => {
    const formatDayData = Object.entries(dailyData.dayAxiosData).map(([date, data]) => {
      const smsData = (data as any[]).find((item: any) => item.type === 'SMS');
      const lmsData = (data as any[]).find((item: any) => item.type === 'LMS');

      return {
        date: date,
        smsTotal: smsData?.todayTotal && Number(smsData?.todayTotal), // 숫자로 변환
        smsSuccess: smsData?.todaySuccess && Number(smsData?.todaySuccess), // 숫자로 변환
        smsMonthTotal: smsData?.monthTotal && Number(smsData?.monthTotal), // 숫자로 변환
        smsMonthSuccess: smsData?.monthSuccess && Number(smsData?.monthSuccess), // 숫자로 변환

        lmsTotal: lmsData?.todayTotal && Number(lmsData.todayTotal),
        lmsSuccess: lmsData?.todaySuccess && Number(lmsData.todaySuccess),
        lmsMonthTotal: lmsData?.monthTotal && Number(lmsData.monthTotal),
        lmsMonthSuccess: lmsData?.monthSuccess && Number(lmsData.monthSuccess),
      };
    });
    setDayItems(formatDayData);
  }, [dailyData.dayAxiosData]);

  return (
    <div className='daily-table-container'>
      <div className='daily-table-header'>
        <div className='daily-table-header-row'>
          <div className='daily-table-header-title'>날짜별 발송 건수</div>

          <div className='daily-table-header-main'>
            <div className='daily-table-header-main-title'>차세대</div>

            <div className='daily-table-header-main-content'>
              <div className='daily-table-header-main-sub'>
                <div className='daily-table-header-main-sub-title'>발송 기준</div>
                <div className='daily-table-header-main-sub-list'>
                  <div className='daily-table-header-main-sub-list-item'>SMS</div>
                  <div className='daily-table-header-main-sub-list-item'>LMS</div>
                </div>
              </div>

              <div className='daily-table-header-main-sub'>
                <div className='daily-table-header-main-sub-title'>성공 기준</div>
                <div className='daily-table-header-main-sub-list'>
                  <div className='daily-table-header-main-sub-list-item'>SMS</div>
                  <div className='daily-table-header-main-sub-list-item'>LMS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='daily-table-body'>
        {dailyData.selectedDate === '월별 통계'
          ? monthItems.map((item, index) => (
              <div key={index} className={`daily-table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <div className='daily-table-row-date'>
                  <div className='daily-table-row-date-item'>{dayjs(item.date).format('YYYY-MM-DD')}</div>
                  <div className='daily-table-row-date-section'>
                    <div className='daily-table-row-date-section-title'>일별</div>
                    <div className='daily-table-row-date-section-title'>월 누적</div>
                  </div>
                </div>
                <div className='daily-table-row-data'>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.smsTotal.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.smsMonthTotal.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.lmsTotal.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.lmsMonthTotal.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.smsSuccess.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.smsMonthSuccess.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.lmsSuccess.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.lmsMonthSuccess.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))
          : dayItems.map((item, index) => (
              <div key={index} className={`daily-table-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <div className='daily-table-row-date'>
                  <div className='daily-table-row-date-item'>{dayjs(item.date).format('YYYY-MM-DD')}</div>
                  <div className='daily-table-row-date-section'>
                    <div className='daily-table-row-date-section-title'>일별</div>
                    <div className='daily-table-row-date-section-title'>월 누적</div>
                  </div>
                </div>
                <div className='daily-table-row-data'>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.smsTotal.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.smsMonthTotal.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.lmsTotal.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.lmsMonthTotal.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.smsSuccess.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.smsMonthSuccess.toLocaleString()}</div>
                  </div>
                  <div className='daily-table-row-data-section'>
                    <div className='daily-table-row-data-item'>{item.lmsSuccess.toLocaleString()}</div>
                    <div className='daily-table-row-data-item'>{item.lmsMonthSuccess.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DailyTable;
