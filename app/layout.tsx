// app/layout.tsx
import "./globals.css";
import { TodoProvider } from "./context/todoContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
