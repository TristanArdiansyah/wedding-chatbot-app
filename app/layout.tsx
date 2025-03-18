// app/layout.tsx
import './globals.css';

export const metadata = {
  title: "Yasmin & Ryan's Wedding AI Chatbot",
  description: "An AI chatbot to ask anything related to Yasmin and Ryan's wedding. Brought to you by Bioma AI. "
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
