import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import useStore from '../../store/Store';
import { Table } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS

interface MobileItem {
  date: string;
  SKTTotal: number;
  SKTSuccess: number;
  KTTotal: number;
  KTSuccess: number;
  LGTotal: number;
  LGSuccess: number;
  UnSubTotal: number;
  UnSubSuccess: number;
}

interface MobileDataItem {
  provider: string;
  totalCount: number;
  successCount: number;
}

// This assumes `monthAxiosData` and `dayAxiosData` are objects with date strings as keys and arrays of `MobileDataItem` as values
interface MobileData {
  monthAxiosData: { [date: string]: MobileDataItem[] };
  dayAxiosData: { [date: string]: MobileDataItem[] };
  selectedDate: '월별 통계' | '일별 통계';
}

const MobilTable: React.FC = () => {
  const { mobileData } = useStore() as { mobileData: MobileData }; // Ensure you have the correct type for mobileData
  const [items, setItems] = useState<MobileItem[]>([]);

  useEffect(() => {
    mobileData.dayAxiosData = {};
    mobileData.monthAxiosData = {};
  }, []);

  useEffect(() => {
    const formatData = (data: { [date: string]: MobileDataItem[] }) => {
      return Object.entries(data).map(([date, items]) => {
        const findProvider = (provider: string): MobileDataItem | undefined => items.find((item) => item.provider === provider);

        const SKTData = findProvider('SKT');
        const KTData = findProvider('KTF');
        const LGData = findProvider('LGT');
        const Unsubscribed = findProvider('미가입자');

        return {
          date,
          SKTTotal: SKTData?.totalCount ?? 0,
          SKTSuccess: SKTData?.successCount ?? 0,
          KTTotal: KTData?.totalCount ?? 0,
          KTSuccess: KTData?.successCount ?? 0,
          LGTotal: LGData?.totalCount ?? 0,
          LGSuccess: LGData?.successCount ?? 0,
          UnSubTotal: Unsubscribed?.totalCount ?? 0,
          UnSubSuccess: Unsubscribed?.successCount ?? 0,
        };
      });
    };

    const selectedData = mobileData.selectedDate === '월별 통계' ? mobileData.monthAxiosData : mobileData.dayAxiosData;

    setItems(formatData(selectedData));
  }, [mobileData.monthAxiosData, mobileData.dayAxiosData, mobileData.selectedDate]);

  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
    },
    {
      title: '발송 기준',
      children: [
        {
          title: 'SKT 발송',
          dataIndex: 'SKTTotal',
          key: 'SKTTotal',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: 'KT 발송',
          dataIndex: 'KTTotal',
          key: 'KTTotal',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: 'LG 발송',
          dataIndex: 'LGTotal',
          key: 'LGTotal',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: '미가입자 발송',
          dataIndex: 'UnSubTotal',
          key: 'UnSubTotal',
          render: (text: number) => text.toLocaleString(),
        },
      ],
    },
    {
      title: '성공 기준',
      children: [
        {
          title: 'SKT 성공',
          dataIndex: 'SKTSuccess',
          key: 'SKTSuccess',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: 'KT 성공',
          dataIndex: 'KTSuccess',
          key: 'KTSuccess',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: 'LG 성공',
          dataIndex: 'LGSuccess',
          key: 'LGSuccess',
          render: (text: number) => text.toLocaleString(),
        },
        {
          title: '성공기준 합계',
          key: 'totalSuccess',
          render: (record: MobileItem) => {
            const totalSuccess = record.SKTSuccess + record.KTSuccess + record.LGSuccess + record.UnSubSuccess;
            return totalSuccess.toLocaleString();
          },
        },
      ],
    },
  ];

  return (
    <div className='mobiltable-container'>
      <Table columns={columns} dataSource={items} pagination={false} rowKey='date' bordered />
    </div>
  );
};

export default MobilTable;
