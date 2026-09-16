import { Skill } from '../types';

export const skillsData: Skill[] = [
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'software',
    level: 95,
    levelLabel: 'پیشرفته صنعتی',
    iconName: 'Code',
    shortDesc: 'برنامه‌نویسی سیستم‌های بلادرنگ تعبیه‌شده، دسترسی مستقیم به ثبات‌ها، پوینترها و بهینه‌سازی کدهای میکروکنترلر.',
    tags: ['Embedded C', 'Memory Safety', 'Pointers', 'Algorithms', 'OOP']
  },
  {
    id: 'csharp',
    name: 'C# (.NET)',
    category: 'software',
    level: 90,
    levelLabel: 'تسلط کامل',
    iconName: 'Terminal',
    shortDesc: 'توسعه نرم‌افزارهای دسکتاپ مهندسی، اینترفیس دیاگ ECU خودرو، سیستم‌های پایش سریال و اسکریپت‌نویسی فیزیک یونیتی.',
    tags: ['Desktop UI', 'Serial Telemetry', 'Multithreading', 'Unity Scripting']
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'software',
    level: 86,
    levelLabel: 'حرفه‌ای',
    iconName: 'Smartphone',
    shortDesc: 'توسعه اپلیکیشن‌های مدرن اندروید، استفاده از Coroutines برای تبادل نامتقارن داده‌های بلوتوث و شبکه.',
    tags: ['Android', 'Coroutines', 'Flow', 'Clean Architecture']
  },
  {
    id: 'python',
    name: 'Python',
    category: 'software',
    level: 85,
    levelLabel: 'تسلط کاربردی',
    iconName: 'Cpu',
    shortDesc: 'اسکریپت‌نویسی خودکارسازی، تحلیل داده‌های تله‌متری سنسورها، رسم نمودارهای مهندسی و بینایی ماشین اولیه.',
    tags: ['Data Analysis', 'OpenCV', 'Automation Scripts', 'Plotting']
  },
  {
    id: 'stm32',
    name: 'STM32 & ARM',
    category: 'embedded',
    level: 94,
    levelLabel: 'متخصص معماری',
    iconName: 'Cpu',
    shortDesc: 'خانواده Cortex-M3/M4، برنامه‌نویسی تایمرهای PWM پیشرفته، اینتراپت‌های NVIC، واحدهای ADC DMA و FreeRTOS.',
    tags: ['STM32CubeIDE', 'ARM Cortex-M', 'Bare-Metal', 'DMA', 'Interrupts']
  },
  {
    id: 'arduino',
    name: 'Arduino Framework',
    category: 'embedded',
    level: 96,
    levelLabel: 'تخصص ساخت نمونه',
    iconName: 'Wrench',
    shortDesc: 'طراحی سریع نمونه‌های اولیه الکترونیکی، درایو انواع سنسورهای صنعتی، پروتکل‌های SPI، I2C و UART.',
    tags: ['Prototyping', 'Sensors Driver', 'SPI/I2C', 'Hardware Interfacing']
  },
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'embedded',
    level: 92,
    levelLabel: 'پیشرفته اینترنت اشیا',
    iconName: 'Wifi',
    shortDesc: 'پردازنده دوهسته‌ای، سیستم‌های Wi-Fi و بلوتوث BLE، استریم تصویر با ESP32-CAM و وب‌سرورهای پرسرعت محلی.',
    tags: ['Dual Core', 'ESP-IDF', 'FreeRTOS', 'BLE 5.0', 'ESP32-CAM']
  },
  {
    id: 'esp8266',
    name: 'ESP8266',
    category: 'embedded',
    level: 88,
    levelLabel: 'تخصص میکروکنترلری',
    iconName: 'Radio',
    shortDesc: 'توسعه نودهای کم‌مصرف، ارتباطات TCP/UDP، بهینه‌سازی حافظه و اتوماسیون بی‌سیم کارگاهی.',
    tags: ['Wi-Fi Nodes', 'Low Power', 'HTTP Client', 'Home Automation']
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
    category: 'embedded',
    level: 84,
    levelLabel: 'سیستم لینوکس امبدد',
    iconName: 'Server',
    shortDesc: 'سیستم‌عامل لینوکس امبدد، کنترل پین‌های GPIO، راه‌اندازی سرورهای محلی بروکر MQTT و دیتابیس‌های تله‌متری.',
    tags: ['Linux Embedded', 'GPIO Interfacing', 'Local MQTT Broker', 'Python Scripts']
  },
  {
    id: 'unity',
    name: 'Unity 3D Engine',
    category: 'robotics',
    level: 90,
    levelLabel: 'توسعه‌دهنده فیزیک و گیم',
    iconName: 'Gamepad2',
    shortDesc: 'شبیه‌سازی دینامیک خودروها با RCC، پیاده‌سازی تست داینو موتور، انیمیشن قطعات مکانیکی و طراحی اینترفیس فضایی.',
    tags: ['Physics Simulation', 'RCC Vehicle', 'C# Mechanics', 'Dyno Engine', 'Shaders']
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    category: 'software',
    level: 88,
    levelLabel: 'توسعه ابزارهای موبایل',
    iconName: 'Smartphone',
    shortDesc: 'محیط توسعه بومی اندروید، ساخت ابزارهای مانیتورینگ ربات‌ها و کنترل از راه دور بر بسترهای ارتباطی بی‌سیم.',
    tags: ['IDE Mastery', 'Gradle Config', 'Profiling', 'APK Building']
  },
  {
    id: 'jetpack-compose',
    name: 'Jetpack Compose',
    category: 'software',
    level: 85,
    levelLabel: 'طراحی مدرن UI',
    iconName: 'Layers',
    shortDesc: 'طراحی رابط‌های کاربری تعاملی اعلانی (Declarative UI)، استایل‌های شیشه‌ای Glassmorphism و گراف‌های بلادرنگ.',
    tags: ['Declarative UI', 'Material 3', 'State Management', 'Animations']
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'software',
    level: 82,
    levelLabel: 'پایگاه ابری',
    iconName: 'Flame',
    shortDesc: 'همگام‌سازی ابری داده‌های اینترنت اشیا (Firestore & Realtime Database) برای مشاهده داده‌های پروژه در هر مکان.',
    tags: ['Realtime DB', 'Cloud Sync', 'Auth', 'IoT Datastore']
  },
  {
    id: 'mqtt',
    name: 'MQTT Protocol',
    category: 'embedded',
    level: 91,
    levelLabel: 'پروتکل استاندارد IoT',
    iconName: 'Activity',
    shortDesc: 'ارسال بسته‌های سبک وزن با حداقل سربار شبکه، معماری Publisher/Subscriber و پایداری در شبکه‌های ضعیف.',
    tags: ['Pub/Sub', 'QoS 0/1/2', 'Mosquitto Broker', 'Low Bandwidth']
  },
  {
    id: 'altium-designer',
    name: 'Altium Designer',
    category: 'hardware',
    level: 93,
    levelLabel: 'طراحی صنعتی PCB',
    iconName: 'CircuitBoard',
    shortDesc: 'طراحی شماتیک و بردهای چندلایه چاپی، روتینگ امپدانس کنترل‌شده، چیدمان قطعات SMD و استانداردسازی صنعتی IPC.',
    tags: ['Multi-layer PCB', 'Routing', 'SMD Footprints', '3D Clearance', 'Gerber Export']
  },
  {
    id: 'solidworks',
    name: 'SolidWorks',
    category: 'hardware',
    level: 85,
    levelLabel: 'مدل‌سازی مکانیکی ۳D',
    iconName: 'Box',
    shortDesc: 'مدل‌سازی سه‌بعدی شاسی ربات‌ها، براکت‌های سروو موتورها، شبیه‌سازی تداخل حرکتی و آماده‌سازی جهت پرینت ۳D و برش لیزر.',
    tags: ['3D CAD', 'Mechanical Assembly', 'Motion Simulation', 'Laser & 3D Print']
  }
];
