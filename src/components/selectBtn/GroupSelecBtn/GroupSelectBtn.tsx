import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../../store/Store';
import { useLocation } from 'react-router-dom';
import instance from '../../../config/axiosInstance';
import './GroupSelectBtn.css'; // Import the CSS file

interface Group {
  name: string;
  grpCd: string;
  BillCode: string[];
}

const GroupSelectBtn: React.FC = () => {
  const { dailyData, setDailyData, mobileData, setMobileData, SMSData, setSMSData, MMSData, setMMSData } = useStore();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const location = useLocation();

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const axiosGroup = async () => {
      try {
        const response = await instance.get(`/groupCode`);
        const transformedGroups: Group[] = response.data.map((group: any) => {
          //@ts-ignore
          const [grpCd, [name, ...BillCode]] = Object.entries(group)[0];
          return { name, grpCd, BillCode };
        });
        setGroups(transformedGroups);

        if (transformedGroups.length > 0) {
          const firstGroup = transformedGroups[0];
          setSearchQuery(firstGroup.name);
          switch (location.pathname) {
            case '/daily':
              setDailyData({ ...dailyData, grpCd: firstGroup.grpCd });
              break;
            case '/mobile':
              setMobileData({ ...mobileData, grpCd: firstGroup.grpCd });
              break;
            case '/sms':
              setSMSData({ ...SMSData, grpCd: firstGroup.grpCd });
              break;
            case '/mms':
              setMMSData({ ...MMSData, grpCd: firstGroup.grpCd });
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error('Error fetching group codes:', error);
      }
    };

    axiosGroup();
  }, [location.pathname]);

  useEffect(() => {
    setSelectedItemIndex(0);
  }, [searchQuery]);

  const handleGroupChange = (group: Group) => {
    const index = filteredGroups.findIndex((g) => g.grpCd === group.grpCd);
    if (index !== -1) {
      setSelectedItemIndex(index);
    }
    switch (location.pathname) {
      case '/daily':
        setDailyData({ ...dailyData, grpCd: group.grpCd });
        setSearchQuery(group.name);
        break;
      case '/mobile':
        setMobileData({ ...mobileData, grpCd: group.grpCd });
        setSearchQuery(group.name);
        break;
      case '/sms':
        setSMSData({ ...SMSData, grpCd: group.grpCd });
        setSearchQuery(group.name);
        break;
      case '/mms':
        setMMSData({ ...MMSData, grpCd: group.grpCd });
        setSearchQuery(group.name);
        break;
      default:
        break;
    }
    setShowOptions(false);
  };

  const inputRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (!inputRef.current?.contains(event.target as Node) && !dropDownRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [dropDownRef]);

  const handleMouseEnter = (index: number) => {
    setSelectedItemIndex(index);
  };

  const filteredGroups = [...groups.filter((group) => group.name.toLowerCase() === searchQuery.toLowerCase()), ...groups.filter((group) => (group.name.toLowerCase().includes(searchQuery.toLowerCase()) && group.name.toLowerCase() !== searchQuery.toLowerCase()) || group.grpCd.toLowerCase().includes(searchQuery.toLowerCase()))];

  return (
    <div ref={inputRef} className='group-select-container'>
      <div className='group-select-label'>그룹 선택</div>
      <button
        onClick={() => {
          setShowOptions(!showOptions);
          setSearchQuery('');
        }}
        className='group-select-button'
        type='button'>
        {(() => {
          const selectedGroup = groups.find((group) => {
            switch (location.pathname) {
              case '/daily':
                return group.grpCd === dailyData.grpCd;
              case '/mobile':
                return group.grpCd === mobileData.grpCd;
              case '/sms':
                return group.grpCd === SMSData.grpCd;
              case '/mms':
                return group.grpCd === MMSData.grpCd;
              default:
                return false;
            }
          });

          return selectedGroup ? selectedGroup.name : '그룹 & 코드 검색';
        })()}
        <svg className={`arrow ${showOptions ? 'rotate' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>

      {showOptions && (
        <div ref={dropDownRef} className='group-select-options' role='menu' aria-orientation='vertical' aria-labelledby='dropdownDefaultButton'>
          {filteredGroups.length === 0 && <div className='no-results'>검색어를 찾을 수 없습니다...</div>}
          {filteredGroups.map((group, index) => (
            <a key={group.grpCd} href='#' onClick={() => handleGroupChange(group)} onMouseEnter={() => handleMouseEnter(index)} className={`block ${selectedItemIndex === index ? 'selected' : ''}`} role='menuitem'>
              {group.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSelectBtn;
