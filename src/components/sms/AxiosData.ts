import { AxiosResponse } from 'axios';
import instance from '../../config/axiosInstance';

interface DailyDataType {
  monthDate: Date;
  startDate: Date;
  endDate: Date;
  grpCd: string;
  billCd: string;
}

export const smsMonthData = async ({ SMSData, setSMSData }: { SMSData: DailyDataType; setSMSData: Function }) => {
  const format = `${SMSData.monthDate.getFullYear()}${String(SMSData.monthDate.getMonth() + 1).padStart(2, '0')}`;
  const grpCd = SMSData.grpCd;
  const billCd = SMSData.billCd;
  const monthSendDate = { groupCode: grpCd, billCode: billCd, type: 'S', fileName: [format] };
  const response: AxiosResponse = await instance.post(`/reports/data`, monthSendDate);
  setSMSData({ ...SMSData, monthAxiosData: response.data });
};

export const smsDayData = async ({ SMSData, setSMSData }: { SMSData: DailyDataType; setSMSData: Function }) => {
  const startYear = SMSData.startDate.getFullYear();
  const endYear = SMSData.endDate.getFullYear();
  const startMonth = SMSData.startDate.getMonth();
  const endMonth = SMSData.endDate.getMonth();

  const months: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startMonth : 0;
    const end = year === endYear ? endMonth : 11;
    for (let month = start; month <= end; month++) {
      const formattedMonth = `${year}${String(month + 1).padStart(2, '0')}`;
      months.push(formattedMonth);
    }
  }
  const grpCd = SMSData.grpCd;
  const billCd = SMSData.billCd;

  const daySendData = { groupCode: grpCd, billCode: billCd, type: 'S', fileName: months };
  const response: AxiosResponse = await instance.post(`/reports/data`, daySendData);
  const formatStartDate = `${SMSData.startDate.getFullYear()}${String(SMSData.startDate.getMonth() + 1).padStart(2, '0')}${String(SMSData.startDate.getDate()).padStart(2, '0')}`;
  const formatEndDate = `${SMSData.endDate.getFullYear()}${String(SMSData.endDate.getMonth() + 1).padStart(2, '0')}${String(SMSData.endDate.getDate()).padStart(2, '0')}`;

  const filteredData = response.data.filter((item: { date: string }) => {
    const itemDate = item.date; // 데이터에서 날짜 필드를 확인해야 합니다. 이 예제에서는 'date' 필드로 가정합니다.
    return itemDate >= formatStartDate && itemDate <= formatEndDate;
  });
  setSMSData({ ...SMSData, dayAxiosData: filteredData });
};
