import React, { useState, useEffect } from 'react';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import instance from '../../../config/axiosInstance';
import './GroupSelectBtn.css'; // Import the CSS file
import { Select } from 'antd';

interface Group {
  name: string;
  grpCd: string;
  billCode: string[];
}

const GroupSelectBtn: React.FC = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const location = useLocation();
  const [groups, setGroups] = useState<Group[]>([]);

  //그룹 가져오기
  const axiosGroup = async () => {
    try {
      const response = await instance.get(`/groupCode`);
      console.log(response.data);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching group codes:', error);
    }
  };

  useEffect(() => {
    axiosGroup();
  }, [location.pathname]);

  //그룹의 밸류와 라벨을 만들기
  const options = groups.map((group) => ({
    value: group.grpCd,
    label: group.name,
  }));

  // 드롭다운 선택하면 store에 상태 변경
  const handleChange = (value: string) => {
    const selectedGroup = groups.find((group) => group.grpCd === value);
    const selectedGroupBillcode = selectedGroup?.billCode;
    switch (location.pathname) {
      case '/daily':
        setDailyData({
          ...dailyData,
          grpCd: value,
          selectedGroupBillCd: selectedGroupBillcode,
        });
        break;
      case '/mobile':
        setMobileData({
          ...mobileData,
          grpCd: value,
          selectedGroupBillCd: selectedGroupBillcode,
        });
        break;
      case '/sms':
        setSMSData({
          ...SMSData,
          grpCd: value,
          selectedGroupBillCd: selectedGroupBillcode,
        });
        break;
      case '/mms':
        setMMSData({
          ...MMSData,
          grpCd: value,
          selectedGroupBillCd: selectedGroupBillcode,
        });
        break;
      default:
        break;
    }
  };

  // select에 value값
  const getValue = () => {
    switch (location.pathname) {
      case '/daily':
        return dailyData.grpCd;
      case '/mobile':
        return mobileData.grpCd;
      case '/sms':
        return SMSData.grpCd;
      case '/mms':
        return MMSData.grpCd;
      default:
        return '0';
    }
  };

  const getSelectWidth = () => (getValue() === '0' ? '150px' : 'auto');

  return (
    <Select
      value={getValue()}
      showSearch
      placeholder='그룹을 선택해 주세요'
      filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) || (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
      onChange={handleChange}
      options={options}
      style={{ width: getSelectWidth() }}
    />
  );
};

export default GroupSelectBtn;
