import Header from '../components/layout/Header'
import { Roboto } from 'next/font/google'
import './globals.css'
import AppProvider from '../components/AppContext'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Hey Pizza - DEMO',
  description: 'Application de commande de pizza en ligne',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className='scroll-smooth'>
      <body suppressHydrationWarning={true} className={roboto.className}>
        {/* La largeur max de 6xl, on centre tout avec mx-auto et un padding de 4 */}
        <main className='max-w-6xl mx-auto p-4'>
          <AppProvider>
            <Toaster/>
            <Header/>
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
            &copy; 2024 Tous droits réservés - Site démonstration par Jith0r
            </footer>  

          </AppProvider>
        </main>
      </body>
    </html>
  )
}
