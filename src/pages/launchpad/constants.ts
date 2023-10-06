import { AppRoutes } from "@/shared/constants";

export const LaunchpadRoutes = {
  root: "/",
  rootPath: `/${AppRoutes.launchpad}`,

  result: "/result",
  resultPath: `/${AppRoutes.launchpad}/result`,
} as const;
