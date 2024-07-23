import { AxiosResponse } from 'axios';
import instance from '../../config/axiosInstance';

// Define the type of dailyData
interface DailyDataType {
  monthDate: Date;
  startDate: Date;
  endDate: Date;
  grpCd: string;
  billCd: string;
}

interface dailyItemData {
  type: string;
  monthSuccess: number;
  monthTotal: number;
  todaySuccess: number;
  todayTotal: number;
}

interface DataObject {
  [key: string]: dailyItemData[];
}

export const dailyMonthData = async ({ dailyData, setDailyData }: { dailyData: DailyDataType; setDailyData: Function }) => {
  const format = `${dailyData.monthDate.getFullYear()}${String(dailyData.monthDate.getMonth() + 1).padStart(2, '0')}`;
  const grpCd = dailyData.grpCd;
  const billCd = dailyData.billCd;
  const monthSendDate = { groupCode: grpCd, billCode: billCd, type: 'O', fileName: [format] };
  const response: AxiosResponse = await instance.post(`/reports/today`, monthSendDate);
  const responseData = response.data[0] || [];
  setDailyData({ ...dailyData, monthAxiosData: responseData });
};

export const dailyDayData = async ({ dailyData, setDailyData }: { dailyData: DailyDataType; setDailyData: Function }) => {
  const startYear = dailyData.startDate.getFullYear();
  const endYear = dailyData.endDate.getFullYear();
  const startMonth = dailyData.startDate.getMonth();
  const endMonth = dailyData.endDate.getMonth();

  const months: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startMonth : 0;
    const end = year === endYear ? endMonth : 11;
    for (let month = start; month <= end; month++) {
      const formattedMonth = `${year}${String(month + 1).padStart(2, '0')}`;
      months.push(formattedMonth);
    }
  }
  const grpCd = dailyData.grpCd;
  const billCd = dailyData.billCd;
  const daySendData = { groupCode: grpCd, billCode: billCd, type: 'O', fileName: months };
  const response: AxiosResponse = await instance.post(`/reports/today`, daySendData);

  const formatStartDate = `${dailyData.startDate.getFullYear()}${String(dailyData.startDate.getMonth() + 1).padStart(2, '0')}${String(dailyData.startDate.getDate()).padStart(2, '0')}`;
  const formatEndDate = `${dailyData.endDate.getFullYear()}${String(dailyData.endDate.getMonth() + 1).padStart(2, '0')}${String(dailyData.endDate.getDate()).padStart(2, '0')}`;
  const filteredData = response.data.map((obj: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((key: string) => {
      if (key >= formatStartDate && key <= formatEndDate) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  });
  const mergeData = filteredData.reduce((result: DataObject, currentObject: DataObject) => {
    return Object.assign(result, currentObject);
  }, {});
  setDailyData({ ...dailyData, dayAxiosData: mergeData });
};
