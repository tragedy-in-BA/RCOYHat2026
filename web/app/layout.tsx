import type { Metadata } from 'next'
import { Sora, DM_Mono } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'RCO – Rental Cashflow Obligation',
  description: 'Convertí tus alquileres futuros en liquidez hoy. Recibí hasta el 90% del valor de tu contrato de alquiler por adelantado.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
