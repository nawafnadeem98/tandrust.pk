import React from "react";
import PatientDashboard from "@/components/dashboard/PatientDashboard";

export const metadata = {
  title: "My tandrust.pk — Patient Dashboard | tandrust.pk",
  description: "Manage your doctor appointments, view lab reports, family dependants, and private settings.",
};

export default function MyAccountPage() {
  return <PatientDashboard />;
}
