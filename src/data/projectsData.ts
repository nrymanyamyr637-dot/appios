import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'robot-teronic',
    title: 'ربات تعقیب خط فوق سریع ROBOT TERONIC',
    category: 'robotics',
    shortDesc: 'ربات هوشمند تعقیب خط مسابقه‌ای با پردازنده ARM STM32، آرایه سنسور ۸ کاناله مادون قرمز و حلقه کنترلی ۱.۲ کیلوهرتز PID.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'طراحی و ساخت یک ربات خودمختار با حداکثر سرعت و پایداری دینامیکی در عبور از خطوط منحنی، بریدگی‌ها و زوایای تند پیست مسابقه.',
    team: 'تیم برادران نریمانی (Narimani Brothers) — امیررضا، رضا و امیرمحمد نریمانی',
    hardware: [
      'میکروکنترلر اصلی: STM32F103C8T6 (ARM Cortex-M3 @ 72MHz)',
      'سنسورها: آرایه خطی ۸ سنسور فروسرخ TCRT5000 با بافر آپ‌امپ LM358',
      'درایور موتور: ماسفت دوبل TB6612FNG با قابلیت کنترل جریان ۲ آمپر',
      'محرک‌ها: ۲ موتور DC کرلس (Coreless) با گیربکس فلزی دور بالا',
      'تغذیه: باتری لیتیوم-پلیمر ۲ سلولی (7.4V 450mAh LiPo) با رگولاتور کاهنده LDO'
    ],
    software: [
      'فریم‌ورک: STM32CubeIDE بر پایه C/C++ و ثبات‌های مستقیم رجیستری',
      'الگوریتم کنترلی: حلقه بسته PID با تصحیح پیوسته خطای خط مرکزی',
      'پردازش داده: نمونه‌برداری آنالوگ ADC سریع با نرخ ۱.۲ کیلوهرتز',
      'تله‌متری: ذخیره ضرایب PID روی فلش داخلی جهت کالیبراسیون سریع'
    ],
    techStack: ['STM32', 'C/C++', 'Altium Designer', 'PID Control', 'ADC DMA', 'Hardware Timer PWM'],
    architecture: 'معماری بر پایه حلقه کنترلی زمان-حقیقی با اینتراپت تایمر ۱۲۰۰ بار در ثانیه. در هر لوپ مقادیر وزنی سنسورهای فوتودیود محاسبه و با تابع ارور موقعیت به موتورهای راست و چپ اعمال می‌شود.',
    pcbDetails: 'برد مدارچاپی دو لایه طراحی‌شده در Altium Designer با تفکیک کامل لایه‌های گراند دیجیتال و قدرت. کاهش چشمگیر مقاومت ترک‌های تغذیه برای جلوگیری از افت ولتاژ هنگام استارت سنگین موتورها.',
    codeSnippet: `// الگوریتم حلقه کنترلی PID در ROBOT TERONIC
void Calculate_PID_Steering(void) {
    int32_t sensor_position = Read_Weighted_Sensor_Array();
    int32_t error = TARGET_CENTER - sensor_position;
    
    // اجزای تناسبی، انتگرال‌گیر و مشتق‌گیر
    int32_t P = error;
    int32_t I = I_error + error;
    int32_t D = error - previous_error;
    
    // محاسبه خروجی کنترلی با ضرایب تیون‌شده
    int32_t motor_delta = (Kp * P) + (Ki * I) + (Kd * D);
    previous_error = error;
    
    // تصحیح سرعت موتورهای چپ و راست
    int16_t left_speed = BASE_PWM + motor_delta;
    int16_t right_speed = BASE_PWM - motor_delta;
    Apply_Motor_PWM(left_speed, right_speed);
}`,
    codeLang: 'cpp',
    challenges: [
      'خنثی‌سازی اثر اینرسی و گشتاور چرخشی در پیچ‌های ۹۰ درجه با سرعت بالاتر از ۲.۵ متر بر ثانیه',
      'حذف نویز اپتیکال ناشی از نور محیطی فلورسنت و بازتاب کف پیست با فیلتر دیجیتال میانگین متحرک',
      'بهینه‌سازی مصرف توان و جلوگیری از گرمای درایور موتور در شیب‌ها'
    ],
    futureDevelopment: [
      'تلفیق سنسور IMU ژیروسکوپ برای پایش زاویه انحراف لحظه‌ای و لغزش بدنه (Yaw Angle Drift)',
      'افزودن ماژول تله‌متری بی‌سیم بلوتوث برای مانیتورینگ آنلاین گراف خطای سنسور روی اپلیکیشن موبایل'
    ],
    status: 'completed',
    highlightMetric: {
      label: 'فرکانس لوپ کنترلی',
      value: '1.2 kHz'
    }
  },
  {
    id: 'car-simulator',
    title: 'شبیه‌ساز فیزیک خودرو و کنسول داینو (Unity 3D Dyno Test)',
    category: 'unity',
    shortDesc: 'شبیه‌ساز پیشرفته خودروهای اسپرت در موتور بازی‌سازی یونیتی با ماژول تست داینامومتر، شبیه‌سازی گشتاور واقعی موتور و گراف قدرت زنده.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'ایجاد یک بستر شبیه‌سازی دقیق مهندسی جهت تست و کالیبراسیون منحنی توان-گشتاور موتور خودرو، سیستم انتقال قدرت، تعلیق و هندلینگ قبل از پیاده‌سازی واقعی.',
    hardware: [
      'پشتیبانی از ورودی کنترلرهای فیزیکی (USB Racing Wheel & Pedals)',
      'بهینه‌سازی گرافیکی برای نرخ فریم پایدار ۶۰+ FPS روی سیستم‌های رده میانی و موبایل'
    ],
    software: [
      'موتور: Unity 3D Engine (C# Scripting)',
      'پکیج فیزیک: پیاده‌سازی و شخصی‌سازی عمیق Realistic Car Controller (RCC)',
      'داشبورد داده: سیستم رسم گراف برداری برای پایش برخط BHP و Nm بر حسب RPM',
      'رابط کاربری: Glassmorphism UI شیشه‌ای با المان‌های HUD سایبرپانک'
    ],
    techStack: ['Unity 3D', 'C#', 'RCC Physics', 'Vehicle Dynamics', 'Shader Graph', 'Dyno Math Engine'],
    architecture: 'سیستم شبیه‌سازی ماژولار شامل EngineController (محاسبه توان بر اساس منحنی سوخت و مکش)، GearboxSystem (نسبت دنده‌ها و دیفرانسیل لغزش محدود LSD) و DynoBench (تحلیل درگ و ثبت خروجی چرخ‌ها).',
    pcbDetails: 'دارای اینترفیس اتصال به پورت سریال میکروکنترلر جهت تبادل تله‌متری با کنسول واقعی.',
    codeSnippet: `// هسته محاسبه توان در تست داینامومتر یونیتی
public class DynoBenchSystem : MonoBehaviour {
    [SerializeField] private RCC_CarControllerV3 carController;
    public AnimationCurve torqueCurve;
    
    void FixedUpdate() {
        if (!isDynoActive) return;
        
        float currentRPM = carController.engineRPM;
        float normalizedTorque = torqueCurve.Evaluate(currentRPM / carController.maxEngineRPM);
        float currentTorqueNm = normalizedTorque * peakTorque;
        float currentHorsepower = (currentTorqueNm * currentRPM) / 7127f; // فرمول استاندارد توان
        
        dynoGraphVisualizer.RecordDataPoint(currentRPM, currentHorsepower, currentTorqueNm);
    }
}`,
    codeLang: 'csharp',
    challenges: [
      'شبیه‌سازی افت چسبندگی لاستیک‌ها (Tire Slip & Friction Circle) بر اساس اصطکاک سطح جاده',
      'محاسبه دقیق جرم دورانی (Rotational Inertia) چرخ‌ها و میل‌لنگ برای تاخیر شتاب‌گیری طبیعی'
    ],
    futureDevelopment: [
      'اضافه کردن قابلیت شبیه‌سازی خودروهای الکتریکی (EV) با فیدبک گشتاور لحظه‌ای صفر دور',
      'اتصال مستقیم به سخت‌افزار ECU با پروتکل OBD2 جهت همگام‌سازی گیج‌ها با موتور واقعی'
    ],
    status: 'completed',
    highlightMetric: {
      label: 'دقت شبیه‌سازی گشتاور',
      value: '98.5%'
    }
  },
  {
    id: 'ecu-diagnostic-tool',
    title: 'ابزار دیاگ و مانیتورینگ تله‌متری ECU خودرو (K-Line / CAN-Bus)',
    category: 'automotive',
    shortDesc: 'سیستم عیب‌یابی و پایش داده‌های واحد کنترل الکترونیکی موتور (ECU) با پروتکل K-Line ISO14230 (KWP2000) و اینترفیس دسکتاپ C#.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'طراحی سخت‌افزار رابط ترنسیور و نرم‌افزار تشخیصی برای استخراج پارامترهای موتور، بررسی سلامت سنسورها و خواندن و پاک کردن کدهای خطای DTC.',
    hardware: [
      'ترنسیور خط K-Line: آی‌سی تخصصی خودرویی L9637D / MC33290 با ایزولاسیون نوری',
      'مبدل ارتباطی: میکروکنترلر STM32 با واحد UART ارتباط خودرویی و USB Virtual COM',
      'حفاظت الکتریکی: دیودهای TVS و محافظت در برابر پلاریته معکوس ۱۲ ولت باتری خودرو'
    ],
    software: [
      'فریم‌ورک کامپیوتر: نرم‌افزار اختصاصی Windows Forms / WPF با زبان C#',
      'پروتکل‌های پشتیبانی‌شده: KWP2000 (ISO 14230)، ISO 9141-2 و فریم‌های CAN-Bus 2.0B',
      'قابلیت‌ها: رسم گراف همزمان سنسور اکسیژن، دور موتور، دمای آب و سنسور فشار منیفولد (MAP)'
    ],
    techStack: ['C# .NET', 'K-Line Protocol', 'ISO 14230', 'STM32 UART', 'OBD-II', 'Electronics Diagnostic'],
    architecture: 'بسته دستوری Fast Init با باودریت ۱۰۴۰۰ بیت بر ثانیه به ECU خودرو (نظیر Continental EMS71 یا Bosch) ارسال شده و پس از برقراری ارتباط، درخواست‌های PID حالت ۱ به صورت منظم پولینگ و پردازش می‌شوند.',
    pcbDetails: 'طراحی برد ایزوله با گراند مجزا جهت جلوگیری از ورود نویز سیستم جرقه‌زنی کوئل خودرو به لپ‌تاپ مهندسی.',
    codeSnippet: `// پروتکل ارسال پیام K-Line برای استعلام دور موتور (RPM)
public byte[] Build_RPM_Query_Packet() {
    byte[] packet = new byte[] {
        0x68, // طول فریم و فرمت
        0x6A, // آدرس فرستنده (Tester Tool)
        0xF1, // آدرس ECU
        0x01, // Mode 01: Current Powertrain Diagnostic Data
        0x0C, // PID 0x0C: Engine RPM
        0x00  // بایت چکسام (محاسبه می‌شود)
    };
    packet[packet.Length - 1] = CalculateChecksum(packet);
    return packet;
}`,
    codeLang: 'csharp',
    challenges: [
      'تنظیم دقیق تایمینگ ۵ بایت اول در فاز Fast Initialization با خطای کمتر از ۱ میلی‌ثانیه',
      'مدیریت نویزهای پرتوان الکترومغناطیسی شمع و دینام خودرو روی باس ارتباطی'
    ],
    futureDevelopment: [
      'اضافه کردن قابلیت ریمپ ساده و تنظیم دمای روشن شدن فن رادیاتور',
      'توسعه نسخه بی‌سیم با تراشه ESP32 و ارسال تله‌متری روی گوشی تلفن همراه'
    ],
    status: 'completed',
    highlightMetric: {
      label: 'نرخ رفرش تله‌متری',
      value: '50 Hz'
    }
  },
  {
    id: 'industrial-iot-node',
    title: 'نود پایش محیطی اینترنت اشیا صنعتی (ESP32 Industrial IoT Node)',
    category: 'embedded',
    shortDesc: 'سیستم پایش محیطی و تله‌متری بلادرنگ مبتنی بر تراشه دوهسته‌ای ESP32 با پروتکل MQTT، ذخیره‌سازی آفلاین داده و اتصال ابری.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'پایش مستمر پارامترهای حیاتی آزمایشگاه و کارگاه فنی با کمترین توان مصرفی و ارسال داده به داشبورد ابری امن.',
    hardware: [
      'میکروکنترلر: ESP32-WROOM-32D با فرکانس ۲۴۰ مگاهرتز',
      'سنسورها: سنسور دقیق BME280 (دما، رطوبت، فشار) + سنسور نشت گاز MQ-2',
      'نمایشگر محلی: OLED 0.96 اینچ I2C با رابط کاربری وضعیت',
      'مدیریت توان: مدار شارژ لیتیومی با قابلیت کارکرد در حالت Deep Sleep (۱۵ میکروآمپر)'
    ],
    software: [
      'سیستم‌عامل: FreeRTOS تسک‌های تفکیک‌شده سنسور و شبکه',
      'پروتکل: MQTT با رمزنگاری TLS و اتصال خودکار به سرور محلی و Firebase',
      'وب‌سرور داخلی: رابط کاربری تنظیمات تحت شبکه محلی بدون نیاز به کدنویسی مجدد'
    ],
    techStack: ['ESP32', 'FreeRTOS', 'MQTT', 'C++', 'I2C', 'Firebase', 'IoT Security'],
    architecture: 'تسک سنسور به صورت منظم داده‌ها را از باس I2C خوانده و در صورت قطع شبکه، بسته‌ها را در حافظه فلش SPIFFS صف‌بندی می‌کند تا پس از برقراری اینترنت بدون افت اطلاعات آپلود شوند.',
    pcbDetails: 'برد فشرده ۴۰×۴۰ میلی‌متر با آنتن بهینه‌شده و ایزولاسیون سیگنال‌های آنالوگ از مدار فرستنده Wi-Fi.',
    codeSnippet: `// تسک RTOS ارسال اطلاعات تله‌متری با MQTT
void vTelemetryTask(void *pvParameters) {
    for(;;) {
        SensorData_t data;
        if (xQueueReceive(xSensorQueue, &data, portMAX_DELAY) == pdTRUE) {
            char payload[128];
            snprintf(payload, sizeof(payload), 
                "{\\"temp\\":%.2f,\\"humidity\\":%.2f,\\"press\\":%.1f}", 
                data.temperature, data.humidity, data.pressure);
            
            esp_mqtt_client_publish(mqtt_client, "lab/telemetry", payload, 0, 1, 0);
        }
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}`,
    codeLang: 'cpp',
    challenges: [
      'کاهش اثر خودگرمایی تراشه ESP32 بر سنسور دما با جانمایی جداگانه روی برد PCB',
      'مدیریت حافظه پویا در سیستم‌عامل FreeRTOS برای جلوگیری از Heap Fragmentation'
    ],
    futureDevelopment: [
      'پیاده‌سازی پروتکل LoRaWAN برای برد ارسال تا ۱۰ کیلومتر بدون اینترنت محلی',
      'افزودن هوش مصنوعی لبه (TinyML) برای پیش‌بینی خرابی تجهیزات مکانیکی کارگاه'
    ],
    status: 'completed',
    highlightMetric: {
      label: 'مصرف جریان در Sleep',
      value: '15 µA'
    }
  },
  {
    id: 'android-robot-controller',
    title: 'اپلیکیشن اندروید کنترل و پایش ربات (Jetpack Compose & BLE)',
    category: 'android',
    shortDesc: 'اپلیکیشن موبایل با اینترفیس مدرن شیشه‌ای برای پایش تله‌متری سنسورها، رسم نمودارهای بلادرنگ و ارسال فرامین کنترلی با بلوتوث کم‌مصرف.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'ساخت ابزار لمسی بدون تاخیر برای تست میدانی ربات‌ها، تنظیم ضرایب PID بدون نیاز به کامپیوتر و عیب‌یابی سریع خطاهای سخت‌افزاری.',
    hardware: [
      'پشتیبانی از پروتکل Bluetooth Low Energy (BLE 5.0 / HC-05 / HM-10)',
      'پشتیبانی از هپتیک فیدبک گوشی برای انتقال حس ارتعاش موتورها'
    ],
    software: [
      'زبان: Kotlin با معماری مدرن MVVM و Coroutines Flow',
      'رابط کاربری: Jetpack Compose با کامپوننت‌های شیشه‌ای Glassmorphism',
      'مصورسازی: کتابخانه سفارشی رسم نمودار ۶۰ هرتزی با شتاب‌دهنده گرافیکی'
    ],
    techStack: ['Android Studio', 'Kotlin', 'Jetpack Compose', 'BLE API', 'Coroutines', 'Material 3 Glass'],
    architecture: 'یک لایه مخزن (Repository) اختصاصی استریم‌های بایت‌های ورودی BLE را به اشیاء Kotlin تبدیل کرده و از طریق StateFlow به ویومدل و لایه UI تزریق می‌کند.',
    pcbDetails: 'طراحی‌شده جهت کار با تمامی بردهای STM32 و ESP32 مجهز به ماژول بلوتوث.',
    codeSnippet: `// اسکن و برقراری ارتباط پایدار BLE با ربات
@SuppressLint("MissingPermission")
fun connectToRobotDevice(deviceAddress: String) {
    viewModelScope.launch(Dispatchers.IO) {
        val bluetoothDevice = bluetoothAdapter.getRemoteDevice(deviceAddress)
        bluetoothGatt = bluetoothDevice.connectGatt(context, false, gattCallback)
        _connectionState.value = ConnectionState.Connecting
    }
}`,
    codeLang: 'kotlin',
    challenges: [
      'کنترل تاخیر بسته‌های ارسالی به کمتر از ۱۰ میلی‌ثانیه برای پاسخگویی سریع ربات',
      'جلوگیری از افت فریم در هنگام ترسیم همزمان ۴ نمودار سنسور با نرخ نمونه‌برداری بالا'
    ],
    futureDevelopment: [
      'افزودن امکان ذخیره سشن‌های لاگ به صورت فایل CSV و اکسپورت به نرم‌افزارهای تحلیلی',
      'طراحی کنترل با ژیروسکوپ گوشی (حرکت ربات با متمایل کردن تلفن همراه)'
    ],
    status: 'completed',
    highlightMetric: {
      label: 'تاخیر ارتباط بلوتوث',
      value: '< 8 ms'
    }
  },
  {
    id: 'robot-arm-kinematics',
    title: 'بازوی رباتیک صنعتی ۴ درجه آزادی (4-DOF Inverse Kinematics)',
    category: 'robotics',
    shortDesc: 'سیستم بازوی مکانیکی دقیق با سرووهای فلزی، حل‌کننده جبری سینماتیک معکوس (IK) در فضای سه‌بعدی و کنترل مسیر نرم.',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0cZ2x7wKFZjTduiWtoHQnFcsUi7q8E-jFQHF2AQJ-ukxCyJD-VV_KC4YhZKk39mZnClC7sT-8Q44CqmgyyiXPK-X4acFx5MlHSf2RUBCHcInSYSijlDBs8JXwpRwHUJ16v2m1X0LmgRIcJ5FPDhqlC49hcgGK48H7YMKGPlIKGY00EK6LDA9_XibtdWw1JaKenK5x_Hx6-io8yfjqrgUpvSNa4PF4a43DH9nv3_Kk7JK969_lUU',
    goal: 'جابجایی دقیق قطعات الکترونیکی (Pick & Place) روی برد مدارچاپی با مختصات X, Y, Z و جلوگیری از ضربه و لرزش مکانیکی.',
    hardware: [
      'میکروکنترلر: STM32F401 BlackPill (ARM Cortex-M4 با واحد اعشاری FPU)',
      'سروو موتورها: ۴ عدد سرووی دنده فلزی دیجیتال MG996R با گشتاور ۱۱ کیلوگرم-سانتی‌متر',
      'درایور پالس: تراشه اختصاصی PCA9685 بر بستر باس I2C با وضوح ۱۲ بیت',
      'مکانیک: قطعات برش دقیق اکریلیک و آلومینیوم با یاتاقان‌های دورانی'
    ],
    software: [
      'الگوریتم: محاسبات مثلثاتی معکوس تحلیلی با زمان پاسخگویی زیر ۵۰ میکروثانیه',
      'منحنی شتاب: درونیابی شتاب S-Curve جهت شروع و توقف کاملا نرم بازو'
    ],
    techStack: ['STM32', 'Robotics Kinematics', 'Trigonometry', 'C/C++', 'SolidWorks', 'I2C PWM'],
    architecture: 'ورودی مختصات از پورت سریال دریافت شده و توسط FPU سخت‌افزاری پردازنده ARM در چند میکروثانیه به زوایای تتا ۱ تا تتا ۴ ترجمه و با پالس‌های PWM به سرووها ارسال می‌گردد.',
    pcbDetails: 'برد درایور مجزا با خازن‌های الکترولیتی ظرفیت بالا جهت جذب ریپل‌های ناشی از تغییر جهت موتورها.',
    codeSnippet: `// حلگر سینماتیک معکوس دکارتی (X, Y, Z -> Angles)
void Solve_Inverse_Kinematics(float x, float y, float z, float *t1, float *t2, float *t3) {
    // زاویه چرخش پایه حول محور عمودی
    *t1 = atan2f(y, x) * RAD_TO_DEG;
    
    float r = sqrtf(x * x + y * y);
    float d = sqrtf(r * r + z * z);
    
    // قانون کسینوس‌ها برای مفاصل آرنج و شانه
    float cos_angle2 = (L1_SQ + L2_SQ - d * d) / (2.0f * L1 * L2);
    *t2 = acosf(fminf(fmaxf(cos_angle2, -1.0f), 1.0f)) * RAD_TO_DEG;
    
    // زاویه شانه با در نظر گرفتن زاویه ارتفاع
    *t3 = (atan2f(z, r) + acosf((L1_SQ + d * d - L2_SQ) / (2.0f * L1 * d))) * RAD_TO_DEG;
}`,
    codeLang: 'cpp',
    challenges: [
      'جبران لقی مکانیکی چرخ‌دنده‌ها (Backlash) در تکرارپذیری نقطه هدف',
      'کنترل جریان هجومی ۴ آمپری سرووها هنگام حرکت همزمان تمامی مفاصل'
    ],
    futureDevelopment: [
      'افزودن دوربین هوشمند جهت تشخیص موقعیت مکانی قطعات روی نقاله به صورت خودکار',
      'پیاده‌سازی کنترلر لمسی و گریپر پنوماتیک برای قطعات ظریف SMD'
    ],
    status: 'in-progress',
    highlightMetric: {
      label: 'دقت تکرارپذیری موقعیت',
      value: '± 0.8 mm'
    }
  }
];
