import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Sparkles, Users, BookOpen, Feather, Star, Loader2, ExternalLink, LayoutGrid, List, Grid } from 'lucide-react';

// --- GOOGLE APPS SCRIPT INTEGRATION ---
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxS4Ze823Sw7FMduPkhvPbv-ckQEPPWHiG6lcL3eHxF8rExpWNZyHZ6_8bNcOflM4pvIQ/exec';

// --- FALLBACK MOCK DATA ---
const mockDatabase = [
  { id: '1', name: 'أَبُو بَكْر', gender: 'ذكر', genderFilter: 'ذكور', meaning: 'المبادر، أو البكر من الإبل.', description: 'اسم مركب يعبر عن السبق والمبادرة للخير، وهو كنية لأول الخلفاء الراشدين. (المصدر: السيرة النبوية)', famousPeople: ['أبو بكر الصديق'], earliestAppearance: 'شبه الجزيرة العربية', tags: ['صحابة', 'قيادي'], referenceUrl: 'https://ar.wikipedia.org/wiki/%D8%A3%D8%A8%D9%88_%D8%A8%D9%83%D8%B1_%D8%A7%D9%84%D8%B5%D8%AF%D9%8A%D9%82' },
  { id: '2', name: 'خَدِيجَة', gender: 'أنثى', genderFilter: 'إناث', meaning: 'المولودة قبل تمام أشهر الحمل وتعيش.', description: 'اسم أيقوني في التاريخ، يرمز للدعم، الحكمة، والوفاء المطلق. [كتاب التراجم]', famousPeople: ['خديجة بنت خويلد'], earliestAppearance: 'شبه الجزيرة العربية', tags: ['صحابة', 'أيقوني'], referenceUrl: '' },
  { id: '3', name: 'يُوسُف', gender: 'ذكر', genderFilter: 'ذكور', meaning: 'الله يزيد، ويضاعف.', description: 'اسم نبي عُرف بالجمال الفائق والحكمة وتأويل الرؤى.', famousPeople: ['النبي يوسف عليه السلام'], earliestAppearance: 'تاريخ قديم', tags: ['أنبياء', 'جمال'], referenceUrl: '' },
  { id: '4', name: 'لَيَان', gender: 'أنثى', genderFilter: 'إناث', meaning: 'الرقة، اللطافة، والنعومة.', description: 'اسم عربي جميل ورقيق، منتشر بكثرة في العصر الحديث.', famousPeople: [], earliestAppearance: 'معاصر', tags: ['معاصر', 'رقيق'], referenceUrl: '' }
];

const EmailContact = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=kamel.kkhelifa@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-[#EA4335] text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Feather className="w-5 h-5 ml-2 rtl:mr-0 rtl:ml-2" />
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

// --- TEXT FORMATTER ---
const FormattedText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/([(\[][^)\]]+[)\]])/g);
  return (
    <React.Fragment>
      {parts.map((part, index) => {
        if (part.match(/^[(\[][^)\]]+[)\]]$/)) {
          const cleanText = part.substring(1, part.length - 1);
          return (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 mx-1 my-1 text-xs font-bold tracking-widest text-amber-300 bg-stone-900 rounded-md shadow-sm align-middle">
              {cleanText}
            </span>
          );
        }
        return <span key={index} className="leading-relaxed">{part}</span>;
      })}
    </React.Fragment>
  );
};

const removeReferences = (text) => {
  if (!text) return '';
  return text.replace(/[(\[][^)\]]+[)\]]/g, '').replace(/\s{2,}/g, ' ').trim();
};

