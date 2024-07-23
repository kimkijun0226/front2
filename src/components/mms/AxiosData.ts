import { AxiosResponse } from 'axios';
import instance from '../../config/axiosInstance';

interface DailyDataType {
  monthDate: Date;
  startDate: Date;
  endDate: Date;
  grpCd: string;
  billCd: string;
}
export const mmsMonthData = async ({ MMSData, setMMSData }: { MMSData: DailyDataType; setMMSData: Function }) => {
  const format = `${MMSData.monthDate.getFullYear()}${String(MMSData.monthDate.getMonth() + 1).padStart(2, '0')}`;
  const grpCd = MMSData.grpCd;
  const billCd = MMSData.billCd;

  const monthSendDate = { groupCode: grpCd, billCode: billCd, type: 'L', fileName: [format] };
  const response: AxiosResponse = await instance.post(`/reports/data`, monthSendDate);
  setMMSData({ ...MMSData, monthAxiosData: response.data });
};

export const mmsDayData = async ({ MMSData, setMMSData }: { MMSData: DailyDataType; setMMSData: Function }) => {
  const startYear = MMSData.startDate.getFullYear();
  const endYear = MMSData.endDate.getFullYear();
  const startMonth = MMSData.startDate.getMonth();
  const endMonth = MMSData.endDate.getMonth();

  const months: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startMonth : 0;
    const end = year === endYear ? endMonth : 11;
    for (let month = start; month <= end; month++) {
      const formattedMonth = `${year}${String(month + 1).padStart(2, '0')}`;
      months.push(formattedMonth);
    }
  }

  const grpCd = MMSData.grpCd;
  const billCd = MMSData.billCd;
  const daySendData = { groupCode: grpCd, billCode: billCd, type: 'L', fileName: months };
  const response: AxiosResponse = await instance.post(`/reports/data`, daySendData);
  console.log(response.data, '123123123');
  const formatStartDate = `${MMSData.startDate.getFullYear()}${String(MMSData.startDate.getMonth() + 1).padStart(2, '0')}${String(MMSData.startDate.getDate()).padStart(2, '0')}`;
  const formatEndDate = `${MMSData.endDate.getFullYear()}${String(MMSData.endDate.getMonth() + 1).padStart(2, '0')}${String(MMSData.endDate.getDate()).padStart(2, '0')}`;

  const filteredData = response.data.filter((item: { date: string }) => {
    const itemDate = item.date; // 데이터에서 날짜 필드를 확인해야 합니다. 이 예제에서는 'date' 필드로 가정합니다.
    return itemDate >= formatStartDate && itemDate <= formatEndDate;
  });
  setMMSData({ ...MMSData, dayAxiosData: filteredData });
};
