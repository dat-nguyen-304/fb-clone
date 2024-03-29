import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header/Header';
import ChatBox from '@/components/Chat/ChatBox';

const inter = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Facebook',
    description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <ChatBox />
                <ToastContainer position="bottom-right" />
            </body>
        </html>
    );
}
