import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import "./globals.css";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="bg-surface text-on-surface min-h-screen flex">
        <div className="flex">
          <Sidebar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
