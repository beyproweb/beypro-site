import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";

const COOKIE_SECTIONS = [
  {
    id: "amac",
    title: "1. Amaç",
    paragraphs: [
      "Bu Çerez Politikası, Beypro platformunu ziyaret eden kullanıcıların deneyimini iyileştirmek amacıyla kullanılan çerezler hakkında bilgi vermek için hazırlanmıştır.",
    ],
  },
  {
    id: "cerez-nedir",
    title: "2. Çerez Nedir?",
    paragraphs: [
      "Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.",
      "Bu dosyalar sayesinde tercihleriniz hatırlanır, oturumunuz korunur ve site performansı analiz edilir.",
    ],
  },
  {
    id: "cerez-turleri",
    title: "3. Kullanılan Çerez Türleri",
    groups: [
      {
        subtitle: "Zorunlu Çerezler",
        items: ["Web sitesinin düzgün çalışması için gereklidir.", "Oturum yönetimi", "Güvenlik doğrulama"],
      },
      {
        subtitle: "Performans ve Analitik Çerezleri",
        items: ["Kullanıcı davranışlarını analiz ederek platformu geliştirmek için kullanılır.", "Hangi sayfalar daha çok ziyaret ediliyor", "Kullanıcı akışları"],
      },
      {
        subtitle: "Fonksiyonel Çerezler",
        items: ["Kullanıcı deneyimini kişiselleştirir.", "Dil tercihi", "Tema ayarları"],
      },
      {
        subtitle: "Reklam ve Pazarlama Çerezleri",
        items: ["Kullanıcıya ilgi alanına uygun içerik ve reklam göstermek için kullanılır."],
      },
    ],
  },
  {
    id: "kullanim-amaclari",
    title: "4. Çerezlerin Kullanım Amaçları",
    paragraphs: ["Beypro çerezleri aşağıdaki amaçlarla kullanır:"],
    items: [
      "Platform performansını artırmak",
      "Kullanıcı deneyimini geliştirmek",
      "Güvenliği sağlamak",
      "Analiz ve raporlama yapmak",
      "Pazarlama faaliyetlerini optimize etmek",
    ],
  },
  {
    id: "ucuncu-taraf",
    title: "5. Üçüncü Taraf Çerezler",
    paragraphs: [
      "Beypro, aşağıdaki hizmet sağlayıcıların çerezlerini kullanabilir:",
    ],
    items: ["Google Analytics", "Meta (Facebook) Pixel", "Diğer analiz ve reklam araçları"],
    tail: ["Bu çerezler üçüncü taraflar tarafından yönetilir."],
  },
  {
    id: "yonetim",
    title: "6. Çerezlerin Yönetimi",
    paragraphs: ["Kullanıcılar, tarayıcı ayarları üzerinden çerezleri kontrol edebilir:"],
    items: ["Çerezleri silebilir", "Engelleyebilir", "Bildirim alabilir"],
    tail: ["Ancak bazı çerezlerin devre dışı bırakılması, platformun düzgün çalışmasını etkileyebilir."],
  },
  {
    id: "kvkk",
    title: "7. KVKK Kapsamında Haklarınız",
    paragraphs: ["Kullanıcılar, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında:"],
    items: [
      "Verilerinin işlenip işlenmediğini öğrenme",
      "Düzeltme talep etme",
      "Silinmesini isteme",
      "İşlemeye itiraz etme",
    ],
    tail: ["haklarına sahiptir."],
  },
  {
    id: "degisiklikler",
    title: "8. Değişiklikler",
    paragraphs: ["Beypro, bu Çerez Politikası’nı güncelleme hakkını saklı tutar."],
  },
  {
    id: "iletisim",
    title: "9. İletişim",
    paragraphs: ["info@beypro.com", "https://www.beypro.com"],
  },
];

function CookieSection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-white font-semibold text-xl mt-8 mb-2">{section.title}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-gray-300 text-sm leading-relaxed mt-2">
          {paragraph}
        </p>
      ))}

      {section.items?.length ? (
        <ul className="mt-3 space-y-1">
          {section.items.map((item) => (
            <li key={item} className="text-gray-300 text-sm leading-relaxed">
              • {item}
            </li>
          ))}
        </ul>
      ) : null}

      {section.groups?.map((group) => (
        <div key={group.subtitle} className="mt-4">
          <h3 className="text-white font-semibold text-base mb-2">{group.subtitle}</h3>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item} className="text-gray-300 text-sm leading-relaxed">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.tail?.map((line) => (
        <p key={line} className="text-gray-300 text-sm leading-relaxed mt-3">
          {line}
        </p>
      ))}
    </section>
  );
}

export default function Cookies() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold">Beypro</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mt-3">Çerez Politikası</h1>
          <p className="text-gray-300 text-sm leading-relaxed mt-3">Son güncelleme: 07 Nisan 2026</p>
        </header>

        <nav aria-label="Çerez Politikası Bölümleri" className="mb-10">
          <div className="flex flex-wrap gap-2">
            {COOKIE_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-xs text-slate-200 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 hover:bg-slate-800 transition"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        <article className="space-y-6">
          {COOKIE_SECTIONS.map((section) => (
            <CookieSection key={section.id} section={section} />
          ))}
        </article>
      </main>

      <footer className="bg-slate-950 text-slate-400 text-sm py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-bold text-white">Beypro</span>{" "}
            <span className="text-slate-600">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-400 text-xs">
            <Link to="/privacy" className="hover:text-white transition duration-300">
              {t("legal_privacy")}
            </Link>
            <Link to="/terms" className="hover:text-white transition duration-300">
              {t("legal_terms")}
            </Link>
            <Link to="/cookies" className="hover:text-white transition duration-300">
              {t("legal_cookies")}
            </Link>
            <Link to="/seller-agreement" className="hover:text-white transition duration-300">
              {t("legal_seller_agreement")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
