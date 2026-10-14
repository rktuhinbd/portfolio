export const profile = {
  name: "Md. Rejaul Karim",
  role: "Senior Mobile Engineer",
  email: "rejaul.karim.pro@gmail.com",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/rktuhinbd",
  linkedin: "https://linkedin.com/in/rktuhinbd",
};
export const technologies = [
  {
    id: "compose",
    name: "Jetpack Compose",
    label: "MODERN ANDROID UI",
    short: "Interfaces that feel effortless.",
    description:
      "I build reactive Android interfaces and reusable UI systems with Jetpack Compose, ViewModel, and Navigation Component.",
    evidence:
      "At 10 Minute School, led the application-wide XML-to-Compose migration and built 30+ reusable Compose/XML components. At VALT, modernized legacy POS/KDS screens.",
    tags: ["Compose", "ViewModel", "Navigation", "Material UI"],
    metric: "30+",
    metricLabel: "reusable UI components",
    color: "#5a8aff",
  },
  {
    id: "architecture",
    name: "Clean Architecture",
    label: "BUILT TO EVOLVE",
    short: "Clear boundaries. Reliable systems.",
    description:
      "MVVM, repository patterns, modularization, and dependency injection keep mobile applications maintainable as products grow.",
    evidence:
      "Designed UAPM at VALT: a reusable printing layer that separates application logic from printer I/O across a 12-device hardware fleet.",
    tags: ["MVVM", "Hilt", "Modularization", "Repository"],
    metric: "12",
    metricLabel: "devices, one printing layer",
    color: "#b79aff",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    label: "NATIVE BY DESIGN",
    short: "Modern Android. Production proven.",
    description:
      "Kotlin is at the heart of my Android work, from modernizing large Java codebases to delivering production features.",
    evidence:
      "Migrated the monolithic 10 Minute School Android codebase from Java to Kotlin across a platform serving 100K+ active users.",
    tags: ["Kotlin", "Android SDK", "Gradle KTS", "JUnit"],
    metric: "100K+",
    metricLabel: "active users on the platform",
    color: "#bc8cff",
  },
  {
    id: "flutter",
    name: "Flutter",
    label: "TWO PLATFORMS. ONE CRAFT.",
    short: "Thoughtful experiences on Android & iOS.",
    description:
      "Cross-platform applications using Flutter and Dart, with Bloc, Riverpod, GetX, Dio, and platform channels.",
    evidence:
      "Delivered Android and iOS features at Repocket. Built the referral feature end-to-end, increasing engagement by 15% in its first month.",
    tags: ["Flutter", "Dart", "Bloc", "Platform Channels"],
    metric: "+15%",
    metricLabel: "first-month referral engagement",
    color: "#64d7ff",
  },
  {
    id: "flow",
    name: "Coroutines & Flow",
    label: "REACTIVE AT THE CORE",
    short: "Data in motion. UI in sync.",
    description:
      "Structured concurrency and reactive streams make asynchronous mobile work easier to reason about and maintain.",
    evidence:
      "At VALT, migrated LiveData and custom threading to Coroutines and Flow, alongside real-time kitchen order synchronization.",
    tags: ["Coroutines", "Flow", "WebSocket", "WorkManager"],
    metric: "POS / KDS",
    metricLabel: "real-time production workflows",
    color: "#6de3c0",
  },
  {
    id: "about",
    name: "The engineer",
    label: "BEHIND THE CODE",
    short: "Rejaul Karim. Mobile, thoughtfully built.",
    description:
      "Senior Mobile Engineer with 8+ years building Android and cross-platform products across EdTech, FinTech, consumer apps, and POS.",
    evidence:
      "Based in Dhaka, Bangladesh. My focus is modern mobile architecture, smooth user experiences, and reliable production delivery.",
    tags: ["Android", "Flutter", "Architecture"],
    metric: "8+",
    metricLabel: "years building mobile products",
    color: "#5a8aff",
  },
];
export type Technology = (typeof technologies)[number];
export const experience = [
  {
    company: "VALT",
    role: "Senior Software Engineer",
    period: "FEB 2026 — AUG 2026",
    location: "Sylhet, Bangladesh",
    points: [
      "Modernized a legacy Android POS/KDS platform: XML to Jetpack Compose, custom threading to Coroutines and Flow, and SQLite to Room.",
      "Designed the Universal Android Printing Module, separating business logic from printer I/O across a 12-device hardware fleet.",
      "Shipped restaurant and retail workflows with Bluetooth, USB and LAN printing and real-time kitchen order synchronization.",
    ],
    tags: ["Kotlin", "Compose", "Room", "ESC/POS"],
    milestone: "12 devices. One printing layer.",
    metric: "Reusable infrastructure for hardware-integrated Android systems.",
  },
  {
    company: "Repocket Pte. Ltd.",
    role: "Senior Mobile Application Developer",
    period: "NOV 2025 — JAN 2026",
    location: "Singapore · Remote",
    points: [
      "Delivered production features across Android and iOS in Flutter/Dart with a distributed engineering team.",
      "Built the referral feature end-to-end, increasing user engagement by 15% in its first month.",
    ],
    tags: ["Flutter", "Dart", "Android", "iOS"],
    milestone: "+15% engagement",
    metric: "First-month impact of the referral feature.",
  },
  {
    company: "10 Minute School",
    role: "Specialist, Engineering (Android)",
    period: "MAY 2023 — JUN 2025",
    location: "Dhaka, Bangladesh",
    points: [
      "Led the application-wide XML-to-Compose migration with 30+ reusable Compose/XML components and shared UI guidelines.",
      "Raised crash-free sessions from 91% to 98.87% through Crashlytics and root-cause analysis.",
      "Owned UI engineering for core learning surfaces and TARA, built with Monash University; shipped 2–3 major releases per quarter.",
    ],
    tags: ["Compose", "Kotlin", "Crashlytics", "UI Systems"],
    milestone: "98.87% crash-free sessions",
    metric: "Up from 91% through production debugging and root-cause analysis.",
    earlier: {
      role: "Associate Software Engineer",
      period: "AUG 2021 — MAY 2023",
      points: [
        "Migrated the monolithic Java codebase to Kotlin and initiated Compose adoption for 100K+ active users.",
        "Built a class-booking system for 360K+ users: 19% conversion and attendance rising from 16% to 35%.",
        "Shipped an exam module (+23% retention), gamified UI (+12% engagement), and course landing page redesign (+13% purchases).",
      ],
    },
  },
  {
    company: "Millennium Information Solution Ltd.",
    role: "Assistant Software Engineer",
    period: "OCT 2020 — JUL 2021",
    location: "Dhaka, Bangladesh",
    points: [
      "Built Android features for three live Islamic banking apps on MISL’s Ababil platform.",
      "Developed a reusable KYC SDK with ML Kit facial recognition and NID verification, increasing account creation by approximately 25% on average.",
    ],
    tags: ["Android", "Java", "ML Kit", "KYC"],
    milestone: "One SDK. Three banking apps.",
    metric: "Reusable identity verification infrastructure.",
  },
  {
    company: "CodeNext Ltd.",
    role: "Software Engineer",
    period: "APR 2019 — SEP 2020",
    location: "Dhaka, Bangladesh",
    points: [
      "Built three B2B2C Android apps end-to-end: wholesale marketplace, salesman app, and POS tablet app.",
      "Translated 30+ Adobe XD prototypes into cross-device, Material Design-compliant Android UI components.",
    ],
    tags: ["Android", "Material Design", "POS"],
  },
  {
    company: "Digital Internet Marketing",
    role: "Android Developer",
    period: "APR 2018 — OCT 2018",
    location: "Dhaka, Bangladesh",
    points: [
      "Built and shipped a real-time car-rental booking app in Java with Firebase Realtime Database and FCM notifications.",
    ],
    tags: ["Java", "Firebase", "FCM"],
  },
];
export const projects = [
  {
    name: "10 Minute School",
    category: "EDTECH · ANDROID",
    description:
      "Modernized a learning platform serving 100K+ active users. Led Kotlin and Compose adoption, reusable UI engineering, and production reliability improvements.",
    result: "98.87%",
    resultLabel: "crash-free sessions",
    tags: ["Kotlin", "Compose", "Android"],
    url: "https://play.google.com/store/apps/details?id=com.a10minuteschool.tenminuteschool&hl=en-US",
    link: "View on Google Play",
    color: "#e95c6f",
  },
  {
    name: "TARA",
    category: "EDTECH · ADAPTIVE LEARNING",
    description:
      "Owned UI engineering for an adaptive literacy and numeracy app, built with Monash University and the 10 Minute School team.",
    result: "Learning",
    resultLabel: "made interactive",
    tags: ["Android", "UI Engineering"],
    url: "https://play.google.com/store/apps/details?id=com.tenms.rct&hl=en-US",
    link: "View on Google Play",
    color: "#bca3ff",
  },
  {
    name: "Repocket",
    category: "CONSUMER · ANDROID & IOS",
    description:
      "Delivered production Flutter features for both platforms, including an end-to-end referral experience for a global consumer product.",
    result: "+15%",
    resultLabel: "first-month engagement",
    tags: ["Flutter", "Dart"],
    url: "https://play.google.com/store/apps/details?id=com.app.repocket",
    link: "View on Google Play",
    color: "#7ad6ad",
  },
  {
    name: "aib i-Banking",
    category: "FINTECH · ANDROID",
    description:
      "Contributed Android banking features at MISL, including reusable identity-verification infrastructure across three banking applications.",
    result: "KYC",
    resultLabel: "reusable verification SDK",
    tags: ["Android", "Java", "ML Kit"],
    url: "https://play.google.com/store/apps/details?id=com.bd.aibl.ibapps",
    link: "View on Google Play",
    color: "#79a8f8",
  },
  {
    name: "VALT POS & KDS",
    category: "COMMERCE · HARDWARE",
    description:
      "Modernized Android restaurant and retail systems, real-time kitchen order synchronization, and Bluetooth, USB and LAN printing.",
    result: "12",
    resultLabel: "devices supported by UAPM",
    tags: ["Compose", "Room", "Coroutines"],
    url: null,
    link: "Professional work · private code",
    color: "#edb770",
  },
  {
    name: "Ichiiba ecosystem",
    category: "COMMERCE · B2B2C",
    description:
      "Built wholesale marketplace, salesman and POS tablet applications end-to-end at CodeNext, from Adobe XD designs to release.",
    result: "3 apps",
    resultLabel: "from design to release",
    tags: ["Android", "Material Design", "POS"],
    url: null,
    link: "Professional work · private code",
    color: "#8ac8d4",
  },
];
export const stackGroups = [
  {
    title: "Mobile engineering",
    label: "CORE STACK",
    items: [
      "Kotlin",
      "Java",
      "Dart",
      "Jetpack Compose",
      "Android SDK",
      "Flutter",
      "Coroutines / Flow",
      "MVVM",
      "Clean Architecture",
      "Hilt",
      "Room",
      "Retrofit",
      "Ktor",
    ],
  },
  {
    title: "Delivery & quality",
    label: "PRODUCTION READY",
    items: [
      "JUnit",
      "GitHub Actions",
      "Gradle KTS",
      "Play Console",
      "LeakCanary",
      "ProGuard / R8",
      "Git",
    ],
  },
  {
    title: "Credentials",
    label: "EDUCATION & TRAINING",
    items: [
      "BSc, CS & Software Engineering · AIUB · 2013–2018",
      "Android · BDSkills / BITM · Jul 2024",
      "Android · BCC / Ernst & Young · Feb 2018",
    ],
  },
];
