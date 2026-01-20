import { Link, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Revisa tu correo electrónico
        </h2>

        <p className="text-gray-600 mb-4">
          Hemos enviado un enlace de verificación a:
        </p>

        {email && (
          <p className="font-medium text-gray-900 mb-4">{email}</p>
        )}

        <p className="text-gray-600 mb-6">
          Haz clic en el enlace del correo para continuar con el proceso de eliminación de tu cuenta.
        </p>

        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <p className="text-sm text-gray-500">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>

        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
}
