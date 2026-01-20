import { Link, useLocation, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export function SuccessPage() {
  const location = useLocation();
  const message = location.state?.message;

  if (!message) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <img
          src="/Pistis-users-data-management/success.png"
          alt="Éxito"
          className="w-40 h-40 mx-auto mb-4 object-contain"
        />

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Solicitud procesada
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <p className="text-sm text-gray-500">
            Si tienes alguna pregunta sobre el proceso de eliminación, no dudes en contactar a nuestro equipo de soporte.
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
