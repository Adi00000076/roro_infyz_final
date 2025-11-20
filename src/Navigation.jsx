import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./exta_lookups/Loader";

// Lazy load components
const Dashboard = lazy(() => import("./scenes/dashboard"));
const Team = lazy(() => import("./scenes/team"));
const Custmer = lazy(() => import("./roro/components/Custmer/Custmer"));
const Comercial = lazy(() => import("./roro/components/Comercial/Comercial"));
const ContractRegistrationList = lazy(() =>
  import(
    "./roro/components/Comercial/ContractRegistrationList/ContractRegistrationList"
  )
);
const CustmerRegistration = lazy(() =>
  import("./roro/components/Comercial/CustmerRegistration/CustmerRegistration")
);
const TariffGeneral = lazy(() =>
  import("./roro/components/Comercial/TariffGeneral/TariffGeneral")
);
const Admin = lazy(() => import("./ADM/MA/Admin"));
const Service = lazy(() => import("./ADM/MA/Service/Service"));

const Activity = lazy(() => import("./ADM/MA/Operations/Activity/Activity"));

const CompanyDetailes = lazy(() =>
  import("./ADM/MA/CompanyDetailes/CompanyDetailes")
);

const Manifest = lazy(() => import("./roro/components/Manifest/Manifest"));

const Navigation = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Custmer" element={<Custmer />} />

        <Route path="/Custmer/Manifest" element={<Manifest />} />

        <Route path="/Comercial" element={<Comercial />} />
        <Route
          path="/ContractRegistrationList"
          element={<ContractRegistrationList />}
        />
        <Route path="/CustmerRegistration" element={<CustmerRegistration />} />
        <Route path="/TariffGeneral" element={<TariffGeneral />} />
        {/* MAAD */}
        <Route path="/roro/MD" element={<Admin />} />

        <Route path="/roro/MD/Service" element={<Service />} />
        <Route path="/roro/MD/Activity" element={<Activity />} />
        <Route path="/roro/MD/CompanyDetailes" element={<CompanyDetailes />} />
      </Routes>
    </Suspense>
  );
};

export default Navigation;
