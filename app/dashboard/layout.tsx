import LoadingPage from "@/components/custom/loading-page";
import { SITE_INFO } from "@/constants/config";
import DashboardLayout from "@/features/dashboard/dashboard-layout";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const GlobalDeleteDialog = dynamic(
  () => import("@/features/dashboard/global-delete-dialog"),
  {
    loading: () => <LoadingPage />,
  }
);


type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: `%s | Dashboard`,
    default: SITE_INFO.NAME,
  },
  description: "Dashboard page",
};

/**
 * Wraps dashboard pages with the DashboardLayout and includes the global delete dialog.
 *
 * @param children - The page content to render inside the dashboard layout
 * @returns A JSX element containing the dashboard layout and the global delete dialog
 */
export default async function layout({ children }: Props) {
  return (
    <div className="relative">
      <DashboardLayout>
        {children}
      </DashboardLayout>
      <Suspense fallback={null}>
        <GlobalDeleteDialog />
      </Suspense>
    </div>
  );
}