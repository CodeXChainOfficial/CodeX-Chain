import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./pages/error";
import Home from "./pages/home";
import Launchpad from "./pages/launchpad";
import ICP20Standard from "./pages/TokenGen/pages/createToken/ICP20Standard";
import CreateTokenICP from "./pages/TokenGen/pages/erc20Standard/indexICP";
import { AppRoutes } from "./shared/constants";
import DIP721Standard from "./pages/TokenGen/pages/createNFT/DIP721Standard";
import DAOinfrastructure from "./pages/TokenGen/pages/createDAO/DAOinfrastructure";
import ERC20Standard from "./pages/TokenGen/pages/erc20Standard/ERC20Standard";
import ERC20Advance from "./pages/TokenGen/pages/erc20Standard/ERC20Advance";
import ERC20Drop from "./pages/TokenGen/pages/erc20Standard/ERC20Drop";
import ERC20Dropvote from "./pages/TokenGen/pages/erc20Standard/ERC20Dropvote";
import ERC20SignatureMint from "./pages/TokenGen/pages/erc20Standard/ERC20SignatureMint";
import ERC721Standard from "./pages/TokenGen/pages/erc20Standard/ERC721Standard";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />} />

        <Route path={AppRoutes.launchpad + "/*"} element={<Launchpad />} />
        <Route path={AppRoutes.icp + "/*"} element={<CreateTokenICP />} />
        <Route path={AppRoutes.ICP20Standard + "/*"} element={<ICP20Standard />} />
        <Route path={AppRoutes.DIP721Standard + "/*"} element={<DIP721Standard />} />
        <Route path={AppRoutes.DAOinfrastructure + "/*"} element={<DAOinfrastructure />} />
        <Route path={AppRoutes.ERC20Standard + "/*"} element={<ERC20Standard />} />
        <Route path={AppRoutes.ERC20Advance + "/*"} element={<ERC20Advance />} />
        <Route path={AppRoutes.ERC20Drop + "/*"} element={<ERC20Drop />} />
        <Route path={AppRoutes.ERC20Dropvote + "/*"} element={<ERC20Dropvote />} />
        <Route path={AppRoutes.ERC20SignatureMint + "/*"} element={<ERC20SignatureMint />} />
        <Route path={AppRoutes.ERC721Standard + "/*"} element={<ERC721Standard />} />

        



        {/* <Route path="launchpad/*" element={<Launchpad />}>
          <Route index element={<CreateLaunchpad />} />
          <Route path="result" element={<LaunchpadResult />} />
          <Route path="*" element={<CreateLaunchpad />} />
        </Route> */}
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
