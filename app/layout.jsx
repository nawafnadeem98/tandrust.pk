import "./globals.css";
import Header from "@/components/layout/Header";
import DbNotice from "@/components/layout/DbNotice";
import UrduTranslator from "@/components/layout/UrduTranslator";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import EmergencyFloatingButton from "@/components/ui/EmergencyFloatingButton";
import PageTransition from "@/components/layout/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "tandrust.pk — Your Health. Your Care. Your Pakistan.",
  description:
    "Explore trusted health information, discover healthcare services, find verified doctors, and make informed decisions about your wellbeing across Pakistan.",
  keywords: [
    "tandrust.pk",
    "Pakistan Healthcare",
    "Doctors in Pakistan",
    "Hospitals in Lahore Faisalabad Multan Rawalpindi",
    "Health A-Z",
    "Medicines Pakistan DRAP",
    "Rescue 1122",
    "EPI Vaccination Schedule",
  ],
  authors: [{ name: "tandrust.pk National Health Initiative" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-brand-bg text-brand-text flex flex-col min-h-screen antialiased selection:bg-brand-mint selection:text-brand-teal-dark">
        <LanguageProvider>
          <AuthProvider>
            <AnnouncementBar />
            <DbNotice />
            <UrduTranslator />
            <Header />
            <main id="main-content" className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <EmergencyFloatingButton />
            <ScrollToTop />
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
