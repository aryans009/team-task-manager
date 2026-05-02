import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/authprovider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Team Task Manager App",
  description: "Role-based project management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main> 
        </AuthProvider>
      </body>
    </html>
  );
}