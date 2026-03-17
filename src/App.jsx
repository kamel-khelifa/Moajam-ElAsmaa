import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Sparkles, Users, BookOpen, Feather, SlidersHorizontal, Star, Loader2, ExternalLink, LayoutGrid, List, Grid } from 'lucide-react';

// --- GOOGLE APPS SCRIPT INTEGRATION ---
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS4Ze823Sw7FMduPkhvPbv-ckQEPPWHiG6lcL3eHxF8rExpWNZyHZ6_8bNcOflM4pvIQ/exec';

// --- FALLBACK MOCK DATA ---
const mockDatabase = [
  { id: '1', name: 'أَبُو بَكْر', gender: 'ذكر', genderFilter: 'ذكور', meaning: 'المبادر، أو البكر من الإبل.', description: 'اسم مركب يعبر عن السبق والمبادرة للخير، وهو كنية لأول الخلفاء الراشدين. (المصدر: السيرة النبوية)', famousPeople: ['أبو بكر الصديق'], earliestAppearance: 'شبه الجزيرة العربية', tags: ['صحابة', 'قيادي'], referenceUrl: 'https://ar.wikipedia.org/wiki/%D8%A3%D8%A8%D9%88_%D8%A8%D9%83%D8%B1_%D8%A7%D9%84%D8%B5%D8%AF%D9%8A%D9%82' },
  { id: '2', name: 'خَدِيجَة', gender: 'أنثى', genderFilter: 'إناث', meaning: 'المولودة قبل تمام أشهر الحمل وتعيش.', description: 'اسم أيقوني في التاريخ، يرمز للدعم، الحكمة، والوفاء المطلق. [كتاب التراجم]', famousPeople: ['خديجة بنت خويلد'], earliestAppearance: 'شبه الجزيرة العربية', tags: ['صحابة', 'أيقوني'], referenceUrl: '' },
  { id: '3', name: 'يُوسُف', gender: 'ذكر', genderFilter: 'ذكور', meaning: 'الله يزيد، ويضاعف.', description: 'اسم نبي عُرف بالجمال الفائق والحكمة وتأويل الرؤى.', famousPeople: ['النبي يوسف عليه السلام'], earliestAppearance: 'تاريخ قديم', tags: ['أنبياء', 'جمال'], referenceUrl: '' },
  { id: '4', name: 'لَيَان', gender: 'أنثى', genderFilter: 'إناث', meaning: 'الرقة، اللطافة، والنعومة.', description: 'اسم عربي جميل ورقيق، منتشر بكثرة في العصر الحديث.', famousPeople: [], earliestAppearance: 'معاصر', tags: ['معاصر', 'رقيق'], referenceUrl: '' }
];

// --- EMAIL CONTACT COMPONENT ---
const EmailContact = () => {
  return (
    <div className="flex flex-col gap-3 font-sans">
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=kamel.kkhelifa@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-[#EA4335] text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Feather className="w-5 h-5 ml-2 rtl:mr-0" />
          الفتح عبر Gmail
        </a>
      </div>
    </div>
  );
};

// --- STATIC PAGES CONTENT ---
const staticPagesContent = {
  about: { title: 'عن المعجم', content: 'معجم الأسماء العربية هو منصة رقمية ثقافية تهدف إلى توثيق وحفظ معاني الأسماء والكنى العربية الأصيلة، ليكون مرجعاً موثوقاً للباحثين والآباء والأمهات في اختيار أسماء أبنائهم.' },
  contact: {
    title: 'تواصل معنا',
    content: (
      <div className="space-y-6">
        <p>نسعد بتواصلكم معنا واقتراحاتكم لتطوير المعجم. يمكنكم مراسلتنا عبر البريد الإلكتروني:</p>
        <EmailContact />
      </div>
    )
  },
  privacy: { title: 'سياسة الخصوصية', content: 'نحن نولي أهمية كبرى لخصوصيتك. المعجم لا يقوم بجمع أي بيانات شخصية حساسة دون موافقتك الصريحة، ويقتصر جمع البيانات على تحسين تجربة الاستخدام فقط.' },
  terms: { title: 'شروط الاستخدام', content: 'استخدامك لهذا المعجم يعني موافقتك على شروط الاستخدام. جميع النصوص والمحتويات المعروضة محمية بحقوق النشر ويُمنع استخدامها لأغراض تجارية دون إذن مسبق.' },
  contribute: {
    title: 'المساهمة في المعجم',
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed">المعجم مشروع مجتمعي متنامٍ. إذا كان لديك اسم عربي أصيل غير موجود في المعجم، يسعدنا أن تساهم بإضافته مع معناه ومصدره الموثوق ليتم مراجعته ونشره.</p>
        <div className="mt-8 p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center">
          <p className="text-stone-600 mb-6">اضغط على الزر أدناه للانتقال إلى نموذج Google الآمن لإضافة مقترحك:</p>
          <a
            href="https://forms.gle/6v3zVPBEtdyp65kH6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-amber-600 to-amber-500 text-white rounded-xl hover:from-amber-700 hover:to-amber-600 transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              الانتقال إلى نموذج المساهمة
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    )
  },
};

