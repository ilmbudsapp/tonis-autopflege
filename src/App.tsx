import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SiteLayout from "@/components/layout/SiteLayout";
import { useDemoFonts } from "@/hooks/useDemoFonts";
import BewertungenPage from "@/pages/BewertungenPage";
import DatenschutzPage from "@/pages/DatenschutzPage";
import FaqPage from "@/pages/FaqPage";
import GutscheinePage from "@/pages/GutscheinePage";
import HomePage from "@/pages/HomePage";
import ImpressumPage from "@/pages/ImpressumPage";
import KontaktPage from "@/pages/KontaktPage";
import LeistungenPage from "@/pages/LeistungenPage";
import PartnerPage from "@/pages/PartnerPage";
import UeberMichPage from "@/pages/UeberMichPage";
import { ROUTES } from "@/lib/site";

export default function App() {
  useDemoFonts();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.leistungen} element={<LeistungenPage />} />
          <Route path={ROUTES.ueberMich} element={<UeberMichPage />} />
          <Route path={ROUTES.faq} element={<FaqPage />} />
          <Route path={ROUTES.partner} element={<PartnerPage />} />
          <Route path={ROUTES.bewertungen} element={<BewertungenPage />} />
          <Route path={ROUTES.kontakt} element={<KontaktPage />} />
          <Route path={ROUTES.impressum} element={<ImpressumPage />} />
          <Route path={ROUTES.datenschutz} element={<DatenschutzPage />} />
          <Route path={ROUTES.gutscheine} element={<GutscheinePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
