// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Chatbot App',
  description: 'A simple chatbot app with Next.js 13 & Tailwind'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Cormorant Garamond' rel='stylesheet'/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