// --- TEXT FORMATTER FOR BRACKETS ---
const FormattedText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/([(\[][^)\]]+[)\]])/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/^[(\[][^)\]]+[)\]]$/)) {
          const cleanText = part.substring(1, part.length - 1);
          return (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 mx-1 text-xs font-bold tracking-widest text-amber-300 bg-stone-900 rounded-md shadow-sm align-middle">
              {cleanText}
            </span>
          );
        }
        return <span key={index} className="leading-relaxed">{part}</span>;
      })}
    </>
  );
};

// Helper to strip references for card views
const removeReferences = (text) => {
  if (!text) return '';
  return text.replace(/[(\[][^)\]]+[)\]]/g, '').replace(/\s{2,}/g, ' ').trim();
};

// --- COMPONENTS ---

const StaticPageModal = ({ pageData, onClose }) => {
  useEffect(() => {
    if (pageData) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [pageData]);

  if (!pageData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-md transition-opacity cursor-pointer" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 bg-stone-100/80 backdrop-blur-sm rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="bg-stone-50 p-6 md:p-8 border-b border-stone-100 flex items-center shrink-0">
          <BookOpen className="w-6 h-6 text-amber-600 ml-3" />
          <h2 className="font-title text-2xl md:text-3xl font-bold text-stone-900 mt-1 pr-2">{pageData.title}</h2>
        </div>
        <div className="p-6 md:p-8 sm:p-10 overflow-y-auto">
          <div className="text-base md:text-lg text-stone-600 leading-relaxed">
            {pageData.content}
          </div>
          <div className="mt-8 md:mt-10 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-amber-700 hover:shadow-lg transition-all"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FIXED MODAL FOR MOBILE VIEW ---
const NameDetailModal = ({ nameData, onClose }) => {
  useEffect(() => {
    if (nameData) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [nameData]);

  if (!nameData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans" dir="rtl">
      <div
        className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-50 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-50 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 hover:bg-white hover:scale-105 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full overflow-y-auto flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 flex-none bg-stone-900 text-stone-50 p-6 pt-16 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 -left-20 w-72 h-72 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
            </div>

            <div className="relative z-10 flex flex-col items-start">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-300 bg-amber-900/40 border border-amber-400/20 rounded-full">
                <Sparkles className="w-3 h-3 ml-1.5 text-amber-400" />
                {nameData.gender}
              </span>
              
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-amber-50 leading-tight drop-shadow-lg w-full">
                {nameData.name}
              </h2>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
                <FormattedText text={nameData.meaning} />
              </p>
            </div>
          </div>

          <div className="w-full md:w-3/5 flex-none p-6 md:p-10 space-y-6 md:space-y-8 bg-white/60">
            <section>
              <h3 className="flex items-center font-title text-sm md:text-base font-bold text-amber-700 mb-3 uppercase tracking-wide">
                <BookOpen className="w-4 h-4 ml-2" /> المعنى والمغزى
              </h3>
              <p className="text-base sm:text-lg text-stone-800 leading-relaxed">
                <FormattedText text={nameData.description || nameData.meaning} />
              </p>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>

            {nameData.famousPeople && nameData.famousPeople.length > 0 && (
              <>
                <section>
                  <h3 className="flex items-center font-title text-sm md:text-base font-bold text-amber-700 mb-3 uppercase tracking-wide">
                    <Users className="w-4 h-4 ml-2" /> شخصيات بارزة حملت الاسم
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    {nameData.famousPeople.map((person, idx) => (
                      <li key={idx} className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100">
                        <Star className="w-4 h-4 ml-2 text-amber-500 shrink-0" />
                        <span className="text-stone-800 text-sm font-medium">{person}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              </>
            )}

            {nameData.referenceUrl && (
              <>
                <section>
                  <h3 className="flex items-center font-title text-sm md:text-base font-bold text-amber-700 mb-3 uppercase tracking-wide">
                    <ExternalLink className="w-4 h-4 ml-2" /> المراجع والمصادر
                  </h3>
                  <a
                    href={nameData.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors group"
                  >
                    <div className="flex flex-col pr-1 overflow-hidden">
                      <span className="text-stone-800 font-bold text-sm mb-1 group-hover:text-amber-900 truncate">
                        تصفح المصدر الخارجي للاسم
                      </span>
                      <span className="text-stone-400 text-[10px] truncate max-w-[200px] sm:max-w-xs">
                        {nameData.referenceUrl}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-400 group-hover:text-amber-600 shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                </section>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              </>
            )}

            <section className="pt-2">
              <div className="flex flex-wrap gap-2">
                {nameData.tags?.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white text-stone-600 border border-stone-200 rounded-full text-xs font-bold shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

const NameCard = ({ data, onClick, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onClick(data)}
        className="group flex flex-row items-center gap-4 sm:gap-6 bg-white rounded-2xl p-4 sm:p-5 cursor-pointer border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200/50 transition-all duration-300 transform hover:-translate-y-1 w-full"
      >
        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden group-hover:border-amber-200 transition-colors">
          <span className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 text-4xl sm:text-5xl font-title text-stone-200/50 select-none z-0">{data.name}</span>
          <span className="relative z-10 text-xl sm:text-2xl font-bold font-title text-stone-800 group-hover:text-amber-700 transition-colors">{data.name.charAt(0)}</span>
        </div>
        
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h3 className="font-title text-lg sm:text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">{data.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 sm:py-1 rounded-sm shadow-sm ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600' : data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {data.gender || 'غير محدد'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed">{removeReferences(data.meaning)}</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'compact') {
    return (
      <div
        onClick={() => onClick(data)}
        className="group relative bg-white rounded-2xl p-3 sm:p-5 cursor-pointer overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200/60 transition-all duration-300 ease-out transform hover:-translate-y-1 flex flex-col items-center text-center h-full min-h-[130px] sm:min-h-[140px]"
      >
        <div className="absolute -bottom-2 -left-2 text-5xl sm:text-6xl font-title font-bold text-stone-50 group-hover:text-amber-50/60 transition-colors duration-500 select-none z-0 whitespace-nowrap opacity-70 pointer-events-none">
          {data.name}
        </div>

        <div className="relative z-10 flex flex-col items-center h-full w-full pointer-events-none">
          <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 mb-2 sm:mb-3 rounded-md pointer-events-auto shadow-sm
            ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
              data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
              'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {data.gender || 'غير محدد'}
          </span>
          
          <h3 className="font-title text-lg sm:text-2xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors drop-shadow-sm line-clamp-1 w-full px-1">
            {data.name}
          </h3>
          
          <p className="text-[10px] sm:text-xs text-stone-500 line-clamp-2 mt-auto leading-relaxed w-full pb-1">
            {removeReferences(data.meaning)}
          </p>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div
      onClick={() => onClick(data)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 cursor-pointer overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:border-amber-200/60 transition-all duration-500 ease-out transform hover:-translate-y-1.5 min-h-[150px] sm:min-h-[200px]"
    >
      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 text-6xl sm:text-8xl font-title font-bold text-stone-50 group-hover:text-amber-50/60 transition-colors duration-500 select-none z-0 whitespace-nowrap opacity-70 pointer-events-none">
        {data.name}
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-3 sm:mb-8">
          <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-md pointer-events-auto shadow-sm
            ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
              data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
              'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {data.gender || 'غير محدد'}
          </span>
          {data.tags && data.tags.length > 0 && (
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-1 sm:py-1.5 text-stone-500 bg-stone-100 border border-stone-200 rounded-md shadow-sm">
              {data.tags[0]}
            </span>
          )}
        </div>
        
        <h3 className="font-title text-2xl sm:text-3xl font-bold text-stone-900 mb-2 sm:mb-4 group-hover:text-amber-700 transition-colors drop-shadow-sm line-clamp-1">
          {data.name}
        </h3>
        <p className="text-[11px] sm:text-sm text-stone-500 line-clamp-3 mt-auto leading-relaxed pb-1">
          {removeReferences(data.meaning)}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('الكل');
  const [selectedName, setSelectedName] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedLetter, setSelectedLetter] = useState('الكل');
  const [activeStaticPage, setActiveStaticPage] = useState(null);

  const arabicAlphabet = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];

  const cleanArabicText = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا')        
      .replace(/ى/g, 'ي')            
      .replace(/ة/g, 'ه')            
      .trim();                       
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
        setNames(mockDatabase);
        setLoading(false);
        return;
      }

      const cachedData = localStorage.getItem('arabic_names_cache_v2');
      if (cachedData) {
        setNames(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        
        setNames(data);
        localStorage.setItem('arabic_names_cache_v2', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching from Apps Script:', error);
        if (!cachedData) setNames(mockDatabase);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNames = useMemo(() => {
    const cleanSearchTerm = cleanArabicText(searchTerm);

    return names.filter(name => {
      const cleanName = cleanArabicText(name.name);
      const cleanMeaning = cleanArabicText(name.meaning);
      
      const matchesSearch = cleanName.includes(cleanSearchTerm) ||
                            cleanMeaning.includes(cleanSearchTerm) ||
                            (name.famousPeople && name.famousPeople.some(p => cleanArabicText(p).includes(cleanSearchTerm))) ||
                            (name.tags && name.tags.some(tag => cleanArabicText(tag).includes(cleanSearchTerm)));
                            
      const matchesGender = genderFilter === 'الكل' ? true :
                            (name.genderFilter === genderFilter || name.genderFilter === 'الكل');
      
      let matchesLetter = true;
      if (selectedLetter !== 'الكل') {
         const letterToMatch = selectedLetter === 'هـ' ? 'ه' : cleanArabicText(selectedLetter);
         matchesLetter = cleanName.startsWith(letterToMatch);
      }
      
      return matchesSearch && matchesGender && matchesLetter;
    });
  }, [searchTerm, genderFilter, selectedLetter, names]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900" dir="rtl">
      
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-40 border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-title text-2xl font-bold tracking-tight text-stone-800">معجم الأسماء</span>
          </div>
          <div className="hidden sm:flex space-x-8 space-x-reverse text-sm font-bold text-stone-500">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-amber-700 transition-colors">تصفح الأسماء</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.about)} className="hover:text-stone-900 transition-colors">عن المعجم</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.contact)} className="hover:text-stone-900 transition-colors">تواصل معنا</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <h1 className="font-title text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.3] pb-2 drop-shadow-sm">
            <span className="text-stone-900">معجم الأسماء</span> <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500">
              والكنى العربية
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            دليلك الشامل لمعاني الأسماء العربية الأصيلة. استلهم من أسماء الأنبياء عليهم السلام و صحابة رسول الله ﷺ و شخصيات تاريخية عظيمة.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-5xl mx-auto bg-white p-2 sm:p-3 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col lg:flex-row items-center gap-4 relative z-30">
          
          <div className="flex-1 w-full flex items-center px-4 bg-stone-50 rounded-xl border border-stone-100 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-300 transition-all">
            <Search className="w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="ابحث بالاسم، المعنى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none py-3 sm:py-4 px-3 sm:px-4 text-stone-800 placeholder-stone-400 focus:outline-none font-medium text-sm sm:text-base"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-600 transition-colors bg-stone-200 p-1 rounded-full shrink-0">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 px-1 sm:px-2">
            <div className="flex bg-stone-100 p-1 rounded-xl w-full sm:w-auto">
              {['الكل', 'إناث', 'ذكور'].map(gender => (
                <button
                  key={gender}
                  onClick={() => setGenderFilter(gender)}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-bold transition-all ${
                    genderFilter === gender
                      ? 'bg-white text-amber-700 shadow-sm border border-stone-200/50'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="flex w-full sm:w-auto justify-center items-center bg-stone-100 p-1 rounded-xl border border-stone-200/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-2.5 rounded-lg transition-all flex-1 sm:flex-none flex justify-center ${viewMode === 'grid' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 sm:p-2.5 rounded-lg transition-all flex-1 sm:flex-none flex justify-center ${viewMode === 'compact' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 sm:p-2.5 rounded-lg transition-all flex-1 sm:flex-none flex justify-center ${viewMode === 'list' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex flex-wrap gap-2 pb-2 items-center justify-center px-2">
            <button
              onClick={() => setSelectedLetter('الكل')}
              className={`font-title shrink-0 h-9 sm:h-10 px-3 sm:px-4 rounded-xl flex items-center justify-center transition-all shadow-sm text-xs sm:text-sm font-bold ${
                selectedLetter === 'الكل'
                  ? 'bg-amber-600 text-white shadow-amber-900/20 border-transparent'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              الكل
            </button>
            <div className="w-px h-6 bg-stone-200 mx-1 shrink-0"></div>
            {arabicAlphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`font-title shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shadow-sm text-lg sm:text-xl font-bold pt-1 ${
                  selectedLetter === letter
                    ? 'bg-amber-600 text-white shadow-amber-900/20 border-transparent'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 mb-6 flex justify-between items-end border-b border-stone-200/60 pb-4">
          <h2 className="font-title text-xl sm:text-2xl font-bold text-stone-800">
            {searchTerm ? 'نتائج البحث' : 'معجم الأسماء'}
          </h2>
          <span className="text-xs sm:text-sm font-bold text-stone-500 bg-stone-100 px-3 sm:px-4 py-1.5 rounded-full shadow-inner border border-stone-200/50">
            {loading ? '...' : filteredNames.length} {filteredNames.length === 1 ? 'اسم' : 'أسماء'}
          </span>
        </div>

        {/* Grid/List or Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-amber-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-bold text-lg">جاري استحضار الأسماء...</p>
          </div>
        ) : filteredNames.length > 0 ? (
          <div className={
            viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" :
            viewMode === 'compact' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto" :
            "flex flex-col gap-3 sm:gap-4 max-w-5xl mx-auto"
          }>
            {filteredNames.map(name => (
              <NameCard
                key={name.id}
                data={name}
                onClick={setSelectedName}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 sm:py-32 bg-white rounded-3xl border border-dashed border-stone-300 mt-8 max-w-3xl mx-auto px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100 shadow-sm">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
            </div>
            <h3 className="font-title text-2xl sm:text-3xl font-bold text-stone-900 mb-3">لم يتم العثور على أسماء</h3>
            <p className="text-sm sm:text-base text-stone-500">حاول تعديل كلمات البحث أو تغيير تصنيف الجنس.</p>
            <button
              onClick={() => {setSearchTerm(''); setGenderFilter('الكل');}}
              className="mt-8 px-6 sm:px-8 py-3 bg-stone-900 text-white rounded-full text-xs sm:text-sm font-bold tracking-wide hover:bg-amber-700 shadow-lg shadow-amber-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              مسح فلاتر البحث
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 font-sans font-medium">
          <div className="flex items-center space-x-2 space-x-reverse mb-4 md:mb-0">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-title font-bold text-stone-900 text-lg">معجم الأسماء</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <button onClick={() => setActiveStaticPage(staticPagesContent.privacy)} className="hover:text-amber-700 transition-colors">سياسة الخصوصية</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.terms)} className="hover:text-amber-700 transition-colors">شروط الاستخدام</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.contribute)} className="hover:text-amber-700 transition-colors">المساهمة في المعجم</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NameDetailModal
        nameData={selectedName}
        onClose={() => setSelectedName(null)}
      />
      
      <StaticPageModal
        pageData={activeStaticPage}
        onClose={() => setActiveStaticPage(null)}
      />

    </div>
  );
}

