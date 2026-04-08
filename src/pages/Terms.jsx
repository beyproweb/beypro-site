import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";
import BrandLogo from "../components/BrandLogo.jsx";

const TERMS_SECTIONS = [
  {
    id: "taraflar",
    title: "1. Taraflar",
    paragraphs: [
      "İşbu Kullanım Şartları (“Sözleşme”), Beypro platformunu kullanan tüm gerçek ve tüzel kişiler (“Kullanıcı”) ile Beypro arasında akdedilmiştir.",
      "Beypro, restoranlar, işletmeler ve müşteriler arasında sipariş, rezervasyon, ödeme ve yönetim hizmetleri sunan bir dijital platformdur.",
    ],
  },
  {
    id: "hizmet-tanimi",
    title: "2. Hizmet Tanımı",
    paragraphs: ["Beypro aşağıdaki hizmetleri sunar:"],
    items: [
      "POS (Satış Noktası) sistemi",
      "Online sipariş ve QR menü",
      "Masa rezervasyon sistemi",
      "Paket servis ve teslimat yönetimi",
      "Etkinlik ve bilet satışı",
      "Stok ve raporlama araçları",
    ],
    tail: ["Beypro, bu hizmetleri geliştirme, değiştirme veya sonlandırma hakkını saklı tutar."],
  },
  {
    id: "hesap-olusturma",
    title: "3. Hesap Oluşturma ve Sorumluluk",
    items: [
      "Kullanıcılar, doğru ve güncel bilgiler sağlamakla yükümlüdür.",
      "Hesap güvenliği kullanıcıya aittir.",
      "Hesap üzerinden yapılan tüm işlemler kullanıcı sorumluluğundadır.",
    ],
    tail: ["Beypro, sahte veya kötüye kullanım tespit edilen hesapları askıya alma hakkına sahiptir."],
  },
  {
    id: "odeme-ucretlendirme",
    title: "4. Ödeme ve Ücretlendirme",
    items: [
      "Beypro hizmetleri aylık abonelik modeli ile sunulabilir.",
      "Platform üzerinden yapılan satışlardan komisyon alınmayabilir (kampanya veya paketlere bağlıdır).",
      "Ücretler, Beypro tarafından önceden bildirilmek şartıyla değiştirilebilir.",
    ],
    tail: ["Ödemelerin zamanında yapılmaması durumunda hizmet askıya alınabilir."],
  },
  {
    id: "kullanim-kurallari",
    title: "5. Kullanım Kuralları",
    paragraphs: ["Kullanıcılar aşağıdaki faaliyetlerde bulunamaz:"],
    items: [
      "Yasa dışı içerik paylaşımı",
      "Sistemlere zarar verme girişimi",
      "Sahte sipariş veya rezervasyon oluşturma",
      "Platformu kötüye kullanma",
    ],
    tail: ["Bu tür ihlallerde Beypro hesabı askıya alabilir veya sonlandırabilir."],
  },
  {
    id: "isletme-musteri",
    title: "6. İşletmeler ve Müşteri İlişkileri",
    paragraphs: ["Beypro, işletmeler ile müşteriler arasında aracı platformdur."],
    items: [
      "Sipariş, hizmet kalitesi ve teslimat sorumluluğu işletmeye aittir.",
      "Beypro, işletmelerin sunduğu hizmetlerden doğrudan sorumlu değildir.",
    ],
  },
  {
    id: "veri-gizlilik",
    title: "7. Veri ve Gizlilik",
    paragraphs: [
      "Kullanıcı verileri, Beypro’nun Gizlilik Politikası kapsamında işlenir.",
      "Gizlilik politikası: https://www.beypro.com/privacy",
    ],
  },
  {
    id: "fikri-mulkiyet",
    title: "8. Fikri Mülkiyet Hakları",
    items: [
      "Beypro markası, yazılımı ve tasarımları Beypro’ya aittir.",
      "İzinsiz kopyalama, dağıtım veya kullanım yasaktır.",
    ],
  },
  {
    id: "hizmet-kesintileri",
    title: "9. Hizmet Kesintileri",
    paragraphs: [
      "Beypro, teknik bakım, güncelleme veya mücbir sebepler nedeniyle hizmette kesinti yaşanabileceğini garanti eder.",
      "Bu durumlarda Beypro sorumluluk kabul etmez.",
    ],
  },
  {
    id: "fesih",
    title: "10. Sözleşmenin Feshi",
    paragraphs: ["Beypro aşağıdaki durumlarda hesabı sonlandırabilir:"],
    items: ["Kullanım şartlarının ihlali", "Ödeme yapılmaması", "Kötüye kullanım"],
    tail: ["Kullanıcı da istediği zaman hesabını kapatabilir."],
  },
  {
    id: "sorumluluk-siniri",
    title: "11. Sorumluluk Sınırı",
    paragraphs: ["Beypro aşağıdaki dolaylı zararlardan sorumlu tutulamaz:"],
    items: ["Veri kaybı", "İş kaybı", "Kar kaybı"],
  },
  {
    id: "degisiklikler",
    title: "12. Değişiklikler",
    paragraphs: [
      "Beypro, bu kullanım şartlarını dilediği zaman güncelleme hakkına sahiptir.",
      "Güncellemeler web sitesinde yayınlandığı anda yürürlüğe girer.",
    ],
  },
  {
    id: "uygulanacak-hukuk",
    title: "13. Uygulanacak Hukuk",
    paragraphs: [
      "İşbu sözleşme Türkiye Cumhuriyeti hukukuna tabidir.",
      "Uyuşmazlık durumunda İzmir Mahkemeleri ve İcra Daireleri yetkilidir.",
    ],
  },
  {
    id: "iletisim",
    title: "14. İletişim",
    paragraphs: ["Her türlü soru ve talepler için:", "info@beypro.com", "https://www.beypro.com"],
  },
];

function TermsSection({ section }) {
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

      {section.tail?.map((line) => (
        <p key={line} className="text-gray-300 text-sm leading-relaxed mt-3">
          {line}
        </p>
      ))}
    </section>
  );
}

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold">Beypro</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mt-3">{t("terms_title")}</h1>
          <p className="text-gray-300 text-sm leading-relaxed mt-3">Kullanım Şartları (Terms of Service)</p>
          <p className="text-gray-300 text-sm leading-relaxed mt-1">Son güncelleme: 07 Nisan 2026</p>
        </header>

        <nav aria-label="Kullanım Şartları Bölümleri" className="mb-10">
          <div className="flex flex-wrap gap-2">
            {TERMS_SECTIONS.map((section) => (
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
          {TERMS_SECTIONS.map((section) => (
            <TermsSection key={section.id} section={section} />
          ))}
        </article>
      </main>

      <footer className="bg-white text-slate-600 text-sm py-12 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <BrandLogo variant="footer" />
          </div>
          <div className="flex items-center flex-wrap justify-center gap-6 text-slate-600 text-xs">
            <Link to="/privacy" className="hover:text-slate-900 transition duration-300">
              {t("legal_privacy")}
            </Link>
            <Link to="/terms" className="hover:text-slate-900 transition duration-300">
              {t("legal_terms")}
            </Link>
            <Link to="/cookies" className="hover:text-slate-900 transition duration-300">
              {t("legal_cookies")}
            </Link>
            <Link to="/seller-agreement" className="hover:text-slate-900 transition duration-300">
              {t("legal_seller_agreement")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
