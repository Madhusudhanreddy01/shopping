import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./routes/index";
// Lazy-loaded components
const Menu = React.lazy(() => import("./component/Main/Menu/Menu"));
const History = React.lazy(() => import("./component/history/History"));
const Statistics = React.lazy(() => import("./component/Statistics/Statistics"));
const NoPage = React.lazy(() => import("./component/NoPage/NoPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="/history" element={<History />} />
            <Route path="/chart" element={<Statistics />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
