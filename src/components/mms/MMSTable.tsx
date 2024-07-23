import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import useStore from '../../store/Store';
import dayjs from 'dayjs';

// 데이터 항목 타입 정의
interface ItemData {
  date: string;
  totalCount: number;
  successCount: number;
  failCount: number;
  nonSubscriber: number;
  percentage: number;
}

// 총계 타입 정의
interface TotalCounts {
  totalCount: number;
  successCount: number;
  failCount: number;
  nonSubscriber: number;
  totalPercentage: number;
}

// MMSTable 컴포넌트
const MMSTable: React.FC = () => {
  const { MMSData } = useStore();
  const [monthItems, setMonthItems] = useState<ItemData[]>([]);
  const [dayItems, setDayItems] = useState<ItemData[]>([]);

  // MMSData 콘솔 출력
  useEffect(() => {
    console.log(MMSData);
  }, [MMSData]);

  // 데이터 초기화
  useEffect(() => {
    MMSData.dayAxiosData = [];
    MMSData.monthAxiosData = [];
  }, []);

  // 선택된 날짜에 따른 데이터 초기화
  useEffect(() => {
    MMSData.dayAxiosData = [];
    MMSData.monthAxiosData = [];
  }, [MMSData.selectedDate]);

  // 월별 데이터 포맷팅
  useEffect(() => {
    const formattedData: ItemData[] = MMSData.monthAxiosData.map((item: ItemData) => ({
      ...item,
      totalCount: Number(item.totalCount),
      successCount: Number(item.successCount),
      failCount: Number(item.failCount),
      nonSubscriber: Number(item.nonSubscriber),
      percentage: Number(item.percentage),
    }));
    setMonthItems(formattedData);
    console.log(MMSData.monthAxiosData, 'mms: 월별 데이터');
  }, [MMSData.monthAxiosData]);

  // 일별 데이터 포맷팅
  useEffect(() => {
    const formattedData: ItemData[] = MMSData.dayAxiosData.map((item: ItemData) => ({
      ...item,
      totalCount: Number(item.totalCount),
      successCount: Number(item.successCount),
      failCount: Number(item.failCount),
      nonSubscriber: Number(item.nonSubscriber),
      percentage: Number(item.percentage),
    }));
    setDayItems(formattedData);
    console.log(MMSData.dayAxiosData, 'mms  : 일별 데이터');
  }, [MMSData.dayAxiosData]);

  // 총계 계산 함수
  const calculateTotalCounts = (items: ItemData[]): TotalCounts => {
    return items.reduce(
      (acc, item) => {
        acc.totalCount += item.totalCount;
        acc.successCount += item.successCount;
        acc.failCount += item.failCount;
        acc.nonSubscriber += item.nonSubscriber;
        acc.totalPercentage += item.percentage;
        return acc;
      },
      { totalCount: 0, successCount: 0, failCount: 0, nonSubscriber: 0, totalPercentage: 0 }
    );
  };

  const monthTotalCounts = calculateTotalCounts(monthItems);
  const monthAveragePercentage = monthItems.length > 0 ? monthTotalCounts.totalPercentage / monthItems.length : 0;

  const dayTotalCounts = calculateTotalCounts(dayItems);
  const dayAveragePercentage = dayItems.length > 0 ? dayTotalCounts.totalPercentage / dayItems.length : 0;

  // 테이블 열 정의
  const columns = [
    { title: '구분', dataIndex: 'type', key: 'type', render: () => 'MMS' },
    { title: '서비스', dataIndex: 'service', key: 'service', render: () => 'MMS' },
    { title: '전송일자', dataIndex: 'date', key: 'date', render: (text: string) => dayjs(text).format('YYYY-MM-DD') },
    { title: '총 건수', dataIndex: 'totalCount', key: 'totalCount', render: (text: number) => text.toLocaleString() },
    { title: '성공', dataIndex: 'successCount', key: 'successCount', render: (text: number) => text.toLocaleString() },
    { title: '실패', dataIndex: 'failCount', key: 'failCount', render: (text: number) => text.toLocaleString() },
    { title: '미가입자', dataIndex: 'nonSubscriber', key: 'nonSubscriber', render: (text: number) => text.toLocaleString() },
    { title: '성공률', dataIndex: 'percentage', key: 'percentage', render: (text: number) => text.toFixed(2) + '%' },
  ];

  // 요약 행 생성 함수
  const summaryRow = (totalCounts: TotalCounts, averagePercentage: number) => (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0} colSpan={3}>
        <Typography.Text strong>합계</Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1}>
        <Typography.Text>{totalCounts.totalCount.toLocaleString()}</Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={2}>
        <Typography.Text>{totalCounts.successCount.toLocaleString()}</Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={3}>
        <Typography.Text>{totalCounts.failCount.toLocaleString()}</Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={4}>
        <Typography.Text>{totalCounts.nonSubscriber.toLocaleString()}</Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={5}>
        <Typography.Text>{averagePercentage.toFixed(2)}%</Typography.Text>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );

  return (
    <div>
      <Table dataSource={MMSData.selectedDate === '월별 통계' ? monthItems : dayItems} columns={columns} rowKey='date' pagination={false} summary={() => (MMSData.selectedDate === '월별 통계' ? summaryRow(monthTotalCounts, monthAveragePercentage) : summaryRow(dayTotalCounts, dayAveragePercentage))} />
    </div>
  );
};

export default MMSTable;
