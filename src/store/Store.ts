import { create } from 'zustand';
import dayjs from 'dayjs';

const dayDefaultDate = dayjs().subtract(1, 'month').startOf('month').toDate(); // 일별 조회 기본 값

interface dailyItemData {
  type: string;
  monthSuccess: number;
  monthTotal: number;
  todaySuccess: number;
  todayTotal: number;
}

interface mobileItemData {
  provider: string;
  successCount: number;
  totalCount: number;
}

interface mmsItemData {
  date: string;
  totalCount: number;
  successCount: number;
  failCount: number;
  nonSubscriber: number;
  percentage: number;
}

interface smsItemData {
  date: string;
  totalCount: number;
  successCount: number;
  failCount: number;
  nonSubscriber: number;
  percentage: number;
}

interface useStore {
  dailyData: {
    grpCd: string;
    billCd: string;

    selectedDate: string; // 월별 일별

    monthDate: Date; // 월별 날짜

    startDate: Date; // 일별 시작 날짜
    endDate: Date; // 일별 종료 날짜

    whatTime: string; // 17시 & 24시 기준 선택
    messageType: string;

    monthAxiosData: { [key: string]: dailyItemData[] }; // 월별 데이터
    dayAxiosData: { [key: string]: dailyItemData[] }; // 일별 데이터
  };

  setDailyData: (data: { grpCd: string; billCd: string; selectedDate: string; monthDate: Date; startDate: Date; endDate: Date; whatTime: string; messageType: string; monthAxiosData: { [key: string]: dailyItemData[] }; dayAxiosData: { [key: string]: dailyItemData[] } }) => void;

  mobileData: {
    grpCd: string;
    billCd: string;

    selectedDate: string; // 월별 일별

    monthDate: Date; // 월별 날짜

    startDate: Date; // 일별 시작 날짜
    endDate: Date; // 일별 종료 날짜

    whatTime: string; // 17시 & 24시 기준 선택
    messageType: string;

    mobile: string;

    monthAxiosData: { [key: string]: mobileItemData[] }; // 월별 데이터
    dayAxiosData: { [key: string]: mobileItemData[] }; // 일별 데이터
  };
  setMobileData: (data: { grpCd: string; billCd: string; selectedDate: string; monthDate: Date; startDate: Date; endDate: Date; whatTime: string; messageType: string; mobile: string; monthAxiosData: { [key: string]: mobileItemData[] }; dayAxiosData: { [key: string]: mobileItemData[] } }) => void;

  SMSData: {
    grpCd: string;
    billCd: string;

    selectedDate: string; // 월별 일별

    monthDate: Date; // 월별 날짜

    startDate: Date; // 일별 시작 날짜
    endDate: Date; // 일별 종료 날짜

    whatTime: string; // 17시 & 24시 기준 선택
    messageType: string;

    monthAxiosData: smsItemData[]; // 월별 데이터
    dayAxiosData: smsItemData[]; // 일별 데이터
  };
  setSMSData: (data: { grpCd: string; billCd: string; selectedDate: string; monthDate: Date; startDate: Date; endDate: Date; whatTime: string; messageType: string; monthAxiosData: smsItemData[]; dayAxiosData: smsItemData[] }) => void;

  MMSData: {
    grpCd: string;
    billCd: string;

    selectedDate: string; // 월별 일별

    monthDate: Date; // 월별 날짜

    startDate: Date; // 일별 시작 날짜
    endDate: Date; // 일별 종료 날짜

    whatTime: string; // 17시 & 24시 기준 선택
    messageType: string;

    monthAxiosData: mmsItemData[]; // 월별 데이터
    dayAxiosData: mmsItemData[]; // 일별 데이터
  };
  setMMSData: (data: { grpCd: string; billCd: string; selectedDate: string; monthDate: Date; startDate: Date; endDate: Date; whatTime: string; messageType: string; monthAxiosData: mmsItemData[]; dayAxiosData: mmsItemData[] }) => void;
}

// 데이터

const useStore = create<useStore>((set) => ({
  dailyData: {
    grpCd: '',
    billCd: '',

    selectedDate: '월별 통계', // 월별 일별

    monthDate: new Date(), // 월별 날짜, picker변경
    monthFormatDate: '', // 조회로 넘겨줄 날짜 데이터

    startDate: dayDefaultDate, // 일별 시작 날짜
    endDate: new Date(), // 일별 종료 날짜
    dayFormatDate: [],

    whatTime: '17', // 17시 & 24시 기준 선택

    messageType: 'SMS', // 메세지 타입 선택

    monthAxiosData: {}, // 월별 데이터
    dayAxiosData: {}, // 일별 데이터
  },
  setDailyData: (data) =>
    set((state) => ({
      ...state,
      dailyData: data,
    })),

  mobileData: {
    grpCd: '',
    billCd: '',

    selectedDate: '월별 통계', // 월별 일별

    monthDate: new Date(), // 월별 날짜, picker변경
    monthFormatDate: '', // 조회로 넘겨줄 날짜 데이터

    startDate: dayDefaultDate, // 일별 시작 날짜
    endDate: new Date(), // 일별 종료 날짜
    dayFormatDate: [],

    whatTime: '17', // 17시 & 24시 기준 선택

    messageType: 'SMS', // 메세지 타입 선택

    mobile: 'SMS',

    monthAxiosData: {}, // 월별 데이터
    dayAxiosData: {}, // 일별 데이터
  },
  setMobileData: (data) =>
    set((state) => ({
      ...state,
      mobileData: data,
    })),

  SMSData: {
    grpCd: '',
    billCd: '',

    selectedDate: '월별 통계', // 월별 일별

    monthDate: new Date(), // 월별 날짜, picker변경
    monthFormatDate: '', // 조회로 넘겨줄 날짜 데이터

    startDate: dayDefaultDate, // 일별 시작 날짜
    endDate: new Date(), // 일별 종료 날짜
    dayFormatDate: [],

    whatTime: '24', // 17시 & 24시 기준 선택

    messageType: 'SMS', // 메세지 타입 선택

    monthAxiosData: [], // 월별 데이터
    dayAxiosData: [], // 일별 데이터
  },
  setSMSData: (data) =>
    set((state) => ({
      ...state,
      SMSData: data,
    })),

  MMSData: {
    grpCd: '',
    billCd: '',

    selectedDate: '월별 통계', // 월별 일별

    monthDate: new Date(), // 월별 날짜, picker변경
    monthFormatDate: '', // 조회로 넘겨줄 날짜 데이터

    startDate: dayDefaultDate, // 일별 시작 날짜
    endDate: new Date(), // 일별 종료 날짜
    dayFormatDate: [],

    whatTime: '24', // 17시 & 24시 기준 선택

    messageType: 'SMS', // 메세지 타입 선택

    monthAxiosData: [], // 월별 데이터
    dayAxiosData: [], // 일별 데이터
  },
  setMMSData: (data) =>
    set((state) => ({
      ...state,
      MMSData: data,
    })),

  RealTimeDate: {
    startDate: '',
    endDate: '',
    smsData: '',
    mmsData: '',
  },
}));

export default useStore;
