import { AppRoutes } from "@/shared/constants";
import { z } from "zod";

export const LaunchpadRoutes = {
  root: "/",
  rootPath: `/${AppRoutes.launchpad}`,

  result: "/result",
  resultPath: `/${AppRoutes.launchpad}/result`,
} as const;

export const LaunchPadFormSchema = z.object({
  // name: z.string().min(3, "Name must contain at least 3 characters"),
  name: z.string().optional(),
  logo: z.string().optional(), // will be set to the path of the file.
  description: z.string().optional(),
  wallet: z.string().optional(),
  wallets: z.array(z.string()),
  // launchPadType: z.string().optional(),
  launchPadType: z.union([z.literal("centralized"), z.literal("decentralized"), z.literal("")]),
  incubationNeeded: z.boolean().optional(),
  milestoneNeeded: z.boolean().optional(),
  blockchain: z
    .object({
      name: z.string(),
      net: z.union([z.literal("mainnet"), z.literal("testnet"), z.literal("")]),
    })
    .optional(),
  generateDashboard: z.boolean().optional(),
  currency: z.string().optional(),
});

export type LaunchPadFormData = z.infer<typeof LaunchPadFormSchema>;
