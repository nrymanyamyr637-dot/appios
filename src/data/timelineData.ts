import { TimelineMilestone, QuickTechCard } from '../types';

export const timelineMilestones: TimelineMilestone[] = [
  {
    step: 1,
    title: 'الکترونیک و مبانی مدارهای مجتمع',
    enTitle: 'Electronics & Circuit Fundamentals',
    discipline: 'پایه سخت‌افزار',
    description: 'شروع مسیر با تحلیل مدارهای الکتریکی، رفتار قطعات پسیو، نیمه‌هادی‌ها، دیودها، ترانزیستورهای BJT و MOSFET و منابع تغذیه سوئیچینگ پایدار.',
    achievements: [
      'تسلط بر تحلیل سیگنال با اسیلوسکوپ و مولتی‌مترهای دیجیتال',
      'طراحی رگولاتورهای ولتاژ کم‌افت (LDO) و مدارهای محافظ اتصال کوتاه'
    ]
  },
  {
    step: 2,
    title: 'برنامه‌نویسی و ساختارهای داده C/C++',
    enTitle: 'Programming & System Algorithms',
    discipline: 'هسته نرم‌افزار',
    description: 'ورود عمیق به زبان‌های سطح پایین، مدیریت مستقیم پوینترها و حافظه رم، ساختارهای داده و بهینه‌سازی محاسبات ریاضی روی پردازنده‌های با منابع محدود.',
    achievements: [
      'پیاده‌سازی صف‌های حلقوی (Circular Buffers) برای دریافت بسته‌های سریالی',
      'کاهش استفاده از محاسبات ممیز شناور سنگین با الگوریتم‌های Fixed-Point'
    ]
  },
  {
    step: 3,
    title: 'میکروکنترلرها و معماری ARM Cortex',
    enTitle: 'Microcontrollers & STM32 Architecture',
    discipline: 'پردازش بلادرنگ',
    description: 'گذر از بردهای ساده و مهاجرت تخصصی به پردازنده‌های ۳۲ بیتی STM32، درک ثبات‌های سخت‌افزاری، کنترل وقفه‌های NVIC و واحدهای DMA برای تبادل بدون تاخیر داده.',
    achievements: [
      'راه‌اندازی تایمرهای چندکاناله PWM با دقت میکروثانیه',
      'برنامه‌نویسی ثبات‌های رجیستری برای حداکثر سرعت کلاک ۷۲ مگاهرتز'
    ]
  },
  {
    step: 4,
    title: 'رباتیک و دینامیک سیستم‌های خودران',
    enTitle: 'Robotics & Autonomous Motion',
    discipline: 'کنترل حلقه بسته',
    description: 'طراحی ربات‌های متحرک، پیاده‌سازی کنترلرهای PID تناسبی-مشتق‌گیر برای پایدارسازی سرعت‌های بالا و غلبه بر اینرسی و گریز از مرکز پیچ‌های تند مسابقه.',
    achievements: [
      'ساخت ربات مسابقه‌ای ROBOT TERONIC با عبور بی‌نقص از موانع پیچیده',
      'کالیبراسیون دینامیکی متغیر ضرایب PID بر اساس سرعت لحظه‌ای ربات'
    ]
  },
  {
    step: 5,
    title: 'طراحی بردهای مدارچاپی چندلایه با Altium Designer',
    enTitle: 'PCB Design & Industrial Altium Engineering',
    discipline: 'تولید سخت‌افزار',
    description: 'طراحی حرفه‌ای فیبرمدار چاپی، روتینگ امپدانس کنترل‌شده، چیدمان بهینه کاهش تداخل الکترومغناطیسی (EMC) و طراحی کتابخانه‌های اختصاصی قطعات SMD.',
    achievements: [
      'طراحی شاسی یکپارچه ربات روی برد PCB بدون نیاز به سیم‌کشی‌های اضافی',
      'کاهش اثر نویز سوئیچینگ موتورها روی پایه‌های آنالوگ میکروکنترلر'
    ]
  },
  {
    step: 6,
    title: 'سیستم‌های تعبیه‌شده بی‌سیم و IoT',
    enTitle: 'Embedded Wireless & Industrial IoT',
    discipline: 'ارتباطات شبکه',
    description: 'تلفیق تراشه‌های ESP32 و ESP8266 با پروتکل‌های MQTT و وب‌سوکت، طراحی نودهای کم‌مصرف، ذخیره‌سازی داده‌های سنسور در فلش و ارتباط امن با فضای ابری.',
    achievements: [
      'استفاده از سیستم‌عامل زمان‌واقعی FreeRTOS با تفکیک چند تسک همزمان',
      'ارسال مداوم تله‌متری با کمترین بار شبکه و پشتیبانی از بروزرسانی از راه دور (OTA)'
    ]
  },
  {
    step: 7,
    title: 'توسعه اپلیکیشن‌های اندروید و اینترفیس کاربری',
    enTitle: 'Android Mobile Telemetry & Jetpack Compose',
    discipline: 'رابط کاربری هوشمند',
    description: 'ساخت اپلیکیشن‌های بومی اندروید برای برقراری ارتباط با پورت بلوتوث ربات‌ها، رسم نمودارهای بلادرنگ سنسورها و ارسال فرامین با حداقل زمان تاخیر.',
    achievements: [
      'پیاده‌سازی اینترفیس‌های شیشه‌ای مدرن با کتابخانه Jetpack Compose',
      'انتقال پایدار بسته‌های کنترلی با پروتکل BLE و تاخیر زیر ۱۰ میلی‌ثانیه'
    ]
  },
  {
    step: 8,
    title: 'هوش مصنوعی و شبیه‌سازی فیزیک خودرویی',
    enTitle: 'AI Vision & Physics Simulation in Unity',
    discipline: 'سیستم‌های سایبرفیزیکی',
    description: 'شبیه‌سازی کامل خودروها در محیط یونیتی همراه با کنسول داینو، پردازش استریم‌های تصویری دوربین ESP32-CAM و ورود به بینایی ماشین و پردازش در لبه (Edge AI).',
    achievements: [
      'مدل‌سازی دقیق گشتاور و درگ در تست داینو خودرو با تطابق ۹۸ درصدی با واقعیت',
      'ترکیب پلتفرم‌های مجازی با کنترلرهای واقعی فیزیکی از طریق پورت ارتباطی'
    ]
  }
];

