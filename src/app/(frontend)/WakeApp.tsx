"use client";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type SharedProblemNotification = {
  id: string;
  authorName: string;
  problem: string;
  category: string;
  difficulty: string;
  sharedAt: string;
};

type IconName =
  | "alarm"
  | "arrow-left"
  | "bell"
  | "book"
  | "camera"
  | "calendar"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "flame"
  | "home"
  | "plus"
  | "settings"
  | "sparkle"
  | "target"
  | "trash"
  | "volume";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    alarm: (
      <>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 10v3.5l2.5 1.5M5 3 2.5 5.5M19 3l2.5 2.5M7 20l-1.5 2M17 20l1.5 2" />
      </>
    ),
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" />
        <circle cx="12" cy="12.5" r="3.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chart: <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="M18 6 6 18M6 6l12 12" />,
    flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-9 .2 3-1 4-2 5-1-3-3-5-3-8-3 3-4 7-4 11 0 5 3 8 7 8Z" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    sparkle: <path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3ZM5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
      </>
    ),
    volume: (
      <>
        <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
        <path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

type Alarm = {
  id: number;
  time: string;
  period: string;
  label: string;
  days: string;
  difficulty: string;
  volume: number;
  active: boolean;
};

type UpcomingAlarm = {
  id: number;
  label: string;
  time: string;
  day: string;
  remaining: string;
  timestamp: number;
};

type AlarmGroup = {
  id: number;
  name: string;
  alarmIds: number[];
};

const initialAlarms: Alarm[] = [
  {
    id: 1,
    time: "06:30",
    period: "AM",
    label: "상쾌한 아침",
    days: "월 · 화 · 수 · 목 · 금",
    difficulty: "보통 · 3문제",
    volume: 70,
    active: true,
  },
  {
    id: 2,
    time: "08:00",
    period: "AM",
    label: "주말 루틴",
    days: "토 · 일",
    difficulty: "쉬움 · 2문제",
    volume: 55,
    active: false,
  },
  {
    id: 3,
    time: "14:00",
    period: "PM",
    label: "오후 집중",
    days: "매일",
    difficulty: "어려움 · 5문제",
    volume: 85,
    active: true,
  },
];

const oneTrySuccessDays = [1, 2, 5, 6, 7, 8, 12, 13, 14, 19, 20, 24];

const wrongProblems = [
  {
    id: 1,
    problem: "8 × 6 − 12 ÷ 2",
    submitted: "36",
    answer: "42",
    category: "혼합 계산",
    date: "5월 23일",
  },
  {
    id: 2,
    problem: "72 ÷ 8 + 6 × 3",
    submitted: "45",
    answer: "27",
    category: "연산 순서",
    date: "5월 18일",
  },
  {
    id: 3,
    problem: "15 + 7 × 4 − 9",
    submitted: "79",
    answer: "34",
    category: "혼합 계산",
    date: "5월 11일",
  },
];

function Toggle({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={label}
      onClick={onClick}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        active ? "bg-[#15966a]" : "bg-[#d8d6e0]"
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          active ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function HistoryView() {
  const calendarDays: Array<number | null> = [
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  return (
    <>
      <section className="relative mt-3 overflow-hidden rounded-[28px] bg-[#173d30] p-6 text-white shadow-[0_18px_40px_rgba(23,61,48,.2)]">
        <div className="absolute -right-8 -top-10 size-32 rounded-full bg-[#285443]" />
        <div className="absolute -bottom-14 -left-8 size-32 rounded-full border-[20px] border-white/5" />
        <div className="relative flex items-end justify-between">
          <div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#7ce0b7]">
              <Icon name="flame" size={22} />
            </span>
            <p className="mt-6 text-xs font-semibold text-[#afd0c3]">
              이번 달 한 번에 성공
            </p>
            <p className="mt-1 text-4xl font-extrabold tracking-[-0.06em]">
              12<span className="ml-1 text-lg tracking-normal text-[#b9d4c9]">일</span>
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-right">
            <p className="text-[10px] font-semibold text-[#afd0c3]">연속 성공</p>
            <p className="mt-1 text-lg font-extrabold">6일째</p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[24px] border border-[#e4ece8] bg-white p-5 shadow-[0_6px_22px_rgba(44,69,58,.05)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-extrabold tracking-[-0.03em]">한 번에 끈 날</p>
            <p className="mt-1 text-[11px] text-[#8a9891]">
              문제를 틀리지 않고 알람을 해제한 날짜예요
            </p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e8f6f0] text-[#15966a]">
            <Icon name="calendar" size={19} />
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-extrabold">2025년 5월</p>
          <span className="rounded-full bg-[#edf8f3] px-3 py-1 text-[10px] font-bold text-[#15966a]">
            성공률 50%
          </span>
        </div>
        <div className="mt-4 grid grid-cols-7 text-center text-[10px] font-semibold text-[#9aa6a0]">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-1.5 text-center text-xs font-semibold">
          {calendarDays.map((day, index) => {
            const isSuccess = day !== null && oneTrySuccessDays.includes(day);
            const isToday = day === 24;
            return (
              <span
                key={`${day ?? "empty"}-${index}`}
                className={`mx-auto flex size-8 items-center justify-center rounded-full ${
                  isToday
                    ? "bg-[#173d30] text-white ring-4 ring-[#e4f3ec]"
                    : isSuccess
                      ? "bg-[#dff4ea] text-[#11815a]"
                      : day
                        ? "text-[#6f7d76]"
                        : ""
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-[#edf1ef] pt-4 text-[10px] font-medium text-[#74837c]">
          <span className="size-2.5 rounded-full bg-[#bce8d3]" />
          초록색 날짜는 한 번에 알람을 끈 날이에요
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-extrabold tracking-[-0.03em]">문제 오답률</p>
            <p className="mt-1 text-xs text-[#8a9891]">최근 30일 풀이 기준</p>
          </div>
          <p className="text-2xl font-extrabold tracking-[-0.04em] text-[#e06454]">18%</p>
        </div>
        <div className="rounded-[22px] border border-[#e4ece8] bg-white p-5 shadow-[0_5px_18px_rgba(44,69,58,.04)]">
          <div className="h-2.5 overflow-hidden rounded-full bg-[#e5f3ec]">
            <div className="h-full w-[18%] rounded-full bg-[#ef7666]" />
          </div>
          <div className="mt-4 grid grid-cols-2 divide-x divide-[#e8eeeb]">
            <div>
              <p className="text-[10px] font-semibold text-[#8a9891]">전체 문제</p>
              <p className="mt-1 text-lg font-extrabold">17개</p>
            </div>
            <div className="pl-5">
              <p className="text-[10px] font-semibold text-[#8a9891]">틀린 문제</p>
              <p className="mt-1 text-lg font-extrabold text-[#e06454]">3개</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="mb-4">
          <p className="text-lg font-extrabold tracking-[-0.03em]">틀린 문제 모아보기</p>
          <p className="mt-1 text-xs text-[#8a9891]">헷갈렸던 문제를 다시 확인해 보세요</p>
        </div>
        <div className="space-y-3">
          {wrongProblems.map((problem) => (
            <article
              key={problem.id}
              className="rounded-[22px] border border-[#e4ece8] bg-white p-4 shadow-[0_5px_18px_rgba(44,69,58,.04)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[#fff0ed] px-2.5 py-1 text-[10px] font-bold text-[#d65a49]">
                    오답
                  </span>
                  <span className="text-[10px] font-medium text-[#8a9891]">
                    {problem.category}
                  </span>
                </div>
                <span className="text-[10px] text-[#9aa6a0]">{problem.date}</span>
              </div>
              <p className="mt-4 text-lg font-extrabold tracking-[-0.02em]">
                {problem.problem}
              </p>
              <div className="mt-4 flex items-center gap-2 border-t border-[#edf1ef] pt-3 text-xs">
                <span className="text-[#8a9891]">내 답</span>
                <span className="font-bold text-[#e06454] line-through">
                  {problem.submitted}
                </span>
                <span className="ml-2 text-[#8a9891]">정답</span>
                <span className="font-extrabold text-[#15966a]">{problem.answer}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function getUpcomingAlarms(alarms: Alarm[]): UpcomingAlarm[] {
  const now = new Date();
  const limit = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return alarms
    .filter((alarm) => alarm.active)
    .flatMap((alarm) => {
      const [displayHour, minute] = alarm.time.split(":").map(Number);
      const hour =
        alarm.period === "PM"
          ? displayHour === 12
            ? 12
            : displayHour + 12
          : displayHour === 12
            ? 0
            : displayHour;

      for (let offset = 0; offset <= 1; offset += 1) {
        const candidate = new Date(now);
        candidate.setDate(now.getDate() + offset);
        candidate.setHours(hour, minute, 0, 0);
        const day = dayLabels[candidate.getDay()];
        const repeatsToday = alarm.days === "매일" || alarm.days.includes(day);

        if (repeatsToday && candidate > now && candidate <= limit) {
          const remainingMinutes = Math.ceil(
            (candidate.getTime() - now.getTime()) / 60000,
          );
          const hours = Math.floor(remainingMinutes / 60);
          const minutes = remainingMinutes % 60;
          const remaining =
            hours > 0
              ? `${hours}시간 ${minutes > 0 ? `${minutes}분 ` : ""}후`
              : `${minutes}분 후`;

          return [
            {
              id: alarm.id,
              label: alarm.label,
              time: `${alarm.time} ${alarm.period}`,
              day: offset === 0 ? "오늘" : "내일",
              remaining,
              timestamp: candidate.getTime(),
            },
          ];
        }
      }

      return [];
    })
    .sort((a, b) => a.timestamp - b.timestamp);
}

function to24HourTime(alarm: Alarm) {
  const [hour, minute] = alarm.time.split(":");
  const displayHour = Number(hour);
  const hour24 =
    alarm.period === "PM"
      ? displayHour === 12
        ? 12
        : displayHour + 12
      : displayHour === 12
        ? 0
        : displayHour;

  return `${String(hour24).padStart(2, "0")}:${minute}`;
}

function App({
  sharedProblems = [],
}: {
  sharedProblems?: SharedProblemNotification[];
}) {
  const [alarms, setAlarms] = useState(initialAlarms);
  const [showChallenge, setShowChallenge] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct">("idle");
  const [activeNav, setActiveNav] = useState("알람");
  const [ringingAlarm, setRingingAlarm] = useState<Alarm | null>(null);
  const [selectedAlarmId, setSelectedAlarmId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [settingsPanel, setSettingsPanel] = useState<
    "clock" | "groups" | "problems" | null
  >(null);
  const [alarmGroups, setAlarmGroups] = useState<AlarmGroup[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupAlarmIds, setGroupAlarmIds] = useState<number[]>([]);
  const [clockSyncMessage, setClockSyncMessage] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [upcomingAlarms, setUpcomingAlarms] = useState<UpcomingAlarm[]>([]);
  const [detectedText, setDetectedText] = useState("");
  const [capturedImage, setCapturedImage] = useState("");
  const [scannedProblems, setScannedProblems] = useState<string[]>([]);
  const lastTriggeredAlarm = useRef("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const selectedAlarm =
    alarms.find((alarm) => alarm.id === selectedAlarmId) ?? null;
  const savedProblems = [
    ...scannedProblems,
    ...wrongProblems.map((problem) => problem.problem),
  ].filter((problem, index, items) => items.indexOf(problem) === index);

  const stopCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
  };

  const openScanner = () => {
    setCameraError("");
    setDetectedText("");
    setCapturedImage("");
    setScanProgress(0);
    setIsScanning(false);
    setShowScanner(true);
  };

  const closeScanner = () => {
    stopCamera();
    setShowScanner(false);
    const scanner = document.getElementById("problem-scanner");
    if (scanner?.matches(":popover-open")) scanner.hidePopover();
  };

  useEffect(() => {
    const refreshUpcomingAlarms = () => {
      setUpcomingAlarms(getUpcomingAlarms(alarms));
    };

    refreshUpcomingAlarms();
    const timer = window.setInterval(refreshUpcomingAlarms, 60_000);
    return () => window.clearInterval(timer);
  }, [alarms]);

  useEffect(() => {
    if (!showScanner) return;

    let cancelled = false;

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("이 기기에서는 카메라를 바로 열 수 없어요. 사진을 선택해 주세요.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            height: { ideal: 1280 },
            width: { ideal: 960 },
          },
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        cameraStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setCameraError(
          "카메라 권한을 허용하면 문제를 바로 촬영할 수 있어요. 또는 아래에서 사진을 선택해 주세요.",
        );
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [showScanner]);

  const recognizeImage = async (image: string | File) => {
    setIsScanning(true);
    setScanProgress(3);
    setCameraError("");

    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(["kor", "eng"], undefined, {
        logger: (message) => {
          if (typeof message.progress === "number") {
            setScanProgress(Math.max(3, Math.round(message.progress * 100)));
          }
        },
      });

      try {
        const {
          data: { text },
        } = await worker.recognize(image);
        const cleanedText = text
          .replace(/[|]/g, "1")
          .replace(/\s*\n+\s*/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();

        setDetectedText(cleanedText);
        setScanProgress(100);
        if (!cleanedText) {
          setCameraError("글자를 찾지 못했어요. 문제를 더 가까이에서 다시 촬영해 주세요.");
        }
      } finally {
        await worker.terminate();
      }
    } catch {
      setCameraError(
        "글자를 읽는 중 문제가 생겼어요. 잠시 후 다시 시도하거나 직접 입력해 주세요.",
      );
    } finally {
      setIsScanning(false);
    }
  };

  const captureProblem = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError("카메라 준비가 끝난 뒤 다시 촬영해 주세요.");
      return;
    }

    const maxWidth = 1600;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.92);
    setCapturedImage(image);
    stopCamera();
    await recognizeImage(image);
  };

  const selectProblemImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    stopCamera();
    setCapturedImage(URL.createObjectURL(file));
    await recognizeImage(file);
    event.target.value = "";
  };

  const addScannedProblem = () => {
    const problem = detectedText.trim();
    if (!problem) {
      setCameraError("추가할 문제를 입력해 주세요.");
      return;
    }

    setScannedProblems((items) => [problem, ...items]);
    setActiveNav("문제");
    closeScanner();
  };

  const triggerAlarm = (alarm: Alarm) => {
    setAnswer("");
    setFeedback("idle");
    setRingingAlarm(alarm);
    setShowChallenge(true);
  };

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentPeriod = now.getHours() >= 12 ? "PM" : "AM";
      const currentTime = `${String(now.getHours() % 12 || 12).padStart(2, "0")}:${String(
        now.getMinutes(),
      ).padStart(2, "0")}`;
      const today = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];

      const dueAlarm = alarms.find(
        (alarm) =>
          alarm.active &&
          alarm.time === currentTime &&
          alarm.period === currentPeriod &&
          (alarm.days === "매일" || alarm.days.includes(today)),
      );

      if (!dueAlarm) return;

      const triggerKey = `${now.toDateString()}-${dueAlarm.id}-${currentTime}`;
      if (lastTriggeredAlarm.current !== triggerKey) {
        lastTriggeredAlarm.current = triggerKey;
        triggerAlarm(dueAlarm);
      }
    };

    checkAlarms();
    const timer = window.setInterval(checkAlarms, 1000);
    return () => window.clearInterval(timer);
  }, [alarms]);

  const toggleAlarm = (id: number) => {
    setAlarms((items) =>
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item,
      ),
    );
  };

  const updateSelectedAlarm = (changes: Partial<Alarm>) => {
    if (selectedAlarmId === null) return;
    setAlarms((items) =>
      items.map((item) =>
        item.id === selectedAlarmId ? { ...item, ...changes } : item,
      ),
    );
  };

  const updateAlarmTime = (value: string) => {
    const [hourString, minute] = value.split(":");
    const hour = Number(hourString);
    updateSelectedAlarm({
      period: hour >= 12 ? "PM" : "AM",
      time: `${String(hour % 12 || 12).padStart(2, "0")}:${minute}`,
    });
  };

  const deleteSelectedAlarm = () => {
    if (selectedAlarmId === null) return;
    setAlarms((items) => items.filter((item) => item.id !== selectedAlarmId));
    setShowDeleteConfirm(false);
    setSelectedAlarmId(null);
  };

  const openGroupPanel = () => {
    setGroupName("");
    setGroupAlarmIds([]);
    setSettingsPanel("groups");
  };

  const saveAlarmGroup = () => {
    const name = groupName.trim();
    if (!name || groupAlarmIds.length === 0) return;

    setAlarmGroups((groups) => [
      ...groups,
      { id: Date.now(), name, alarmIds: groupAlarmIds },
    ]);
    setGroupName("");
    setGroupAlarmIds([]);
    setSettingsPanel(null);
  };

  const addAlarmToSystemClock = (alarm: Alarm) => {
    const [hour, minute] = to24HourTime(alarm).split(":").map(Number);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (!isAndroid) {
      setClockSyncMessage(
        "현재 기기에서는 시계 앱의 기존 알람을 자동으로 읽을 수 없어요. 아래 시간과 이름을 시계 앱에 직접 추가해 주세요.",
      );
      return;
    }

    const intent = [
      "intent:#Intent",
      "action=android.intent.action.SET_ALARM",
      `i.android.intent.extra.alarm.HOUR=${hour}`,
      `i.android.intent.extra.alarm.MINUTES=${minute}`,
      `S.android.intent.extra.alarm.MESSAGE=${encodeURIComponent(alarm.label)}`,
      "end",
    ].join(";");

    window.location.href = intent;
  };

  const checkAnswer = (event: FormEvent) => {
    event.preventDefault();
    if (answer.trim() === "42") {
      setFeedback("correct");
      window.setTimeout(() => {
        setShowChallenge(false);
        setRingingAlarm(null);
        setAnswer("");
        setFeedback("idle");
      }, 1000);
    } else {
      setFeedback("wrong");
    }
  };

  const addAlarm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rawTime = String(data.get("time") || "07:00");
    const [hourString, minute] = rawTime.split(":");
    const hour = Number(hourString);
    setAlarms((items) => [
      ...items,
      {
        id: Date.now(),
        time: `${String(hour % 12 || 12).padStart(2, "0")}:${minute}`,
        period: hour >= 12 ? "PM" : "AM",
        label: String(data.get("label") || "새 알람"),
        days: "매일",
        difficulty: "보통 · 3문제",
        volume: 70,
        active: true,
      },
    ]);
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-ivory-deep text-[#1d2924] sm:py-6">
      <div className="relative mx-auto min-h-screen max-w-[430px] overflow-hidden bg-ivory shadow-[0_24px_80px_rgba(19,77,55,.18)] sm:min-h-[calc(100vh-3rem)] sm:rounded-[36px]">
        <header className="flex items-center justify-between px-5 pb-4 pt-6">
          {selectedAlarm ? (
            <>
              <button
                type="button"
                onClick={() => setSelectedAlarmId(null)}
                aria-label="알람 목록으로 돌아가기"
                className="flex size-11 items-center justify-center rounded-full bg-white text-[#506159] shadow-sm"
              >
                <Icon name="arrow-left" size={21} />
              </button>
              <div className="ml-3 flex-1">
                <p className="text-xs font-semibold text-[#77847e]">
                  변경사항 자동 저장
                </p>
                <h1 className="mt-1 text-xl font-extrabold tracking-[-0.04em]">
                  알람 설정
                </h1>
              </div>
              <Toggle
                active={selectedAlarm.active}
                onClick={() =>
                  updateSelectedAlarm({ active: !selectedAlarm.active })
                }
                label={`${selectedAlarm.label} 알람 ${
                  selectedAlarm.active ? "끄기" : "켜기"
                }`}
              />
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-semibold text-[#77847e]">
                  {activeNav === "문제"
                    ? "두뇌 깨우기"
                    : activeNav === "기록"
                      ? "나의 기상 리포트"
                      : activeNav === "설정"
                        ? "나에게 맞는 깨움"
                        : "5월 24일 토요일"}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.04em]">
                  {activeNav === "문제"
                    ? "문제 연습"
                    : activeNav === "기록"
                      ? "기록"
                      : activeNav === "설정"
                        ? "설정"
                        : "좋은 아침이에요"}
                </h1>
              </div>
              <button
                type="button"
                aria-label="알림"
                aria-controls="notification-panel"
                aria-haspopup="dialog"
                popoverTarget="notification-panel"
                className="relative z-20 flex size-11 touch-manipulation items-center justify-center rounded-full bg-white text-[#506159] shadow-sm"
              >
                <Icon name="bell" size={20} />
                {(alarms.some((alarm) => alarm.active) ||
                  sharedProblems.length > 0) && (
                  <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-[#f06a5d]" />
                )}
              </button>
            </>
          )}
        </header>

        <section
          id="notification-panel"
          aria-label="알림"
          popover="auto"
          className="fixed inset-x-4 bottom-auto top-[88px] z-40 mx-auto max-h-[calc(100vh-132px)] w-[calc(100%-2rem)] max-w-[398px] overflow-y-auto rounded-[26px] border border-[#e7e1d5] bg-white p-5 text-[#1d2924] shadow-[0_20px_55px_rgba(28,52,43,.22)]"
        >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-extrabold tracking-[-0.03em]">알림</p>
                  <p className="mt-1 text-[11px] text-[#8a9891]">
                    예정된 알람과 새로 공유된 문제예요
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="알림 닫기"
                  popoverTarget="notification-panel"
                  popoverTargetAction="hide"
                  className="flex size-9 items-center justify-center rounded-xl bg-ivory-muted text-[#6f7d76]"
                >
                  <Icon name="close" size={17} />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs font-extrabold">24시간 내 울릴 알람</p>
                <span className="rounded-full bg-[#e8f6f0] px-2.5 py-1 text-[10px] font-bold text-[#15966a]">
                  {upcomingAlarms.length}개
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {upcomingAlarms.length > 0 ? (
                  upcomingAlarms.map((alarm) => (
                    <article
                      key={`${alarm.id}-${alarm.day}`}
                      className="flex items-center gap-3 rounded-2xl bg-[#f1f8f4] p-3.5"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#15966a] shadow-sm">
                        <Icon name="alarm" size={19} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-xs font-extrabold">{alarm.label}</p>
                          <span className="shrink-0 text-[10px] font-bold text-[#15966a]">
                            {alarm.remaining}
                          </span>
                        </div>
                        <p className="mt-1 text-[10px] text-[#7b8982]">
                          {alarm.day} · {alarm.time}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl bg-[#f5f5f2] px-4 py-5 text-center">
                    <p className="text-xs font-semibold text-[#7b8982]">
                      24시간 안에 울릴 알람이 없어요
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#edf1ef] pt-5">
                <p className="text-xs font-extrabold">친구들이 공유한 문제</p>
                <span className="rounded-full bg-ivory-muted px-2.5 py-1 text-[10px] font-bold text-[#9a6d25]">
                  NEW {sharedProblems.length}
                </span>
              </div>
              <div className="mt-3 space-y-2.5">
                {sharedProblems.length > 0 ? (
                  sharedProblems.map((problem) => (
                    <article
                      key={problem.id}
                      className="rounded-2xl border border-[#eee8dc] bg-ivory p-3.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#173d30] text-xs font-extrabold text-white">
                          {problem.authorName.slice(0, 1)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold">
                            {problem.authorName}님이 문제를 공유했어요
                          </p>
                          <p className="mt-0.5 text-[9px] text-[#969087]">
                            {problem.sharedAt} · {problem.category} · {problem.difficulty}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 rounded-xl bg-white px-3.5 py-3 text-center text-base font-extrabold tracking-[-0.02em]">
                        {problem.problem}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl bg-ivory px-4 py-5 text-center">
                    <p className="text-xs font-semibold text-[#7b8982]">
                      아직 공유된 문제가 없어요
                    </p>
                  </div>
                )}
              </div>
        </section>

        <main
          className={`h-[calc(100vh-96px)] overflow-y-auto px-5 sm:h-[calc(100vh-144px)] ${
            selectedAlarm ? "pb-10" : "pb-32"
          }`}
        >
          {selectedAlarm ? (
            <>
              <section className="relative mt-3 overflow-hidden rounded-[28px] bg-[#173d30] p-6 text-white shadow-[0_18px_40px_rgba(23,61,48,.2)]">
                <div className="absolute -right-8 -top-8 size-28 rounded-full bg-white/5" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#b9d4c9]">
                      {selectedAlarm.days}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-[#7ce0b7]">
                      <Icon name="alarm" size={20} />
                    </span>
                  </div>
                  <div className="mt-7 flex items-end gap-2">
                    <p className="text-[52px] font-extrabold leading-none tracking-[-0.07em]">
                      {selectedAlarm.time}
                    </p>
                    <p className="mb-1 text-sm font-bold text-[#b9d4c9]">
                      {selectedAlarm.period}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#d8eee5]">
                    {selectedAlarm.label}
                  </p>
                </div>
              </section>

              <section className="mt-5 rounded-[24px] border border-[#e7e1d5] bg-white p-5 shadow-[0_6px_22px_rgba(44,69,58,.05)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e8f6f0] text-[#15966a]">
                    <Icon name="clock" size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">알람 울릴 시간</p>
                    <p className="mt-0.5 text-[10px] text-[#8a9891]">
                      시간을 누르면 바로 변경할 수 있어요
                    </p>
                  </div>
                </div>
                <input
                  type="time"
                  value={to24HourTime(selectedAlarm)}
                  onChange={(event) => updateAlarmTime(event.target.value)}
                  aria-label="알람 울릴 시간"
                  className="mt-5 w-full rounded-2xl border border-[#e2ddd3] bg-ivory px-4 py-4 text-center text-3xl font-extrabold tracking-[-0.04em] text-[#173d30] outline-none focus:border-[#15966a]"
                />
              </section>

              <section className="mt-4 rounded-[24px] border border-[#e7e1d5] bg-white p-5 shadow-[0_6px_22px_rgba(44,69,58,.05)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-ivory-muted text-[#9a6d25]">
                      <Icon name="volume" size={19} />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold">알람 볼륨</p>
                      <p className="mt-0.5 text-[10px] text-[#8a9891]">
                        기상하기 좋은 크기로 맞춰보세요
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-[#15966a]">
                    {selectedAlarm.volume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={selectedAlarm.volume}
                  onChange={(event) =>
                    updateSelectedAlarm({ volume: Number(event.target.value) })
                  }
                  aria-label="알람 볼륨"
                  className="mt-5 h-2 w-full cursor-pointer accent-[#15966a]"
                />
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-[#9aa6a0]">
                  <span>작게</span>
                  <span>크게</span>
                </div>
              </section>

              <section className="mt-4 rounded-[24px] border border-[#e7e1d5] bg-white p-5 shadow-[0_6px_22px_rgba(44,69,58,.05)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e8f6f0] text-[#15966a]">
                    <Icon name="target" size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">문제 난이도</p>
                    <p className="mt-0.5 text-[10px] text-[#8a9891]">
                      알람을 끄기 위해 풀 문제를 선택해요
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  {[
                    { label: "쉬움", detail: "2문제", value: "쉬움 · 2문제" },
                    { label: "보통", detail: "3문제", value: "보통 · 3문제" },
                    { label: "어려움", detail: "5문제", value: "어려움 · 5문제" },
                  ].map((level) => {
                    const isSelected = selectedAlarm.difficulty === level.value;
                    return (
                      <button
                        type="button"
                        key={level.label}
                        onClick={() =>
                          updateSelectedAlarm({ difficulty: level.value })
                        }
                        className={`rounded-2xl border px-2 py-3.5 text-center transition ${
                          isSelected
                            ? "border-[#15966a] bg-[#e8f6f0] text-[#117c59]"
                            : "border-[#e7e1d5] bg-ivory text-[#6f7d76]"
                        }`}
                      >
                        <span className="block text-xs font-extrabold">
                          {level.label}
                        </span>
                        <span className="mt-1 block text-[9px] font-semibold opacity-70">
                          {level.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mt-6 rounded-[24px] border border-[#f2d5d0] bg-[#fff6f4] p-5">
                <p className="text-sm font-extrabold text-[#b84e40]">알람 삭제</p>
                <p className="mt-1 text-[11px] leading-5 text-[#9d746e]">
                  삭제하면 이 알람의 시간과 문제 설정을 되돌릴 수 없어요.
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#edc7c0] bg-white py-3 text-xs font-extrabold text-[#c65345]"
                >
                  <Icon name="trash" size={16} />
                  이 알람 삭제하기
                </button>
              </section>
            </>
          ) : activeNav === "문제" ? (
            <>
              <section className="relative mt-3 overflow-hidden rounded-[28px] bg-[#173d30] p-6 text-white">
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-[#2c5c49]" />
                <div className="absolute -bottom-16 -left-8 size-36 rounded-full border-[22px] border-white/5" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#7ce0b7]">
                      <Icon name="sparkle" size={22} />
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#b9d4c9]">
                      오늘 0 / 5
                    </span>
                  </div>
                  <h2 className="mt-7 text-2xl font-extrabold tracking-[-0.04em]">
                    잠든 두뇌를
                    <br />
                    가볍게 깨워볼까요?
                  </h2>
                  <p className="mt-3 text-xs leading-5 text-[#b9d4c9]">
                    매일 5문제로 계산 속도와 집중력을 높여보세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowChallenge(true)}
                    className="mt-6 flex w-full items-center justify-between rounded-2xl bg-[#27a878] px-4 py-3.5 text-sm font-extrabold"
                  >
                    오늘의 문제 시작
                    <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                      <Icon name="chevron" size={16} />
                    </span>
                  </button>
                </div>
              </section>

              <section className="mt-7">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h2 className="text-lg font-extrabold tracking-[-0.03em]">난이도 선택</h2>
                    <p className="mt-1 text-xs text-[#8a9891]">내 수준에 맞게 연습해요</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      title: "쉬움",
                      detail: "기초 연산",
                      color: "bg-[#e9f7f0] text-[#17845f]",
                      dots: 1,
                    },
                    {
                      title: "보통",
                      detail: "혼합 계산",
                      color: "bg-ivory-muted text-[#a86d0d]",
                      dots: 2,
                    },
                    {
                      title: "어려움",
                      detail: "응용 문제",
                      color: "bg-[#ffebe7] text-[#d65a49]",
                      dots: 3,
                    },
                  ].map((level) => (
                    <button
                      type="button"
                      key={level.title}
                      onClick={() => setShowChallenge(true)}
                      className="rounded-[20px] border border-[#e4ece8] bg-white p-3.5 text-left shadow-[0_5px_18px_rgba(44,69,58,.04)]"
                    >
                      <span
                        className={`mb-4 flex size-9 items-center justify-center rounded-xl ${level.color}`}
                      >
                        <Icon name="target" size={18} />
                      </span>
                      <p className="text-sm font-extrabold">{level.title}</p>
                      <p className="mt-1 text-[10px] text-[#8a9891]">{level.detail}</p>
                      <div className="mt-3 flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <span
                            key={dot}
                            className={`h-1 flex-1 rounded-full ${
                              dot <= level.dots ? "bg-[#15966a]" : "bg-[#dce5e0]"
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-7">
                <h2 className="mb-4 text-lg font-extrabold tracking-[-0.03em]">
                  문제 유형
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      title: "빠른 계산",
                      detail: "사칙연산 · 10문제",
                      icon: "clock",
                      tone: "bg-[#e8f6f0] text-[#15966a]",
                    },
                    {
                      title: "빈칸 채우기",
                      detail: "수 감각 · 8문제",
                      icon: "book",
                      tone: "bg-ivory-muted text-[#a86d0d]",
                    },
                    {
                      title: "집중력 테스트",
                      detail: "응용 연산 · 5문제",
                      icon: "target",
                      tone: "bg-[#eaf0ff] text-[#5771bb]",
                    },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.title}
                      onClick={() => setShowChallenge(true)}
                      className="flex w-full items-center rounded-[20px] border border-[#e4ece8] bg-white p-4 text-left shadow-[0_5px_18px_rgba(44,69,58,.04)]"
                    >
                      <span
                        className={`flex size-11 items-center justify-center rounded-2xl ${item.tone}`}
                      >
                        <Icon name={item.icon as IconName} size={20} />
                      </span>
                      <span className="ml-3.5 flex-1">
                        <span className="block text-sm font-extrabold">{item.title}</span>
                        <span className="mt-1 block text-[11px] text-[#8a9891]">
                          {item.detail}
                        </span>
                      </span>
                      <span className="text-[#9aa6a0]">
                        <Icon name="chevron" size={17} />
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-7 rounded-[22px] bg-[#eaf6f0] p-5">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#15966a]">
                    <Icon name="check" size={21} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold">최근 풀이</p>
                    <p className="mt-1 text-xs text-[#74837c]">
                      보통 난이도 · 3문제 정답
                    </p>
                  </div>
                  <span className="text-lg font-extrabold text-[#15966a]">100%</span>
                </div>
              </section>

              {scannedProblems.length > 0 && (
                <section className="mt-7">
                  <div className="mb-4">
                    <p className="text-lg font-extrabold tracking-[-0.03em]">
                      내가 추가한 문제
                    </p>
                    <p className="mt-1 text-xs text-[#8a9891]">
                      카메라로 읽어 저장한 문제예요
                    </p>
                  </div>
                  <div className="space-y-3">
                    {scannedProblems.map((problem, index) => (
                      <article
                        key={`${problem}-${index}`}
                        className="rounded-[20px] border border-[#e4ece8] bg-white p-4 shadow-[0_5px_18px_rgba(44,69,58,.04)]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ivory-muted text-[#9a6d25]">
                            <Icon name="camera" size={17} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold text-[#15966a]">
                              스캔 문제 {scannedProblems.length - index}
                            </p>
                            <p className="mt-2 text-sm font-extrabold leading-6">
                              {problem}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : activeNav === "기록" ? (
            <HistoryView />
          ) : activeNav === "설정" ? (
            <>
              <section className="relative mt-3 overflow-hidden rounded-[28px] bg-[#173d30] p-6 text-white shadow-[0_18px_40px_rgba(23,61,48,.2)]">
                <div className="absolute -right-10 -top-12 size-36 rounded-full border-[22px] border-white/5" />
                <div className="relative">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[#7ce0b7]">
                    <Icon name="settings" size={22} />
                  </span>
                  <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.04em]">
                    깨움을 내 생활에
                    <br />
                    더 잘 맞춰보세요
                  </h2>
                  <p className="mt-3 text-xs leading-5 text-[#b9d4c9]">
                    알람과 문제를 한곳에서 연결하고 정리할 수 있어요.
                  </p>
                </div>
              </section>

              <section className="mt-7">
                <div className="mb-4">
                  <p className="text-lg font-extrabold tracking-[-0.03em]">
                    연결 및 관리
                  </p>
                  <p className="mt-1 text-xs text-[#8a9891]">
                    필요한 설정을 선택해 주세요
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "기기 시계와 알람 연동",
                      detail: `활성 알람 ${alarms.filter((alarm) => alarm.active).length}개`,
                      icon: "clock",
                      tone: "bg-[#e8f6f0] text-[#15966a]",
                      action: () => {
                        setClockSyncMessage("");
                        setSettingsPanel("clock");
                      },
                    },
                    {
                      title: "알람 그룹으로 묶기",
                      detail:
                        alarmGroups.length > 0
                          ? `${alarmGroups.length}개 그룹을 사용 중이에요`
                          : "평일·주말 알람을 함께 관리해요",
                      icon: "alarm",
                      tone: "bg-ivory-muted text-[#9a6d25]",
                      action: openGroupPanel,
                    },
                    {
                      title: "저장된 문제 모아보기",
                      detail: `${savedProblems.length}개의 문제가 저장되어 있어요`,
                      icon: "book",
                      tone: "bg-[#eaf0ff] text-[#5771bb]",
                      action: () => setSettingsPanel("problems"),
                    },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.title}
                      onClick={item.action}
                      className="flex w-full items-center rounded-[22px] border border-[#e7e1d5] bg-white p-4 text-left shadow-[0_6px_22px_rgba(44,69,58,.05)] transition hover:-translate-y-0.5"
                    >
                      <span
                        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}
                      >
                        <Icon name={item.icon as IconName} size={21} />
                      </span>
                      <span className="ml-4 min-w-0 flex-1">
                        <span className="block text-sm font-extrabold">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[10px] text-[#8a9891]">
                          {item.detail}
                        </span>
                      </span>
                      <span className="text-[#9aa6a0]">
                        <Icon name="chevron" size={17} />
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {alarmGroups.length > 0 && (
                <section className="mt-7">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-extrabold tracking-[-0.03em]">
                        나의 알람 그룹
                      </p>
                      <p className="mt-1 text-xs text-[#8a9891]">
                        함께 묶어둔 알람이에요
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openGroupPanel}
                      className="text-xs font-bold text-[#15966a]"
                    >
                      + 그룹 추가
                    </button>
                  </div>
                  <div className="space-y-3">
                    {alarmGroups.map((group) => (
                      <article
                        key={group.id}
                        className="rounded-[22px] border border-[#e7e1d5] bg-white p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-extrabold">{group.name}</p>
                            <p className="mt-1 text-[10px] text-[#8a9891]">
                              {group.alarmIds.length}개 알람
                            </p>
                          </div>
                          <div className="flex -space-x-2">
                            {group.alarmIds.slice(0, 3).map((id) => (
                              <span
                                key={id}
                                className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#e8f6f0] text-[#15966a]"
                              >
                                <Icon name="alarm" size={14} />
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
          <section className="relative mt-3 overflow-hidden rounded-[30px] bg-[#15966a] p-6 text-white shadow-[0_18px_40px_rgba(21,150,106,.24)]">
            <div className="absolute -right-10 -top-10 size-36 rounded-full border-[24px] border-white/5" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-[#dcf6eb]">
                  다음 알람
                </span>
                <Toggle
                  active={alarms[0]?.active ?? false}
                  onClick={() => toggleAlarm(alarms[0].id)}
                  label="다음 알람 켜기 또는 끄기"
                />
              </div>
              <div className="mt-8 flex items-end gap-2">
                <p className="text-[58px] font-extrabold leading-none tracking-[-0.07em]">06:30</p>
                <p className="mb-1 text-base font-bold text-[#c8efdf]">AM</p>
              </div>
              <p className="mt-3 text-sm font-medium text-[#d8f5e9]">월요일 · 상쾌한 아침</p>

              <div className="mt-7 flex items-center justify-between rounded-2xl bg-[#087c56]/65 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
                    <Icon name="book" size={19} />
                  </span>
                  <div>
                    <p className="text-xs text-[#bfe8d8]">기상 미션</p>
                    <p className="mt-0.5 text-sm font-bold">수학 문제 3개</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerAlarm(alarms[0])}
                  className="rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#0f7f59]"
                >
                  알람 테스트
                </button>
              </div>
            </div>
          </section>

          <section className="mt-7">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.03em]">나의 알람</h2>
                <p className="mt-1 text-xs text-[#8a9891]">{alarms.filter((alarm) => alarm.active).length}개가 켜져 있어요</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="text-xs font-bold text-[#15966a]"
              >
                + 알람 추가
              </button>
            </div>

            <div className="space-y-3">
              {alarms.map((alarm) => (
                <article
                  key={alarm.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedAlarmId(alarm.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedAlarmId(alarm.id);
                    }
                  }}
                  className={`cursor-pointer rounded-[22px] border bg-white p-4 shadow-[0_6px_22px_rgba(44,69,58,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(44,69,58,.09)] focus:outline-none focus:ring-2 focus:ring-[#15966a]/20 ${
                    alarm.active ? "border-[#e2ebe6]" : "border-[#edf0ee] opacity-55"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-[27px] font-extrabold tracking-[-0.05em]">{alarm.time}</p>
                        <span className="text-[11px] font-bold text-[#829089]">{alarm.period}</span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#6f7d76]">{alarm.label}</p>
                    </div>
                    <Toggle
                      active={alarm.active}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleAlarm(alarm.id);
                      }}
                      label={`${alarm.label} 알람 ${alarm.active ? "끄기" : "켜기"}`}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 border-t border-[#edf1ef] pt-3 text-[10px] font-semibold text-[#8b9892]">
                    <span className="rounded-lg bg-[#f1f7f4] px-2.5 py-1.5">{alarm.days}</span>
                    <span className="flex items-center gap-1 rounded-lg bg-[#f1f7f4] px-2.5 py-1.5">
                      <Icon name="book" size={12} />
                      {alarm.difficulty}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
            </>
          )}
        </main>

        {!selectedAlarm && (
        <nav className="absolute inset-x-0 bottom-0 z-30 flex h-[84px] items-center justify-around border-t border-[#e5ece8] bg-white/95 px-4 pb-2 backdrop-blur-xl">
          {[
            ["알람", "home"],
            ["문제", "book"],
            ["기록", "chart"],
            ["설정", "settings"],
          ].map(([label, icon], index) => (
            <div key={label} className={index === 2 ? "ml-14" : ""}>
              <button
                type="button"
                onClick={() => setActiveNav(label)}
                className={`flex min-w-12 flex-col items-center gap-1.5 text-[10px] font-bold ${
                  activeNav.startsWith(label) ? "text-[#15966a]" : "text-[#9aa6a0]"
                }`}
              >
                <Icon name={icon as IconName} size={20} />
                {label}
              </button>
            </div>
          ))}
          <button
            type="button"
            aria-label="카메라로 문제 추가하기"
            popoverTarget="problem-scanner"
            className="absolute left-1/2 top-0 flex size-14 -translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full border-[5px] border-ivory bg-[#15966a] text-white shadow-[0_8px_22px_rgba(21,150,106,.3)]"
          >
            <Icon name="camera" size={23} />
          </button>
        </nav>
        )}
      </div>

      {showChallenge && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-sm ${
            ringingAlarm ? "bg-[#0b2119]/90" : "bg-[#17151f]/60"
          }`}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="challenge-title"
            className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-11 items-center justify-center rounded-2xl ${
                  ringingAlarm
                    ? "animate-pulse bg-[#15966a] text-white"
                    : "bg-[#e7f7f0] text-[#15966a]"
                }`}
              >
                <Icon name={ringingAlarm ? "alarm" : "book"} size={21} />
              </div>
              {!ringingAlarm && (
                <button
                  type="button"
                  onClick={() => setShowChallenge(false)}
                  aria-label="닫기"
                  className="flex size-9 items-center justify-center rounded-xl bg-[#f5f4f7] text-[#7e7987]"
                >
                  <Icon name="close" size={18} />
                </button>
              )}
            </div>
            <p className="mt-6 text-xs font-bold tracking-[0.12em] text-[#15966a]">
              {ringingAlarm ? "ALARM MISSION · 해제 불가" : "WARM UP · 1 / 3"}
            </p>
            <h2 id="challenge-title" className="mt-2 text-2xl font-bold">
              {ringingAlarm
                ? `${ringingAlarm.label} 알람이에요!`
                : "다음 식의 답은 무엇인가요?"}
            </h2>
            {ringingAlarm && (
              <p className="mt-2 text-sm leading-6 text-[#6f7d76]">
                정답을 맞혀야 알람을 끌 수 있어요.
              </p>
            )}
            <div className="my-7 rounded-2xl bg-ivory-muted py-8 text-center text-3xl font-bold tracking-wide">
              8 × 6 − 12 ÷ 2
            </div>
            <form onSubmit={checkAnswer}>
              <label htmlFor="answer" className="mb-2 block text-xs font-semibold">
                정답 입력
              </label>
              <input
                id="answer"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setFeedback("idle");
                }}
                inputMode="numeric"
                autoFocus
                placeholder="숫자를 입력하세요"
                className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition ${
                  feedback === "wrong"
                    ? "border-[#ff6c5c] ring-2 ring-[#ff6c5c]/10"
                    : feedback === "correct"
                      ? "border-[#30b983] ring-2 ring-[#30b983]/10"
                      : "border-[#dedbe4] focus:border-[#15966a] focus:ring-2 focus:ring-[#15966a]/10"
                }`}
              />
              <p
                className={`mt-2 min-h-5 text-xs font-medium ${
                  feedback === "wrong"
                    ? "text-[#e45143]"
                    : "text-[#27a975]"
                }`}
              >
                {feedback === "wrong" && "조금 아쉬워요. 다시 계산해 보세요."}
                {feedback === "correct" && "정답이에요. 완벽한 시작이에요!"}
              </p>
              <button
                type="submit"
                className="mt-3 w-full rounded-xl bg-[#15966a] py-3.5 text-sm font-bold text-white transition hover:bg-[#0f7f59]"
              >
                {ringingAlarm ? "정답 확인하고 알람 끄기" : "정답 확인"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17151f]/60 p-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-title"
            className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#15966a]">NEW ALARM</p>
                <h2 id="add-title" className="mt-1 text-2xl font-bold">
                  새 알람 만들기
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                aria-label="닫기"
                className="flex size-9 items-center justify-center rounded-xl bg-[#f5f4f7] text-[#7e7987]"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <form onSubmit={addAlarm} className="mt-7 space-y-5">
              <label className="block text-xs font-semibold">
                시간
                <input
                  name="time"
                  type="time"
                  defaultValue="07:00"
                  required
                  className="mt-2 w-full rounded-xl border border-[#dedbe4] px-4 py-3.5 text-sm outline-none focus:border-[#15966a]"
                />
              </label>
              <label className="block text-xs font-semibold">
                알람 이름
                <input
                  name="label"
                  defaultValue="기분 좋은 아침"
                  required
                  className="mt-2 w-full rounded-xl border border-[#dedbe4] px-4 py-3.5 text-sm outline-none focus:border-[#15966a]"
                />
              </label>
              <div className="rounded-2xl bg-ivory-muted p-4">
                <p className="text-xs font-semibold">기상 미션</p>
                <p className="mt-1 text-sm text-[#777281]">
                  수학 문제 3개 · 난이도 보통
                </p>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#15966a] py-3.5 text-sm font-bold text-white hover:bg-[#0f7f59]"
              >
                알람 저장하기
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && selectedAlarm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#17151f]/60 p-5 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-alarm-title"
            className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#fff0ed] text-[#c65345]">
              <Icon name="trash" size={20} />
            </span>
            <h2
              id="delete-alarm-title"
              className="mt-5 text-xl font-extrabold tracking-[-0.03em]"
            >
              {selectedAlarm.label} 알람을 삭제할까요?
            </h2>
            <p className="mt-2 text-xs leading-5 text-[#7b8982]">
              설정한 시간, 볼륨, 문제 난이도가 모두 삭제돼요.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-2xl bg-[#f2f3f1] py-3 text-xs font-extrabold text-[#66736d]"
              >
                취소
              </button>
              <button
                type="button"
                onClick={deleteSelectedAlarm}
                className="rounded-2xl bg-[#d75d4e] py-3 text-xs font-extrabold text-white"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsPanel && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#17151f]/60 backdrop-blur-sm sm:items-center sm:p-5">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-panel-title"
            className="max-h-[88vh] w-full max-w-md overflow-hidden rounded-t-[30px] bg-ivory shadow-2xl sm:rounded-[30px]"
          >
            <div className="flex items-start justify-between border-b border-[#ece5d8] px-5 pb-4 pt-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#15966a]">
                  {settingsPanel === "clock"
                    ? "CLOCK SYNC"
                    : settingsPanel === "groups"
                      ? "ALARM GROUP"
                      : "SAVED PROBLEMS"}
                </p>
                <h2
                  id="settings-panel-title"
                  className="mt-1 text-xl font-extrabold tracking-[-0.03em]"
                >
                  {settingsPanel === "clock"
                    ? "기기 시계와 연동"
                    : settingsPanel === "groups"
                      ? "새 알람 그룹"
                      : "저장된 문제"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSettingsPanel(null)}
                aria-label="닫기"
                className="flex size-10 items-center justify-center rounded-xl bg-white text-[#6f7d76] shadow-sm"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="max-h-[calc(88vh-86px)] overflow-y-auto px-5 py-5">
              {settingsPanel === "clock" && (
                <>
                  <div className="rounded-2xl bg-[#e8f6f0] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#15966a]">
                        <Icon name="clock" size={18} />
                      </span>
                      <p className="text-[11px] leading-5 text-[#527266]">
                        보안 정책상 시계 앱에 이미 저장된 알람을 웹에서 자동으로
                        읽을 수는 없어요. Android에서는 아래 알람을 시계 앱으로
                        보낼 수 있어요.
                      </p>
                    </div>
                  </div>

                  {clockSyncMessage && (
                    <div className="mt-3 rounded-2xl bg-ivory-muted px-4 py-3 text-[11px] leading-5 text-[#80632e]">
                      {clockSyncMessage}
                    </div>
                  )}

                  <div className="mt-5 space-y-3">
                    {alarms.map((alarm) => (
                      <article
                        key={alarm.id}
                        className="flex items-center gap-3 rounded-[20px] border border-[#e7e1d5] bg-white p-4"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f4] text-[#15966a]">
                          <Icon name="alarm" size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold">
                            {alarm.time}{" "}
                            <span className="text-[10px] text-[#8a9891]">
                              {alarm.period}
                            </span>
                          </p>
                          <p className="mt-1 truncate text-[10px] text-[#7b8982]">
                            {alarm.label} · {alarm.days}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addAlarmToSystemClock(alarm)}
                          className="shrink-0 rounded-xl bg-[#15966a] px-3 py-2 text-[10px] font-extrabold text-white"
                        >
                          시계에 추가
                        </button>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {settingsPanel === "groups" && (
                <>
                  <label className="block text-xs font-extrabold">
                    그룹 이름
                    <input
                      value={groupName}
                      onChange={(event) => setGroupName(event.target.value)}
                      placeholder="예: 평일 아침 루틴"
                      className="mt-2 w-full rounded-2xl border border-[#ddd5c5] bg-white px-4 py-3.5 text-sm outline-none focus:border-[#15966a]"
                    />
                  </label>
                  <div className="mt-5">
                    <p className="text-xs font-extrabold">함께 묶을 알람</p>
                    <div className="mt-3 space-y-2.5">
                      {alarms.map((alarm) => {
                        const isSelected = groupAlarmIds.includes(alarm.id);
                        return (
                          <label
                            key={alarm.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-[18px] border p-3.5 transition ${
                              isSelected
                                ? "border-[#15966a] bg-[#e8f6f0]"
                                : "border-[#e7e1d5] bg-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                setGroupAlarmIds((ids) =>
                                  isSelected
                                    ? ids.filter((id) => id !== alarm.id)
                                    : [...ids, alarm.id],
                                )
                              }
                              className="size-4 accent-[#15966a]"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-extrabold">
                                {alarm.time}{" "}
                                <span className="text-[10px] text-[#8a9891]">
                                  {alarm.period}
                                </span>
                              </span>
                              <span className="mt-1 block truncate text-[10px] text-[#7b8982]">
                                {alarm.label}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={saveAlarmGroup}
                    disabled={!groupName.trim() || groupAlarmIds.length === 0}
                    className="mt-5 w-full rounded-2xl bg-[#173d30] py-3.5 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    선택한 알람으로 그룹 만들기
                  </button>
                </>
              )}

              {settingsPanel === "problems" && (
                <>
                  <div className="flex items-center justify-between rounded-2xl bg-[#eaf0ff] p-4">
                    <div>
                      <p className="text-xs font-extrabold text-[#4e65aa]">
                        저장된 문제
                      </p>
                      <p className="mt-1 text-[10px] text-[#7180ac]">
                        카메라 문제와 다시 볼 오답을 모았어요
                      </p>
                    </div>
                    <span className="text-2xl font-extrabold text-[#5771bb]">
                      {savedProblems.length}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {savedProblems.length > 0 ? (
                      savedProblems.map((problem, index) => (
                        <article
                          key={`${problem}-${index}`}
                          className="rounded-[20px] border border-[#e7e1d5] bg-white p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`rounded-lg px-2.5 py-1 text-[9px] font-bold ${
                                scannedProblems.includes(problem)
                                  ? "bg-[#e8f6f0] text-[#15966a]"
                                  : "bg-[#fff0ed] text-[#c65345]"
                              }`}
                            >
                              {scannedProblems.includes(problem)
                                ? "카메라 추가"
                                : "오답 저장"}
                            </span>
                            <span className="text-[9px] text-[#9aa6a0]">
                              문제 {index + 1}
                            </span>
                          </div>
                          <p className="mt-3 text-sm font-extrabold leading-6">
                            {problem}
                          </p>
                        </article>
                      ))
                    ) : (
                      <div className="rounded-2xl bg-white px-4 py-8 text-center">
                        <Icon name="book" size={24} />
                        <p className="mt-3 text-xs font-semibold text-[#7b8982]">
                          아직 저장된 문제가 없어요
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        id="problem-scanner"
        popover="auto"
        onToggle={(event) => {
          if (event.currentTarget.matches(":popover-open")) {
            openScanner();
          } else {
            closeScanner();
          }
        }}
        className="fixed inset-0 z-[60] m-0 h-screen w-screen max-w-none border-0 bg-[#071c15]/90 p-0 backdrop-blur-sm"
      >
        <div className="flex min-h-full items-end justify-center sm:items-center sm:p-5">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="scanner-title"
            className="flex max-h-[96vh] w-full max-w-md flex-col overflow-hidden rounded-t-[30px] bg-ivory shadow-2xl sm:rounded-[30px]"
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#15966a]">
                  PROBLEM SCAN
                </p>
                <h2 id="scanner-title" className="mt-1 text-xl font-extrabold">
                  카메라로 문제 추가
                </h2>
              </div>
              <button
                type="button"
                aria-label="닫기"
                popoverTarget="problem-scanner"
                popoverTargetAction="hide"
                className="flex size-10 items-center justify-center rounded-xl bg-white text-[#6f7d76] shadow-sm"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 pb-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#102a21]">
                {capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="촬영한 문제"
                    className="size-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="size-full object-cover"
                  />
                )}

                {!capturedImage && (
                  <>
                    <div className="pointer-events-none absolute inset-7 rounded-2xl border-2 border-dashed border-white/70" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
                      <span className="rounded-full bg-[#071c15]/65 px-3 py-1.5 text-[10px] font-semibold text-white">
                        문제의 글자가 프레임 안에 오도록 맞춰주세요
                      </span>
                    </div>
                  </>
                )}

                {isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071c15]/80 text-white">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#7ce0b7]">
                      <Icon name="sparkle" size={23} />
                    </span>
                    <p className="mt-3 text-sm font-extrabold">글자를 읽고 있어요</p>
                    <progress
                      value={scanProgress}
                      max="100"
                      className="scanner-progress mt-4 h-1.5 w-36 overflow-hidden rounded-full"
                    />
                    <p className="mt-2 text-[10px] text-white/70">{scanProgress}%</p>
                  </div>
                )}
              </div>

              {cameraError && (
                <div className="mt-3 rounded-2xl bg-[#fff0ed] px-4 py-3 text-xs font-medium leading-5 text-[#b84e40]">
                  {cameraError}
                </div>
              )}

              {!capturedImage && (
                <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                  <button
                    type="button"
                    onClick={captureProblem}
                    disabled={isScanning}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#15966a] py-3.5 text-sm font-extrabold text-white disabled:opacity-50"
                  >
                    <Icon name="camera" size={18} />
                    촬영하고 글자 읽기
                  </button>
                  <label className="flex size-12 cursor-pointer items-center justify-center rounded-2xl border border-[#ddd5c5] bg-white text-[#6f7d76]">
                    <span className="sr-only">사진에서 문제 선택</span>
                    <Icon name="book" size={19} />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={selectProblemImage}
                      className="sr-only"
                    />
                  </label>
                </div>
              )}

              {(capturedImage || detectedText) && (
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="detected-problem" className="text-xs font-extrabold">
                      인식한 문제
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setCapturedImage("");
                        setDetectedText("");
                        setCameraError("");
                        stopCamera();
                        setShowScanner(false);
                        window.setTimeout(() => setShowScanner(true), 20);
                      }}
                      className="text-[10px] font-bold text-[#15966a]"
                    >
                      다시 촬영
                    </button>
                  </div>
                  <textarea
                    id="detected-problem"
                    value={detectedText}
                    onChange={(event) => setDetectedText(event.target.value)}
                    placeholder="인식된 글자를 확인하거나 직접 입력해 주세요"
                    rows={3}
                    className="mt-2 w-full resize-none rounded-2xl border border-[#ddd5c5] bg-white px-4 py-3 text-sm font-semibold leading-6 outline-none focus:border-[#15966a] focus:ring-2 focus:ring-[#15966a]/10"
                  />
                  <button
                    type="button"
                    onClick={addScannedProblem}
                    disabled={isScanning || !detectedText.trim()}
                    className="mt-3 w-full rounded-2xl bg-[#173d30] py-3.5 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    이 문제 추가하기
                  </button>
                </div>
              )}

              <p className="mt-4 text-center text-[10px] leading-4 text-[#8a9891]">
                사진은 기기 안에서 글자 인식에만 사용되며 서버에 저장되지 않아요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
