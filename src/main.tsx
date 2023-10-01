import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./pages/error";
import Home from "./pages/home";
import Launchpad from "./pages/launchpad";
import CreateLaunchpad from "./pages/launchpad/pages/create";
import LaunchpadResult from "./pages/launchpad/pages/result";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route path="launchpad/*" element={<Launchpad />}>
          <Route index element={<CreateLaunchpad />} />
          <Route path="result" element={<LaunchpadResult />} />
          <Route path="*" element={<CreateLaunchpad />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Array version ---> for reference and comparison ---> See element version below.

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         errorElement: <Error />,
//         children: [
//           { index: true, element: <Home /> },
//           {
//             path: "launchpad",
//             element: <Launchpad />,
//             children: [
//               { index: true, element: <LaunchpadForm /> },
//               { path: "result", element: <LaunchpadResult /> },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);

// Element version ---> for reference and comparison

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />} errorElement={<Error />}>
//       <Route errorElement={<Error />}>
//         <Route index element={<Home />} />

//         <Route path="launchpad" element={<Launchpad />}>
//           <Route index element={<LaunchpadForm />} />
//           <Route path="result" element={<LaunchpadResult />} />
//         </Route>
//       </Route>
//     </Route>
//   )
// );
