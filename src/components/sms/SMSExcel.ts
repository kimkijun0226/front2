import * as XLSX from 'xlsx-js-style';

const SMSExcel = ({ dataToUse, service, SMSData }: { dataToUse: any[]; service: string; SMSData: any }) => {
  // 합계 계산
  const total = dataToUse.reduce((acc: { [x: string]: any }, cur: { [x: string]: any }) => {
    Object.keys(cur).forEach((key) => {
      if (key !== 'date') {
        acc[key] = (acc[key] || 0) + cur[key];
      }
    });
    return acc;
  }, {});

  // 합계-성공률 계산
  const successRate = (total.successCount / total.totalCount) * 100;
  const billCd = SMSData.billCd;
  const grpCd = SMSData.grpCd;

  // 데이터 추가
  const data = dataToUse.map((item: { date: string; totalCount: { toLocaleString: () => any }; successCount: { toLocaleString: () => any }; failCount: { toLocaleString: () => any }; nonSubscriber: { toLocaleString: () => any }; percentage: any }) => {
    const formattedDate = item.date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    return [
      billCd, // 그룹코드
      grpCd, // 업체명
      service,
      formattedDate,
      item.totalCount.toLocaleString(),
      item.successCount.toLocaleString(),
      item.failCount.toLocaleString(),
      item.nonSubscriber.toLocaleString(),
      item.percentage,
    ];
  });

  // 합계 추가
  data.push([
    '합계', // 수정된 부분
    '',
    '',
    '',
    total.totalCount.toLocaleString() + '건',
    total.successCount.toLocaleString(),
    total.failCount.toLocaleString(),
    total.nonSubscriber.toLocaleString(),
    successRate.toFixed(2) + '%',
  ]);
  // 엑셀 시트 생성
  const worksheetData = [['빌 코드', '그룹 코드', '서비스', '날짜', '총 건수', '성공', '실패', '미 가입자', '성공률'], ...data]; // title 배열을 다시 배열로 감싸서 전달
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // 열 너비 지정
  const columnWidths = [
    { wch: 10 }, // 그룹코드
    { wch: 30 }, // 업체명
    { wch: 10 }, // 서비스
    { wch: 20 }, // 날짜
    { wch: 15 }, // 총 건수
    { wch: 15 }, // 성공
    { wch: 15 }, // 실패
    { wch: 15 }, // 미 가입자
    { wch: 15 }, // 성공률
  ];
  worksheet['!cols'] = columnWidths;
  if (!worksheet['!merges']) {
    worksheet['!merges'] = [];
  }

  // 엑셀 시트의 스타일 적용
  const range = XLSX.utils.decode_range(worksheet['!ref'] as string);

  // 셀 스타일 적용
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { c: C, r: R };
      const cellRef = XLSX.utils.encode_cell(cellAddress);

      // 셀이 존재하지 않으면 셀 생성
      if (!worksheet[cellRef]) {
        worksheet[cellRef] = { t: 'z', v: '' }; // 기본값으로 빈 문자열 설정
      }

      // 셀 스타일 설정
      worksheet[cellRef].s = {
        alignment: { horizontal: 'center' },
        border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
      };
    }
  }

  // 제목 행의 스타일 적용
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = { c: C, r: range.s.r };
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    worksheet[cellRef].s = {
      alignment: { horizontal: 'center' },
      font: { bold: true },
      fill: { fgColor: { rgb: 'dbeafe' } },
      border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
    };
  }
  // 나머지 데이터 셀의 스타일 적용
  for (let R = range.s.r + 1; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { c: C, r: R };
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      worksheet[cellRef].s = {
        alignment: { horizontal: 'center' },
        border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
      };
      // 짝수 행에 색상 적용
      if (R % 2 === 0) {
        worksheet[cellRef].s.fill = { fgColor: { rgb: 'f4f4f4' } }; // 짝수 행 색상 설정
      }
    }
  }

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = { c: C, r: range.e.r };
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    worksheet[cellRef].s = {
      alignment: { horizontal: 'center' },
      font: { bold: true },
      fill: { fgColor: { rgb: 'dbeafe' } },
      border: { top: { style: 'thin', color: { rgb: '000000' } }, bottom: { style: 'thin', color: { rgb: '000000' } }, left: { style: 'thin', color: { rgb: '000000' } }, right: { style: 'thin', color: { rgb: '000000' } } },
    };
  }

  // 합계 셀을 좌측으로 이동하여 병합할 셀과 병합
  const totalMergeCell = { s: { r: range.e.r, c: range.s.c }, e: { r: range.e.r, c: range.s.c + 3 } }; // 이 부분 수정
  worksheet['!merges'].push(totalMergeCell);

  return worksheet;
};

export default SMSExcel;