// --- MODALS ---
const StaticPageModal = ({ pageData, onClose }) => {
  if (!pageData) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" dir="rtl">
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-md transition-opacity cursor-pointer" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl flex flex-col fade-in overflow-hidden max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 left-4 z-10 p-2.5 bg-stone-100 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-all shadow-sm">
          <X className="w-5 h-5" />
        </button>
        <div className="bg-stone-50 p-6 sm:p-8 border-b border-stone-100 flex items-center shrink-0">
          <BookOpen className="w-6 h-6 text-amber-600 ml-3" />
          <h2 className="text-2xl sm:text-3xl font-title font-bold text-stone-900 mt-1">{pageData.title}</h2>
        </div>
        <div className="p-6 sm:p-10 overflow-y-auto">
          <div className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
            {pageData.content}
          </div>
          <div className="mt-8 sm:mt-10 flex justify-end">
            <button onClick={onClose} className="px-8 py-3 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-900/20 transition-all w-full sm:w-auto font-sans">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NameDetailModal = ({ nameData, onClose }) => {
  if (!nameData) return null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6" dir="rtl">
      <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity cursor-pointer" onClick={onClose}></div>
      
      <div className="relative w-full h-[90vh] sm:h-auto sm:max-h-[90vh] max-w-4xl bg-stone-50 rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col fade-in overflow-hidden">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 left-4 z-[110] p-3 sm:p-2.5 bg-white/95 backdrop-blur-md rounded-full text-stone-800 hover:text-stone-900 hover:bg-white hover:scale-110 transition-all shadow-xl sm:shadow-sm border border-stone-200"
        >
          <X className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>
        
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* Right Column */}
          <div className="w-full md:w-2/5 bg-stone-900 text-stone-50 p-6 pt-16 sm:p-8 sm:pt-10 md:p-10 flex flex-col relative shrink-0">
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <div className="absolute top-0 -left-20 w-72 h-72 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center md:justify-start">
              <div className="self-start">
                <span className="inline-flex items-center px-4 py-1.5 mb-4 sm:mb-6 text-xs font-bold tracking-widest font-sans text-amber-300 bg-amber-900/30 border border-amber-400/20 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 ml-2 text-amber-400" />
                  {nameData.gender}
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-name font-bold mb-3 sm:mb-4 text-amber-50 leading-tight drop-shadow-lg break-words">{nameData.name}</h2>
              <p className="text-lg sm:text-xl text-stone-300 leading-relaxed font-sans line-clamp-2 md:line-clamp-none">
                <FormattedText text={nameData.meaning} />
              </p>
            </div>
          </div>

          {/* Left Column */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 space-y-6 sm:space-y-8 bg-white/60 backdrop-blur-xl flex-grow overflow-y-auto pb-24 sm:pb-12" style={{ scrollbarWidth: 'thin' }}>
            <section>
              <h3 className="flex items-center text-xs font-bold font-title tracking-widest text-amber-700/70 mb-3 sm:mb-4 uppercase">
                <BookOpen className="w-4 h-4 ml-2" /> المعنى والمغزى
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-stone-800 leading-relaxed font-sans">
                <FormattedText text={nameData.description || nameData.meaning} />
              </p>
            </section>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>

            {nameData.famousPeople && nameData.famousPeople.length > 0 && (
              <React.Fragment>
                <section>
                  <h3 className="flex items-center text-xs font-bold font-title tracking-widest text-amber-700/70 mb-3 sm:mb-4 uppercase">
                    <Users className="w-4 h-4 ml-2" /> شخصيات بارزة حملت الاسم
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nameData.famousPeople.map((person, idx) => (
                      <li key={idx} className="flex items-center p-3 bg-stone-50/50 rounded-xl border border-stone-100 hover:border-amber-200/50 transition-colors">
                        <Star className="w-4 h-4 ml-3 text-amber-500 shrink-0" />
                        <span className="text-stone-800 font-medium font-sans text-sm">{person}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              </React.Fragment>
            )}

            {nameData.referenceUrl && (
              <React.Fragment>
                <section>
                  <h3 className="flex items-center text-xs font-bold font-title tracking-widest text-amber-700/70 mb-3 sm:mb-4 uppercase">
                    <ExternalLink className="w-4 h-4 ml-2" /> المراجع والمصادر
                  </h3>
                  <a href={nameData.referenceUrl} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-300 overflow-hidden font-sans">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex flex-col">
                      <span className="text-stone-800 font-bold text-sm mb-1 group-hover:text-amber-900 transition-colors">تصفح المصدر الخارجي</span>
                      <span className="text-stone-400 text-xs line-clamp-1 w-48 sm:w-64" dir="ltr">{nameData.referenceUrl}</span>
                    </div>
                    <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-400 group-hover:text-amber-600 group-hover:scale-110 transition-all shrink-0 ml-2">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                </section>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              </React.Fragment>
            )}

            <section className="pt-2">
              <div className="flex flex-wrap gap-2 font-sans">
                {nameData.tags && nameData.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 sm:px-4 bg-white text-stone-600 border border-stone-200 rounded-full text-xs font-bold tracking-wide shadow-sm hover:shadow-md hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-all cursor-default">
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

// --- CARDS ---
const NameCard = ({ data, onClick, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div onClick={() => onClick(data)} className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white rounded-2xl p-4 sm:p-5 cursor-pointer border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200/50 transition-all duration-300 transform hover:-translate-y-1 w-full">
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden group-hover:border-amber-200 transition-colors">
          <span className="absolute -bottom-2 -left-2 text-4xl sm:text-5xl font-name font-bold text-stone-200/50 select-none z-0">{data.name}</span>
          <span className="relative z-10 text-xl sm:text-2xl font-name font-bold text-stone-800 group-hover:text-amber-700 transition-colors">{data.name.charAt(0)}</span>
        </div>
        <div className="flex-1 flex flex-col min-w-0 w-full font-sans">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl sm:text-2xl font-title font-bold text-stone-900 group-hover:text-amber-700 transition-colors truncate">{data.name}</h3>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600' : data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {data.gender || 'غير محدد'}
            </span>
          </div>
          <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">{removeReferences(data.meaning)}</p>
        </div>
        <div className="flex-shrink-0 self-end sm:self-center flex items-center text-xs font-bold font-sans text-amber-600 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-amber-50 px-3 py-2 rounded-lg mt-2 sm:mt-0">
          <Feather className="w-4 h-4 ml-2 sm:mr-2 sm:ml-0 rtl:ml-2 rtl:mr-0" /> التفاصيل
        </div>
      </div>
    );
  }

  if (viewMode === 'compact') {
    return (
      <div onClick={() => onClick(data)} className="group relative bg-white rounded-2xl p-4 sm:p-5 cursor-pointer overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200/60 transition-all duration-300 ease-out transform hover:-translate-y-1 flex flex-col items-center text-center h-full">
        <div className="absolute -bottom-2 -left-2 text-5xl sm:text-6xl font-name font-bold text-stone-50 group-hover:text-amber-50/60 transition-colors duration-500 select-none z-0 whitespace-nowrap opacity-70 pointer-events-none">{data.name}</div>
        <div className="relative z-10 flex flex-col items-center h-full w-full pointer-events-none font-sans">
          <span className={`text-[10px] font-bold px-2.5 py-1 mb-3 rounded-md pointer-events-auto shadow-sm ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600 border border-rose-100' : data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {data.gender || 'غير محدد'}
          </span>
          <h3 className="text-xl sm:text-3xl font-title font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors drop-shadow-sm">{data.name}</h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-auto leading-relaxed w-full">{removeReferences(data.meaning)}</p>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => onClick(data)} className="group relative bg-white rounded-3xl p-5 sm:p-8 cursor-pointer overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:border-amber-200/60 transition-all duration-500 ease-out transform hover:-translate-y-1.5 flex flex-col h-full">
      <div className="absolute -bottom-4 -left-4 text-7xl sm:text-8xl font-name font-bold text-stone-50 group-hover:text-amber-50/60 transition-colors duration-500 select-none z-0 whitespace-nowrap opacity-70 pointer-events-none">{data.name}</div>
      <div className="relative z-10 flex flex-col h-full pointer-events-none font-sans">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-md pointer-events-auto shadow-sm ${data.gender === 'أنثى' ? 'bg-rose-50 text-rose-600 border border-rose-100' : data.gender === 'ذكر' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {data.gender || 'غير محدد'}
          </span>
          {data.tags && data.tags.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-1.5 text-stone-500 bg-stone-100 border border-stone-200 rounded-md shadow-sm">{data.tags[0]}</span>
          )}
        </div>
        <h3 className="text-3xl sm:text-4xl font-title font-bold text-stone-900 mb-3 sm:mb-4 group-hover:text-amber-700 transition-colors drop-shadow-sm">{data.name}</h3>
        <p className="text-xs sm:text-sm text-stone-500 line-clamp-3 mt-auto leading-relaxed">{removeReferences(data.meaning)}</p>
        <div className="mt-6 sm:mt-8 flex items-center text-[10px] sm:text-xs font-bold text-amber-600 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 group-hover:translate-y-0">
          <Feather className="w-4 h-4 ml-2" /> اكتشف المزيد عن الاسم
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
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
    return text.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!APPS_SCRIPT_URL) {
        setNames(mockDatabase);
        setLoading(false);
        return;
      }
      const cachedData = localStorage.getItem('arabic_names_cache_v3');
      if (cachedData) {
        setNames(JSON.parse(cachedData));
        setLoading(false);
      }
      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        setNames(data);
        localStorage.setItem('arabic_names_cache_v3', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
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
      const matchesSearch = cleanName.includes(cleanSearchTerm) || cleanMeaning.includes(cleanSearchTerm) || 
        (name.famousPeople && name.famousPeople.some(p => cleanArabicText(p).includes(cleanSearchTerm))) || 
        (name.tags && name.tags.some(tag => cleanArabicText(tag).includes(cleanSearchTerm)));
      const matchesGender = genderFilter === 'الكل' ? true : (name.genderFilter === genderFilter || name.genderFilter === 'الكل');
      
      let matchesLetter = true;
      if (selectedLetter !== 'الكل') {
        const letterToMatch = selectedLetter === 'هـ' ? 'ه' : cleanArabicText(selectedLetter);
        matchesLetter = cleanName.startsWith(letterToMatch);
      }
      return matchesSearch && matchesGender && matchesLetter;
    });
  }, [searchTerm, genderFilter, selectedLetter, names]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 selection:bg-amber-200 selection:text-amber-900 pb-10" dir="rtl">
      
      {/* 🔴 INJECTED CSS TO GUARANTEE ARABIC FONTS ARE LOADED IN CANVAS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap');
        
        .font-name { font-family: 'Amiri', serif !important; }
        .font-title { font-family: 'Cairo', sans-serif !important; }
        .font-sans, body, input, button { font-family: 'Tajawal', sans-serif !important; }
      `}} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-40 border-b border-stone-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:rotate-12 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-title font-bold tracking-tight text-stone-800">معجم الأسماء</span>
          </div>
          <div className="hidden sm:flex space-x-8 space-x-reverse text-sm font-bold font-title text-stone-500">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-amber-700 transition-colors">تصفح الأسماء</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.about)} className="hover:text-stone-900 transition-colors">عن المعجم</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.contact)} className="hover:text-stone-900 transition-colors">تواصل معنا</button>
          </div>
          {/* Mobile Menu Info Icon */}
          <button onClick={() => setActiveStaticPage(staticPagesContent.about)} className="sm:hidden p-2 text-stone-500 hover:text-amber-600">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-36 pb-10 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-4 sm:space-y-6 mt-4 sm:mt-0">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-title font-bold leading-[1.3] pb-2 drop-shadow-sm">
            <span className="text-stone-900">معجم الأسماء</span> <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500">
              والكنى العربية
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-sans text-stone-500 font-medium leading-relaxed max-w-2xl mx-auto px-2">
            دليلك الشامل لمعاني الأسماء العربية الأصيلة. استلهم من أسماء الأنبياء و صحابة رسول الله ﷺ.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="max-w-5xl mx-auto bg-white p-2 sm:p-3 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col md:flex-row items-center gap-3 sm:gap-4 relative z-30">
          
          <div className="flex-1 w-full flex items-center px-4 bg-stone-50 rounded-xl border border-stone-100 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-300 transition-all font-sans">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="ابحث بالاسم، المعنى، أو التصنيف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none py-3.5 sm:py-4 px-3 sm:px-4 text-stone-800 placeholder-stone-400 focus:outline-none font-medium text-sm sm:text-base"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-600 transition-colors bg-stone-200 p-1.5 rounded-full shrink-0">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full md:w-auto flex items-center gap-2 sm:gap-3">
            <div className="flex bg-stone-100 p-1 rounded-xl w-full md:w-auto font-sans">
              {['الكل', 'إناث', 'ذكور'].map(gender => (
                <button
                  key={gender}
                  onClick={() => setGenderFilter(gender)}
                  className={`flex-1 md:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${genderFilter === gender ? 'bg-white text-amber-700 shadow-sm border border-stone-200/50' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/50">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}>
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('compact')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'compact' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-400 hover:text-stone-700'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="w-full overflow-x-auto pb-4 pt-1 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 items-center min-w-max">
              <button 
                onClick={() => setSelectedLetter('الكل')} 
                className={`shrink-0 h-10 px-4 rounded-xl flex items-center justify-center transition-all shadow-sm text-sm font-bold font-sans ${selectedLetter === 'الكل' ? 'bg-amber-600 text-white shadow-amber-900/20 border-transparent' : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'}`}
              >
                الكل
              </button>
              <div className="w-px h-6 bg-stone-200 mx-1 shrink-0"></div>
              {arabicAlphabet.map(letter => (
                <button 
                  key={letter} 
                  onClick={() => setSelectedLetter(letter)} 
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm font-name font-bold text-xl pt-1 ${selectedLetter === letter ? 'bg-amber-600 text-white shadow-amber-900/20 border-transparent' : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 mb-6 flex justify-between items-end border-b border-stone-200/60 pb-4">
          <h2 className="text-xl sm:text-2xl font-title font-bold text-stone-800">{searchTerm ? 'نتائج البحث' : 'تصفح الأسماء'}</h2>
          <span className="text-xs sm:text-sm font-bold font-sans text-stone-500 bg-stone-100 px-3 sm:px-4 py-1.5 rounded-full shadow-inner border border-stone-200/50">
            {loading ? '...' : filteredNames.length} {filteredNames.length === 1 ? 'اسم' : 'أسماء'}
          </span>
        </div>

        {/* Grid / List Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-amber-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-bold text-lg font-title">جاري استحضار الأسماء...</p>
          </div>
        ) : filteredNames.length > 0 ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" : viewMode === 'compact' ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto" : "flex flex-col gap-3 sm:gap-4 max-w-5xl mx-auto"}>
            {filteredNames.map(name => (
              <NameCard key={name.id} data={name} onClick={setSelectedName} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 sm:py-32 bg-white rounded-3xl border border-dashed border-stone-300 mt-8 max-w-3xl mx-auto px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100 shadow-sm">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-title font-bold text-stone-900 mb-3">لم يتم العثور على أسماء</h3>
            <p className="text-sm sm:text-base text-stone-500 font-sans">حاول تعديل كلمات البحث أو تغيير تصنيف الجنس.</p>
            <button onClick={() => {setSearchTerm(''); setGenderFilter('الكل');}} className="mt-8 px-6 sm:px-8 py-3 bg-stone-900 text-white rounded-full text-sm font-bold tracking-wide hover:bg-amber-700 shadow-lg shadow-amber-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all font-sans">
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
          <div className="flex flex-wrap justify-center gap-6 space-x-reverse">
            <button onClick={() => setActiveStaticPage(staticPagesContent.privacy)} className="hover:text-amber-700 transition-colors font-sans">سياسة الخصوصية</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.terms)} className="hover:text-amber-700 transition-colors font-sans">شروط الاستخدام</button>
            <button onClick={() => setActiveStaticPage(staticPagesContent.contribute)} className="hover:text-amber-700 transition-colors font-sans">المساهمة في المعجم</button>
          </div>
        </div>
      </footer>

      {/* Render Modals */}
      <NameDetailModal nameData={selectedName} onClose={() => setSelectedName(null)} />
      <StaticPageModal pageData={activeStaticPage} onClose={() => setActiveStaticPage(null)} />
    </div>
  );
}
