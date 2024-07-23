import * as XLSX from 'xlsx-js-style';

const DailyExcel = ({ dataToUse }: { dataToUse: any }) => {
  // 데이터 추가
  const data = [
    ['날짜별 서비스', '', '차세대', '', '', ''],
    ['', '', '발송 기준', '', '성공 기준', ''], // 열 헤더 수정
    ['', '', 'SMS', 'LMS', 'SMS', 'LMS'], // 발송 및 성공 기준을 각각 표시
  ];

  // 병합 정보
  const merges = [
    { s: { r: 0, c: 2 }, e: { r: 0, c: 5 } }, // 차세대 병합
    { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } }, // 발송 기준
    { s: { r: 1, c: 4 }, e: { r: 1, c: 5 } }, // 성공 기준
    { s: { r: 0, c: 0 }, e: { r: 2, c: 1 } }, // 날짜별 서비스 통합 병합
  ];

  // 데이터를 행별로 추가
  for (const dates of dataToUse) {
    for (const date in dates) {
      const formattedDate = date ? date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : '';

      let smsTodayTotal = '';
      let smsTodaySuccess = '';
      let smsMonthTotal = '';
      let smsMonthSuccess = '';
      let lmsTodayTotal = '';
      let lmsTodaySuccess = '';
      let lmsMonthTotal = '';
      let lmsMonthSuccess = '';

      // 각 타입(SMS, MMS)에 대해 데이터 채우기
      for (const item of dates[date]) {
        if (item.type === 'SMS') {
          // SMS 데이터 추가
          smsTodayTotal = (item.todayTotal || 0).toLocaleString();
          smsTodaySuccess = (item.todaySuccess || 0).toLocaleString();
          smsMonthTotal = (item.monthTotal || 0).toLocaleString();
          smsMonthSuccess = (item.monthSuccess || 0).toLocaleString();
        } else if (item.type === 'LMS') {
          // LMS 데이터 추가
          lmsTodayTotal = (item.todayTotal || 0).toLocaleString();
          lmsTodaySuccess = (item.todaySuccess || 0).toLocaleString();
          lmsMonthTotal = (item.monthTotal || 0).toLocaleString();
          lmsMonthSuccess = (item.monthSuccess || 0).toLocaleString();
        }
      }

      // 한 행에 모든 데이터 추가
      const rowData1 = [formattedDate, '일별', smsTodayTotal, lmsTodayTotal, smsTodaySuccess, lmsTodaySuccess];
      const rowData2 = ['', '월 누적', smsMonthTotal, lmsMonthTotal, smsMonthSuccess, lmsMonthSuccess];

      // 데이터 배열에 특정 행의 셀들을 객체로 저장
      const mergedCells = [
        { s: { r: data.length, c: 0 }, e: { r: data.length + 1, c: 0 } }, // formattedDate 셀과 빈 셀 병합
      ];

      // 병합 정보에 추가
      merges.push(...mergedCells);

      data.push(rowData1);
      data.push(rowData2);
    }
  }

  // 엑셀 파일로 저장
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // 중앙 정렬 스타일 적용
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (!worksheet[cell_ref]) continue;
      const cell = worksheet[cell_ref];
      cell.s = { alignment: { horizontal: 'center', vertical: 'center' } };
    }
  }

  // 헤더 셀에 보더와 배경색 적용
  const headerCellStyle = {
    fill: { patternType: 'solid', fgColor: { rgb: 'F4F4F4' } }, // 배경색 설정
  };

  // 헤더 셀에 스타일 적용
  const headerCellRange = { s: { r: 0, c: 0 }, e: { r: 2, c: 5 } }; // 헤더 셀 범위 설정
  for (let R = headerCellRange.s.r; R <= headerCellRange.e.r; ++R) {
    for (let C = headerCellRange.s.c; C <= headerCellRange.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (!worksheet[cell_ref]) continue;
      const cell = worksheet[cell_ref];
      if (!cell.s) cell.s = {};
      Object.assign(cell.s, headerCellStyle);
    }
  }

  // 특정 패턴에 따라 셀의 색상을 적용
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: R };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (!worksheet[cell_ref]) continue;
      const cell = worksheet[cell_ref];
      if (!cell.s) cell.s = {};
      cell.s.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };

      // 헤더 행은 색상 적용 제외
      if (R < 3) continue;

      // 특정 패턴에 맞는 행에 그레이 색상 적용
      if ((R - 1) % 4 === 0 || (R - 2) % 4 === 0) {
        if (!cell.s.fill) cell.s.fill = {};
        cell.s.fill.patternType = 'solid';
        cell.s.fill.fgColor = { rgb: 'f4f4f4' };
      }
    }
  }

  // 열의 너비를 조절합니다.
  const columnWidths = [
    { wch: 10 }, // '날짜별 서비스'의 너비를 20으로 설정
    { wch: 10 }, // 빈 셀의 너비를 10으로 설정
    { wch: 15 }, // '차세대'의 너비를 15으로 설정
    { wch: 15 }, // 나머지 셀의 너비를 10으로 설정
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
  ];

  // !cols가 정의되어 있지 않으면 초기화합니다.
  if (!worksheet['!cols']) {
    worksheet['!cols'] = [];
  }

  // 너비 설정 적용
  columnWidths.forEach((width, index) => {
    if (!worksheet['!cols']) {
      worksheet['!cols'] = [];
    }
    worksheet['!cols'][index] = width;
  });
  // 병합 정보 설정
  worksheet['!merges'] = merges;

  // 엑셀 시트를 반환합니다.
  return worksheet;
};

export default DailyExcel;
