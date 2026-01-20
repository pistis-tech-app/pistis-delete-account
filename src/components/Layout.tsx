import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[rgb(249,249,255)] py-4">
        <div className="max-w-md mx-auto px-4 flex items-center justify-center">
          <img
            src="/Pistis-users-data-management/logo.png"
            alt="Pistis"
            className="h-10"
          />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Pistis Group S.A.S. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
