import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainNav from "../components/MainNav.jsx";

const POLICY_SECTIONS = [
  {
    id: "veri-sorumlusu",
    title: "1. Veri Sorumlusu",
    paragraphs: [
      "Bu Gizlilik Politikası, Beypro tarafından sunulan tüm hizmetler için geçerlidir.",
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında Beypro, Veri Sorumlusu sıfatıyla hareket etmektedir.",
      "E-posta: support@beypro.com",
      "Web: https://www.beypro.com",
    ],
  },
  {
    id: "kapsam",
    title: "2. Kapsam",
    paragraphs: ["Bu politika aşağıdaki hizmetleri kapsar:"],
    items: [
      "Mobil uygulamalar",
      "Web uygulamaları (QR menü, marketplace)",
      "POS sistemi",
      "Sipariş, rezervasyon ve biletleme hizmetleri",
    ],
  },
  {
    id: "toplanan-veriler",
    title: "3. Toplanan Kişisel Veriler",
    groups: [
      {
        subtitle: "3.1 Kimlik ve İletişim Bilgileri",
        items: ["Ad, soyad", "Telefon numarası", "E-posta adresi (varsa)"],
      },
      {
        subtitle: "3.2 İşlem Bilgileri",
        items: [
          "Sipariş ve rezervasyon bilgileri",
          "Ödeme yöntemi (kart bilgileri hariç)",
          "Teslimat bilgileri",
        ],
      },
      {
        subtitle: "3.3 Teknik Veriler",
        items: ["IP adresi", "Cihaz bilgileri", "Tarayıcı bilgileri", "Kullanım logları"],
      },
      {
        subtitle: "3.4 Konum Bilgisi",
        items: ["Yaklaşık veya anlık konum (teslimat ve yakın işletmeler için)"],
      },
    ],
  },
  {
    id: "hukuki-sebepler",
    title: "4. Kişisel Verilerin İşlenme Hukuki Sebepleri",
    paragraphs: ["KVKK ve GDPR kapsamında verileriniz aşağıdaki sebeplerle işlenir:"],
    items: [
      "Sözleşmenin kurulması ve ifası",
      "Meşru menfaatler (güvenlik, geliştirme, analiz)",
      "Açık rıza (pazarlama, bildirimler, WhatsApp mesajları)",
      "Yasal yükümlülükler",
    ],
  },
  {
    id: "kullanim-amaclari",
    title: "5. Verilerin Kullanım Amaçları",
    paragraphs: ["Toplanan veriler aşağıdaki amaçlarla kullanılır:"],
    items: [
      "Sipariş ve rezervasyon işlemlerini gerçekleştirmek",
      "Teslimat takibi sağlamak",
      "Müşteri bildirimleri göndermek (WhatsApp, SMS, e-posta)",
      "OTP doğrulama işlemlerini yapmak",
      "Hizmet kalitesini artırmak",
      "Güvenlik ve dolandırıcılığı önlemek",
    ],
  },
  {
    id: "veri-paylasimi",
    title: "6. Veri Paylaşımı",
    paragraphs: ["Beypro, kişisel verilerinizi satmaz.", "Veriler aşağıdaki taraflarla paylaşılabilir:"],
    groups: [
      {
        subtitle: "6.1 Hizmet Sağlayıcılar",
        items: ["Ödeme altyapıları", "Bulut servisleri (AWS, Vercel vb.)", "Mesajlaşma servisleri (WhatsApp API vb.)"],
      },
      {
        subtitle: "6.2 İşletmeler (Restoranlar vb.)",
        items: ["Sipariş ve rezervasyonların gerçekleştirilmesi için"],
      },
      {
        subtitle: "6.3 Resmi Kurumlar",
        items: ["Yasal zorunluluk durumunda"],
      },
    ],
  },
  {
    id: "yurt-disina-aktarim",
    title: "7. Yurt Dışına Veri Aktarımı",
    paragraphs: [
      "Verileriniz, hizmet sağlayıcılar aracılığıyla Türkiye veya Avrupa Birliği dışına aktarılabilir.",
      "Bu aktarım GDPR standart sözleşmeleri ve KVKK uyumlu güvenlik önlemleri çerçevesinde gerçekleştirilir.",
    ],
  },
  {
    id: "saklama-suresi",
    title: "8. Veri Saklama Süresi",
    paragraphs: ["Kişisel verileriniz aşağıdaki koşullarda saklanır:"],
    items: [
      "Hizmet sunumu süresince",
      "Yasal yükümlülükler gereği",
      "Kullanıcı talebi doğrultusunda silinene kadar",
    ],
  },
  {
    id: "kullanici-haklari",
    title: "9. Kullanıcı Hakları",
    paragraphs: ["KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:"],
    items: [
      "Verilerinize erişim talep etme",
      "Düzeltme isteme",
      "Silinmesini talep etme",
      "İşlenmesine itiraz etme",
      "Açık rızayı geri çekme",
      "Veri taşınabilirliği talep etme",
    ],
    tail: ["Başvuru için: support@beypro.com"],
  },
  {
    id: "veri-guvenligi",
    title: "10. Veri Güvenliği",
    paragraphs: ["Beypro aşağıdaki güvenlik önlemlerini uygular:"],
    items: [
      "SSL / HTTPS şifreleme",
      "Güvenli veri tabanı yönetimi",
      "Yetkilendirme ve erişim kontrolü",
      "Loglama ve izleme sistemleri",
    ],
  },
  {
    id: "cerezler",
    title: "11. Çerezler (Cookies)",
    paragraphs: [
      "Beypro, kullanıcı deneyimini geliştirmek için çerezler kullanabilir.",
      "Kullanıcılar çerezleri tarayıcı ayarlarından yönetebilir.",
    ],
  },
  {
    id: "bildirimler",
    title: "12. Bildirimler ve Mesajlaşma",
    paragraphs: ["Beypro kullanımı sırasında aşağıdaki bildirimler gönderilebilir:"],
    items: ["Sipariş onayı", "Rezervasyon hatırlatma", "Teslimat durumu", "OTP doğrulama kodu"],
    tail: [
      "Bu bildirimler WhatsApp, SMS ve E-posta üzerinden iletilebilir.",
      "Pazarlama mesajları yalnızca kullanıcı onayı ile gönderilir.",
    ],
  },
  {
    id: "ucuncu-taraflar",
    title: "13. Üçüncü Taraf Hizmetler",
    paragraphs: ["Beypro aşağıdaki servislerle entegre olabilir:"],
    items: ["WhatsApp (Meta Platforms Inc.)", "Ödeme sağlayıcılar", "Analitik araçlar"],
    tail: ["Bu hizmetlerin kendi gizlilik politikaları geçerlidir."],
  },
  {
    id: "cocuklarin-gizliligi",
    title: "14. Çocukların Gizliliği",
    paragraphs: [
      "Beypro hizmetleri, 18 yaş altı bireyler için ebeveyn izni olmadan kullanılmamalıdır.",
    ],
  },
  {
    id: "politika-guncellemeleri",
    title: "15. Politika Güncellemeleri",
    paragraphs: [
      "Bu politika zaman zaman güncellenebilir.",
      "Güncellemeler bu sayfa üzerinden duyurulur.",
    ],
  },
  {
    id: "iletisim",
    title: "16. İletişim",
    paragraphs: [
      "Her türlü soru ve talepleriniz için:",
      "support@beypro.com",
      "https://www.beypro.com",
    ],
  },
];

function Section({ section }) {
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

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const dateLocale = useMemo(() => {
    const lang = String(i18n.resolvedLanguage || i18n.language || "tr").toLowerCase();
    if (lang.startsWith("de")) return "de-DE";
    if (lang.startsWith("en")) return "en-US";
    return "tr-TR";
  }, [i18n.language, i18n.resolvedLanguage]);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    [dateLocale]
  );
  const policySections = useMemo(
    () => t("privacy_sections", { returnObjects: true, defaultValue: POLICY_SECTIONS }),
    [t, i18n.language]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <MainNav tone="light" className="bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70 sticky top-0 z-40 border-b border-slate-800" />

      <main className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold">Beypro</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mt-3">
            {t("privacy_title")}
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mt-3">
            {t("privacy_last_updated", { date: today })}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-1">
            {t("privacy_effective_date", { date: today })}
          </p>
        </header>

        <nav aria-label={t("privacy_nav_label")} className="mb-10">
          <div className="flex flex-wrap gap-2">
            {policySections.map((section) => (
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
          {policySections.map((section) => (
            <Section key={section.id} section={section} />
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
