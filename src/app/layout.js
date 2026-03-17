import '../styles/globals.css'

export const metadata = {
  title: 'Korgonxx — Web3 Community Builder',
  description: 'Korgonxx — Web3 Community Builder, Moderator & Ambassador based in Haryana, India. Available worldwide.',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