export const quickTechCards: QuickTechCard[] = [
  {
    id: 'robotics',
    title: 'رباتیک',
    enTitle: 'Robotics',
    icon: 'Bot',
    desc: 'ربات‌های تعقیب خط پرسرعت، بازوهای مکانیکی، کنترل حلقه بسته PID و کینماتیک معکوس.',
    categoryRef: 'robotics',
    accentColor: '#00f0ff'
  },
  {
    id: 'electronics',
    title: 'الکترونیک',
    enTitle: 'Electronics',
    icon: 'Zap',
    desc: 'تحلیل و طراحی مدارهای آنالوگ و دیجیتال، درایورهای موتور توان‌بالا و فیلترینگ نویز.',
    categoryRef: 'automotive',
    accentColor: '#65f2b5'
  },
  {
    id: 'programming',
    title: 'برنامه‌نویسی',
    enTitle: 'Programming',
    icon: 'Code',
    desc: 'توسعه کدهای C/C++ بهینه، پوینترها، زبان‌های شیءگرا و اسکریپت‌های تحلیلی پایتون.',
    categoryRef: 'all',
    accentColor: '#d0bcff'
  },
  {
    id: 'mechatronics',
    title: 'مکاترونیک',
    enTitle: 'Mechatronics',
    icon: 'Wrench',
    desc: 'هم‌افزایی مکانیک، الکترونیک و کنترل برای تولید سیستم‌های واقعی و کاربردی.',
    categoryRef: 'robotics',
    accentColor: '#00dbe9'
  },
  {
    id: 'embedded',
    title: 'Embedded',
    enTitle: 'Embedded Systems',
    icon: 'Cpu',
    desc: 'برنامه‌نویسی میکروکنترلرهای ARM STM32 و تراشه‌های ارتباطی اینترنت اشیا ESP32.',
    categoryRef: 'embedded',
    accentColor: '#00f0ff'
  },
  {
    id: 'android',
    title: 'Android',
    enTitle: 'Android Dev',
    icon: 'Smartphone',
    desc: 'توسعه اپلیکیشن‌های موبایل جهت کنترل از راه دور ربات‌ها و پایش گراف‌های سنسوری.',
    categoryRef: 'android',
    accentColor: '#65f2b5'
  },
  {
    id: 'unity',
    title: 'Unity',
    enTitle: 'Unity & Dyno Sim',
    icon: 'Gamepad2',
    desc: 'شبیه‌سازی دینامیک خودروها، تحلیل تست داینامومتر و موتورهای فیزیکی سه‌بعدی.',
    categoryRef: 'unity',
    accentColor: '#d0bcff'
  },
  {
    id: 'pcb',
    title: 'طراحی PCB',
    enTitle: 'PCB Design',
    icon: 'Layers',
    desc: 'طراحی بردهای صنعتی چندلایه در Altium Designer با تفکیک زمین دیجیتال و توان.',
    categoryRef: 'embedded',
    accentColor: '#7df4ff'
  }
];
