import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { Suspense } from "react";
import Terms from "./pages/Terms";
import BlogLogin from "./pages/BlogLogin";
import BlogUploadHome from "./pages/BlogUploadHome";
import UploadPage from "./pages/UploadPage";
import Loader from "./pages/Loader_LAWS";
import Loader_LAWS from "./pages/Loader_LAWS";

const Laws = lazy(() => import("./pages/Laws"));
const SubLaw = lazy(() => import("./pages/SubLaw"));
const SubLawDetails = lazy(() => import("./pages/SubLawDetails"));
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const MoreInfo = lazy(() => import("./pages/MoreInfo"));
const InternShip = lazy(() => import("./pages/InternShip"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes basename="/Lawyer">
          <Route path="/" index element={<Home />} />
          <Route path="/blog/:pg" element={<Blog />} />
          <Route path="/sub" element={<MoreInfo />} />
          <Route path="/law" element={<Laws />} />
          <Route path="/LawSection" element={<SubLaw />} />
          <Route path="/LawDetails" element={<SubLawDetails />} />
          <Route path="/Terms&Conditions" element={<Terms />} />
          <Route path="/BlogUploadLogin" element={<BlogLogin />} />
          <Route path="/BlogUpload/:page" element={<BlogUploadHome />} />
          <Route path="/Upload" element={<UploadPage />} />
          <Route path="/internship" element={<InternShip />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
