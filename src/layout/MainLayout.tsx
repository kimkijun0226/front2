import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import ExcelBtn from '../components/selectBtn/ExcelBtn/ExcelBtn';
import BillSelectBtn from '../components/selectBtn/BillSelectBtn/BillSelectBtn';
import TypeSelectBtn from '../components/selectBtn/TypeSelectBtn/TypeSelectBtn';
import TimeSelectBtn from '../components/selectBtn/TimeSelectBtn/TimeSelectBtn';
import MonthDaySelectedBtn from '../components/selectBtn/MonthDaySelectedBtn/MonthDaySelectedBtn';
import MonthPicker from '../components/selectBtn/MonthPicker/MonthPicker';
import DayPicker from '../components/selectBtn/DayPicker/DayPicker';
import SearchBtn from '../components/selectBtn/SearchBtn/SearchBtn';
import useStore from '../store/Store';
import './MainLayout.css';
import GroupSelectBtn from '../components/selectBtn/GroupSelecBtn/GroupSelectBtn';

const MainLayout: React.FC = () => {
  const { dailyData, MMSData, mobileData, SMSData } = useStore();
  const location = useLocation();

  return (
    <>
      <Header />
      <div className='main-layout'>
        <div className='layout-container'>
          <div className='button-group'>
            <GroupSelectBtn />
            <BillSelectBtn />
            {location.pathname === '/mobile' && <TypeSelectBtn />}
            <TimeSelectBtn />
            <MonthDaySelectedBtn />
            {location.pathname === '/daily' ? dailyData.selectedDate === '월별 통계' ? <MonthPicker /> : <DayPicker /> : location.pathname === '/mobile' ? mobileData.selectedDate === '월별 통계' ? <MonthPicker /> : <DayPicker /> : location.pathname === '/sms' ? SMSData.selectedDate === '월별 통계' ? <MonthPicker /> : <DayPicker /> : location.pathname === '/mms' ? MMSData.selectedDate === '월별 통계' ? <MonthPicker /> : <DayPicker /> : null}
            <SearchBtn />
          </div>
        </div>
      </div>

      <ExcelBtn />
      <div className='relative-container'>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
