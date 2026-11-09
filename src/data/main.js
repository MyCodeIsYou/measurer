import { publicUrl } from "../publicUrl";

export const TOP_NOTICE =
  "2028년 수질·대기분야 용역이행능력평가 매뉴얼(안) 사전 의견조회 실시 알림";

export const SLIDES = [
  {
    title: "측정대행 계약관리제도",
    lines: ["측정대행업계의 선순환 유도, 공정한 측정대행", "문화 정착으로 건강한 환경산업을 만듭니다."],
    href: "/cm/pub/aboutContract.go",
    image: publicUrl("/images/main/main-visual1.png"),
  },
  {
    title: "용역이행능력평가",
    lines: [
      "측정대행업체의 측정능력 범위와 측정가용능력 준수 여부 등 측정대행업체 역량을 객관적ㆍ정략적으로 평가합니다.",
    ],
    href: "/cm/pub/aboutService.go",
    image: publicUrl("/images/main/main-visual2.png"),
  },
  {
    title: "환경측정분석정보관리시스템",
    lines: [
      "환경오염물질의 허위 · 부실 측정을 방지하고, 측정 · 분석결과의 신뢰도 확보 및 전국 측정대행업을 체계적으로 관리합니다.",
    ],
    href: "/cm/pub/system.go",
    image: publicUrl("/images/main/main-visual3.png"),
  },
];

export const NOTICES = [
  {
    title: "2028년 수질·대기분야 용역이행능력평가 매뉴얼(안) 사전 의견조회 실시 알림",
    date: "2026-11-02",
  },
  {
    title: "[용역이행능력평가] 2027년도 용역이행능력평가 가점대상 외부교육 및 주요 입력사항 안내(11/5 수정)",
    date: "2026-10-30",
  },
  {
    title: "[공지] 계약변경 관련 공지",
    date: "2025-02-28",
  },
  {
    title: "2026년 환경측정분석 정보관리시스템 사용자 만족도 조사 안내(2026.11.9.~11.20)",
    date: "2026-11-09",
  },
];

export const PARTNERS = [
  ["https://www.me.go.kr/home/web/main.do", "/images/main/partner1.png"],
  ["https://www.nier.go.kr/", "/images/main/partner2.png"],
  ["https://www.keco.or.kr/web/index.do", "/images/main/partner3.png"],
  ["https://www.keci.or.kr/web/main.do", "/images/main/partner4.png"],
  ["https://qaqc.nier.go.kr/qaqcnew/main.do", "/images/main/partner5.png"],
  ["https://www.inair.or.kr/info/", "/images/main/partner6.png"],
  ["https://www.air.go.kr/main.do", "/images/main/partner7.png"],
  ["https://www.envex.or.kr/kor/main/index.asp", "/images/main/partner8.png"],
  ["https://kepaedu.or.kr/ema/main.do", "/images/main/partner9.png"],
  ["https://sems.air.go.kr", "/images/main/partner10.png"],
  ["https://www.greenlink.or.kr", "/images/main/partner11.png"],
  ["https://wems.nier.go.kr/user/viewMpIntro.do", "/images/main/partner12.png"],
  ["https://wems.nier.go.kr/swems/main/main.do", "/images/main/partner13.png"],
  ["https://somsys.or.kr", "/images/main/partner14.png"],
  ["https://www.noiseinfo.or.kr", "/images/main/partner15.png"],
  ["https://ieps.nier.go.kr", "/images/main/partner16.png"],
].map(([href, src]) => [href, publicUrl(src)]);

export const REGIONS = [
  { id: "maps1", code: "2800000000", name: "인천", count: 31, area: "Incheon" },
  { id: "maps2", code: "1100000000", name: "서울", count: 91, area: "Seoul" },
  { id: "maps3", code: "5100000000", name: "강원", count: 16, area: "Gangwon" },
  { id: "maps4", code: "4100000000", name: "경기", count: 183, area: "Gyeonggi" },
  { id: "maps5", code: "3600000000", name: "세종", count: 3, area: "Sejong" },
  { id: "maps6", code: "4300000000", name: "충북", count: 29, area: "Chungbuk" },
  { id: "maps7", code: "4400000000", name: "충남", count: 29, area: "Chungnam" },
  { id: "maps8", code: "3000000000", name: "대전", count: 20, area: "Daejeon" },
  { id: "maps9", code: "4700000000", name: "경북", count: 19, area: "Gyeongbuk" },
  { id: "maps10", code: "5200000000", name: "전북", count: 25, area: "Jeonbuk" },
  { id: "maps11", code: "2700000000", name: "대구", count: 26, area: "Daegu" },
  { id: "maps12", code: "1200000000", name: "전남", count: 50, area: "Jeonnam", multiline: true },
  { id: "maps13", code: "4800000000", name: "경남", count: 48, area: "Gyeongnam" },
  { id: "maps14", code: "3100000000", name: "울산", count: 13, area: "Ulsan" },
  { id: "maps16", code: "2600000000", name: "부산", count: 35, area: "Busan" },
  { id: "maps17", code: "5000000000", name: "제주", count: 4, area: "Jeju" },
];

export const MENUS = [
  {
    label: "공지사항",
    href: "/cm/pub/notify.go",
    items: [{ label: "공지사항", href: "/cm/pub/notify.go" }],
  },
  {
    label: "제도소개",
    href: "/cm/pub/aboutContract.go",
    items: [
      {
        label: "측정대행",
        href: "/cm/pub/aboutContract.go",
        items: [
          { label: "계약관리제도", href: "/cm/pub/aboutContract.go" },
          { label: "용역이행능력평가", href: "/cm/pub/aboutService.go" },
        ],
      },
      { label: "환경측정분석\n정보관리시스템", href: "/cm/pub/system.go" },
    ],
  },
  {
    label: "측정대행업체 조회",
    href: "/cmpy.go",
    items: [{ label: "측정대행업체 조회", href: "/cmpy.go" }],
  },
  {
    label: "고객지원",
    href: "/cm/pub/manual.go",
    items: [
      { label: "시스템 매뉴얼", href: "/cm/pub/manual.go" },
      { label: "자주하는 질문", href: "/cm/pub/faqboard.go" },
      { label: "자료실", href: "/cm/pub/board.go" },
    ],
  },
];
