import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";

const SELLER_AGREEMENT_SECTIONS = [
  {
    id: "taraflar",
    title: "1. Taraflar",
    paragraphs: [
      "Bu sözleşme, Beypro platformuna kayıt olan işletme (\"İşletme\") ile Beypro arasında akdedilmiştir.",
      "Beypro, işletmelerin müşterilere ulaşmasını sağlayan bir dijital platformdur.",
    ],
  },
  {
    id: "hizmet-kapsami",
    title: "2. Hizmet Kapsamı",
    paragraphs: ["Beypro işletmelere aşağıdaki hizmetleri sunar:"],
    items: [
      "POS sistemi",
      "QR menü ve online sipariş",
      "Masa rezervasyon sistemi",
      "Paket servis ve teslimat yönetimi",
      "Etkinlik ve bilet satışı",
      "Raporlama ve stok yönetimi",
    ],
  },
  {
    id: "isletme-yukumlulukleri",
    title: "3. İşletme Yükümlülükleri",
    paragraphs: ["İşletme aşağıdakileri kabul eder:"],
    items: [
      "Menü, fiyat ve içeriklerin doğruluğundan sorumludur.",
      "Siparişleri zamanında ve eksiksiz hazırlamakla yükümlüdür.",
      "Yasal mevzuata uygun hizmet vermek zorundadır.",
      "Müşteri şikayetlerini yönetmekle sorumludur.",
    ],
  },
  {
    id: "siparis-hizmet-sorumlulugu",
    title: "4. Sipariş ve Hizmet Sorumluluğu",
    items: [
      "Beypro yalnızca aracı platformdur.",
      "Siparişin hazırlanması, teslimatı ve hizmet kalitesi tamamen işletmeye aittir.",
      "Beypro, işletme kaynaklı sorunlardan sorumlu değildir.",
    ],
  },
  {
    id: "odeme-komisyon",
    title: "5. Ödeme ve Komisyon",
    items: [
      "Beypro, abonelik modeli ile hizmet sunabilir.",
      "Platform üzerinden yapılan satışlarda komisyon alınmayabilir (pakete bağlı).",
      "Ödeme gecikmelerinde hizmet askıya alınabilir.",
    ],
  },
  {
    id: "icerik-marka-kullanimi",
    title: "6. İçerik ve Marka Kullanımı",
    items: [
      "İşletme, Beypro üzerinde paylaştığı içeriklerden sorumludur.",
      "Beypro, işletme adı ve içeriklerini platformda tanıtım amacıyla kullanabilir.",
    ],
  },
  {
    id: "yasakli-kullanimlar",
    title: "7. Yasaklı Kullanımlar",
    paragraphs: ["İşletme aşağıdakileri yapamaz:"],
    items: [
      "Sahte sipariş oluşturmak.",
      "Platformu kötüye kullanmak.",
      "Yasalara aykırı ürün/hizmet sunmak.",
    ],
  },
  {
    id: "hesap-askiya-alma",
    title: "8. Hesap Askıya Alma",
    paragraphs: ["Beypro aşağıdaki durumlarda hesabı askıya alabilir:"],
    items: ["Sözleşme ihlali.", "Müşteri şikayetleri.", "Ödeme yapılmaması."],
  },
  {
    id: "veri-gizlilik",
    title: "9. Veri ve Gizlilik",
    paragraphs: [
      "İşletme, müşteri verilerini yalnızca hizmet amacıyla kullanmayı kabul eder.",
      "KVKK kapsamında veri koruma yükümlülüklerine uymak zorundadır.",
    ],
  },
  {
    id: "sorumluluk-siniri",
    title: "10. Sorumluluk Sınırı",
    paragraphs: ["Beypro aşağıdakilerden sorumlu tutulamaz:"],
    items: ["İşletme hataları.", "Hizmet aksaklıkları.", "Müşteri memnuniyetsizliği."],
  },
  {
    id: "sozlesmenin-feshi",
    title: "11. Sözleşmenin Feshi",
    paragraphs: ["Taraflar sözleşmeyi diledikleri zaman sonlandırabilir."],
  },
  {
    id: "hukuk-yetki",
    title: "12. Hukuk ve Yetki",
    paragraphs: [
      "Bu sözleşme Türkiye Cumhuriyeti hukukuna tabidir.",
      "Uyuşmazlıklarda İzmir Mahkemeleri yetkilidir.",
    ],
  },
  {
    id: "iletisim",
    title: "13. İletişim",
    paragraphs: ["info@beypro.com", "https://www.beypro.com"],
  },
];

function SellerAgreementSection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mt-8 mb-2">{section.title}</h2>

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
    </section>
  );
}

export default function SellerAgreement() {
  const { t, i18n } = useTranslation();
  const sections = useMemo(
    () => {
      const value = t("seller_agreement_sections", {
        returnObjects: true,
        defaultValue: SELLER_AGREEMENT_SECTIONS,
      });
      return Array.isArray(value) ? value : SELLER_AGREEMENT_SECTIONS;
    },
    [t, i18n.language]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-6">{t("seller_agreement_title")}</h1>
          <p className="text-gray-300 text-sm leading-relaxed">İşletme / Satıcı Sözleşmesi (Beypro Marketplace)</p>
          <p className="text-gray-300 text-sm leading-relaxed">{t("seller_agreement_last_updated")}</p>
        </header>

        <nav aria-label={t("seller_agreement_nav_label")} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
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
          {sections.map((section) => (
            <SellerAgreementSection key={section.id} section={section} />
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
