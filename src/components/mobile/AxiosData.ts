import { AxiosResponse } from 'axios';
import instance from '../../config/axiosInstance';

// Define the type of dailyData
interface DailyDataType {
  monthDate: Date;
  startDate: Date;
  endDate: Date;
  grpCd: string;
  billCd: string;
  whatTime: string;
  messageType: string;
}

interface mobileItemData {
  provider: string;
  successCount: number;
  totalCount: number;
}

interface DataObject {
  [key: string]: mobileItemData[];
}

export const mobileMonthData = async ({ mobileData, setMobileData }: { mobileData: DailyDataType; setMobileData: Function }) => {
  const format = `${mobileData.monthDate.getFullYear()}${String(mobileData.monthDate.getMonth() + 1).padStart(2, '0')}`;
  const grpCd = mobileData.grpCd;
  const billCd = mobileData.billCd;
  const TimeSelect = mobileData.whatTime === '17' ? 'O' : 'P';
  const messageType = mobileData.messageType === 'SMS' ? 'S' : 'L';

  const monthSendDate = { groupCode: grpCd, billCode: billCd, type: messageType + TimeSelect, fileName: [format] };
  const response: AxiosResponse = await instance.post(`/reports/provider`, monthSendDate);
  const responseData = response.data[0] || [];
  console.log(responseData);
  setMobileData({ ...mobileData, monthAxiosData: responseData });
};

export const mobileDayData = async ({ mobileData, setMobileData }: { mobileData: DailyDataType; setMobileData: Function }) => {
  const startYear = mobileData.startDate.getFullYear();
  const endYear = mobileData.endDate.getFullYear();
  const startMonth = mobileData.startDate.getMonth();
  const endMonth = mobileData.endDate.getMonth();

  const months: string[] = [];
  for (let year = startYear; year <= endYear; year++) {
    const start = year === startYear ? startMonth : 0;
    const end = year === endYear ? endMonth : 11;
    for (let month = start; month <= end; month++) {
      const formattedMonth = `${year}${String(month + 1).padStart(2, '0')}`;
      months.push(formattedMonth);
    }
  }

  const grpCd = mobileData.grpCd;
  const billCd = mobileData.billCd;
  const TimeSelect = mobileData.whatTime === '17' ? 'O' : 'P';
  const messageType = mobileData.messageType === 'SMS' ? 'S' : 'L';

  const daySendData = { groupCode: grpCd, billCode: billCd, type: messageType + TimeSelect, fileName: months };
  const response: AxiosResponse = await instance.post(`/reports/provider`, daySendData);
  console.log(response.data, 'dfkjghsdkhfksdahf123');

  const formatStartDate = `${mobileData.startDate.getFullYear()}${String(mobileData.startDate.getMonth() + 1).padStart(2, '0')}${String(mobileData.startDate.getDate()).padStart(2, '0')}`;
  const formatEndDate = `${mobileData.endDate.getFullYear()}${String(mobileData.endDate.getMonth() + 1).padStart(2, '0')}${String(mobileData.endDate.getDate()).padStart(2, '0')}`;

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
  setMobileData({ ...mobileData, dayAxiosData: mergeData });
};
