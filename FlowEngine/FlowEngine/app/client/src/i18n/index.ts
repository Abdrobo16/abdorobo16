import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      stores: "Stores",
      reports: "Reports",
      profile: "Profile",
      adminPanel: "Admin Panel",
      logout: "Logout",
      
      // Landing Page
      storeAccountManager: "Store Account Manager",
      landingDescription: "Manage your store accounts with ease. Track supplies, monitor balances, and keep your business running smoothly.",
      getStarted: "Get Started",
      secureAccess: "Secure Access",
      secureAccessDesc: "Role-based access control ensures your data stays protected",
      realTimeTracking: "Real-time Tracking",
      realTimeTrackingDesc: "Monitor supplies and balances in real-time",
      multiUserSupport: "Multi-user Support",
      multiUserSupportDesc: "Collaborate with your team across multiple stores",
      
      // Dashboard
      welcomeBack: "Welcome back! Here's what's happening with your stores.",
      addStore: "Add Store",
      totalStores: "Total Stores",
      totalSuppliedDashboard: "Total Supplied",
      outstanding: "Outstanding",
      netBalance: "Net Balance",
      yourStores: "Your Stores",
      storeName: "Store Name",
      status: "Status",
      actions: "Actions",
      active: "Active",
      recentActivity: "Recent Activity",
      noRecentActivity: "No recent activity to display.",
      noStoresFound: "No stores found. Create your first store to get started.",
      
      // Store Management
      allStores: "All Stores",
      owner: "Owner",
      created: "Created",
      storeOwner: "Store Owner",
      storeDetails: "Store Details",
      
      // Store Details
      storeId: "Store ID",
      addTransaction: "Add Transaction",
      totalSupplied: "Total Supplied",
      outstandingAmount: "Outstanding Amount",
      transactionHistory: "Transaction History",
      date: "Date",
      amountSupplied: "Amount Supplied",
      amountRemaining: "Amount Remaining",
      notes: "Notes",
      noTransactionsFound: "No transactions found. Add your first transaction to get started.",
      
      // Profile
      accountInformation: "Account Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      role: "Role",
      accountActions: "Account Actions",
      signOut: "Sign Out",
      profileInfoNote: "Profile information is managed through your authentication provider. Contact your administrator if you need to update your details.",
      
      // Admin Panel
      manageUsersStores: "Manage users, stores, and system settings.",
      totalUsers: "Total Users",
      transactionsToday: "Transactions Today",
      totalValue: "Total Value",
      users: "Users",
      allStoresOverview: "All Stores Overview",
      settings: "Settings",
      userManagement: "User Management",
      addUser: "Add User",
      user: "User",
      noUsersFound: "No users found in the system.",
      noStoresFoundSystem: "No stores found in the system.",
      systemSettings: "System Settings",
      systemSettingsComingSoon: "System settings panel coming soon.",
      
      // Forms
      storeNameLabel: "Store Name",
      storeNamePlaceholder: "Enter store name",
      description: "Description",
      descriptionOptional: "Description (Optional)",
      storeDescriptionPlaceholder: "Store description",
      cancel: "Cancel",
      addStoreButton: "Add Store",
      creating: "Creating...",
      
      // Transaction Form
      addTransactionTitle: "Add Transaction",
      dateLabel: "Date",
      amountSuppliedLabel: "Amount Supplied",
      amountRemainingLabel: "Amount Remaining",
      notesOptional: "Notes (Optional)",
      transactionNotesPlaceholder: "Transaction notes",
      addTransactionButton: "Add Transaction",
      adding: "Adding...",
      
      // Messages
      storeCreated: "Store Created",
      storeCreatedDesc: "Your store has been created successfully.",
      transactionCreated: "Transaction Created",
      transactionCreatedDesc: "Your transaction has been added successfully.",
      unauthorized: "Unauthorized",
      unauthorizedDesc: "You are logged out. Logging in again...",
      error: "Error",
      failedCreateStore: "Failed to create store. Please try again.",
      failedCreateTransaction: "Failed to create transaction. Please try again.",
      accessDenied: "Access Denied",
      accessDeniedDesc: "You don't have permission to access the admin panel.",
      storeNotFound: "Store not found",
      storeNotFoundDesc: "The store you're looking for doesn't exist or you don't have access to it.",
      backToDashboard: "Back to Dashboard",
      
      // Language Settings
      language: "Language",
      changeLanguage: "Change Language",
      english: "English",
      arabic: "العربية",
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: "لوحة التحكم",
      stores: "المتاجر",
      reports: "التقارير",
      profile: "الملف الشخصي",
      adminPanel: "لوحة الإدارة",
      logout: "تسجيل الخروج",
      
      // Landing Page
      storeAccountManager: "نظام إدارة حسابات المتاجر",
      landingDescription: "إدارة حسابات متاجرك بسهولة. تتبع المخزون، راقب الأرصدة، واحتفظ بعملك يعمل بسلاسة.",
      getStarted: "ابدأ الآن",
      secureAccess: "وصول آمن",
      secureAccessDesc: "التحكم في الوصول القائم على الأدوار يضمن حماية بياناتك",
      realTimeTracking: "تتبع في الوقت الفعلي",
      realTimeTrackingDesc: "راقب المخزون والأرصدة في الوقت الفعلي",
      multiUserSupport: "دعم متعدد المستخدمين",
      multiUserSupportDesc: "تعاون مع فريقك عبر متاجر متعددة",
      
      // Dashboard
      welcomeBack: "مرحباً بعودتك! إليك ما يحدث مع متاجرك.",
      addStore: "إضافة متجر",
      totalStores: "إجمالي المتاجر",
      totalSuppliedDashboard: "إجمالي المورد",
      outstanding: "المستحق",
      netBalance: "الرصيد الصافي",
      yourStores: "متاجرك",
      storeName: "اسم المتجر",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشط",
      recentActivity: "النشاط الأخير",
      noRecentActivity: "لا يوجد نشاط حديث للعرض.",
      noStoresFound: "لم يتم العثور على متاجر. أنشئ متجرك الأول للبدء.",
      
      // Store Management
      allStores: "جميع المتاجر",
      owner: "المالك",
      created: "تاريخ الإنشاء",
      storeOwner: "مالك المتجر",
      storeDetails: "تفاصيل المتجر",
      
      // Store Details
      storeId: "معرف المتجر",
      addTransaction: "إضافة معاملة",
      totalSupplied: "إجمالي المورد",
      outstandingAmount: "المبلغ المستحق",
      transactionHistory: "تاريخ المعاملات",
      date: "التاريخ",
      amountSupplied: "المبلغ المورد",
      amountRemaining: "المبلغ المتبقي",
      notes: "الملاحظات",
      noTransactionsFound: "لم يتم العثور على معاملات. أضف معاملتك الأولى للبدء.",
      
      // Profile
      accountInformation: "معلومات الحساب",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      role: "الدور",
      accountActions: "إجراءات الحساب",
      signOut: "تسجيل الخروج",
      profileInfoNote: "معلومات الملف الشخصي تُدار من خلال مزود المصادقة الخاص بك. اتصل بالمسؤول إذا كنت بحاجة لتحديث تفاصيلك.",
      
      // Admin Panel
      manageUsersStores: "إدارة المستخدمين والمتاجر وإعدادات النظام.",
      totalUsers: "إجمالي المستخدمين",
      transactionsToday: "معاملات اليوم",
      totalValue: "القيمة الإجمالية",
      users: "المستخدمون",
      allStoresOverview: "نظرة عامة على جميع المتاجر",
      settings: "الإعدادات",
      userManagement: "إدارة المستخدمين",
      addUser: "إضافة مستخدم",
      user: "المستخدم",
      noUsersFound: "لم يتم العثور على مستخدمين في النظام.",
      noStoresFoundSystem: "لم يتم العثور على متاجر في النظام.",
      systemSettings: "إعدادات النظام",
      systemSettingsComingSoon: "لوحة إعدادات النظام قريباً.",
      
      // Forms
      storeNameLabel: "اسم المتجر",
      storeNamePlaceholder: "أدخل اسم المتجر",
      description: "الوصف",
      descriptionOptional: "الوصف (اختياري)",
      storeDescriptionPlaceholder: "وصف المتجر",
      cancel: "إلغاء",
      addStoreButton: "إضافة متجر",
      creating: "جارٍ الإنشاء...",
      
      // Transaction Form
      addTransactionTitle: "إضافة معاملة",
      dateLabel: "التاريخ",
      amountSuppliedLabel: "المبلغ المورد",
      amountRemainingLabel: "المبلغ المتبقي",
      notesOptional: "الملاحظات (اختياري)",
      transactionNotesPlaceholder: "ملاحظات المعاملة",
      addTransactionButton: "إضافة معاملة",
      adding: "جارٍ الإضافة...",
      
      // Messages
      storeCreated: "تم إنشاء المتجر",
      storeCreatedDesc: "تم إنشاء متجرك بنجاح.",
      transactionCreated: "تم إنشاء المعاملة",
      transactionCreatedDesc: "تم إضافة معاملتك بنجاح.",
      unauthorized: "غير مخول",
      unauthorizedDesc: "تم تسجيل خروجك. جارٍ تسجيل الدخول مرة أخرى...",
      error: "خطأ",
      failedCreateStore: "فشل في إنشاء المتجر. يرجى المحاولة مرة أخرى.",
      failedCreateTransaction: "فشل في إنشاء المعاملة. يرجى المحاولة مرة أخرى.",
      accessDenied: "تم رفض الوصول",
      accessDeniedDesc: "ليس لديك صلاحية للوصول إلى لوحة الإدارة.",
      storeNotFound: "المتجر غير موجود",
      storeNotFoundDesc: "المتجر الذي تبحث عنه غير موجود أو ليس لديك حق الوصول إليه.",
      backToDashboard: "العودة إلى لوحة التحكم",
      
      // Language Settings
      language: "اللغة",
      changeLanguage: "تغيير اللغة",
      english: "English",
      arabic: "العربية",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;