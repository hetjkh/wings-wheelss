import type { Metadata } from "next";
import GroupsPage from "../components/groups-page";

export const metadata: Metadata = {
  title: "Groups & MICE | Wings & Wheels",
  description: "Group flights, hotels, transfers and on-ground movements for meetings, incentives, conferences and exhibitions across the UAE, Africa and worldwide.",
};

export default function GroupsMice() {
  return <GroupsPage />;
}
