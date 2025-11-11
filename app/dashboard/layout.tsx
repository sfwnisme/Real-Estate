import { SITE_INFO } from "@/constants/config";
import DashboardLayout from "@/features/dashboard/dashboard-layout";
import GlobalDeleteDialog from "@/features/dashboard/global-delete-dialog";
import { getCurrentUser } from "@/lib/requests";
import { Metadata } from "next";
import React from "react";

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

export default async function layout({ children }: Props) {
  const currentuser = await getCurrentUser()
  console.log(currentuser)
  return (
    <div className="relative">
      <DashboardLayout>
        {children}
        {/* <DeletePropertyDialog /> */}
      </DashboardLayout>
      <GlobalDeleteDialog />
    </div>
  );
}
