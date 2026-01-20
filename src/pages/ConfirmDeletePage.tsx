import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getDeleteRequestDetails, confirmAccountDeletion } from '../services/api';

export function ConfirmDeletePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('user_id');

  const [description, setDescription] = useState('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('No se encontró el identificador de usuario.');
      setIsLoadingDetails(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const data = await getDeleteRequestDetails(userId);
        setDescription(data.description);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la información.');
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [userId]);

  const handleConfirm = async () => {
    if (!userId) return;

    setIsConfirming(true);
    setError('');

    try {
      const response = await confirmAccountDeletion(userId);
      navigate('/success', { state: { message: response.message } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al confirmar la eliminación.');
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoadingDetails) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <LoadingSpinner />
          <p className="text-center text-gray-600 mt-4">Cargando información...</p>
        </div>
      </Layout>
    );
  }

  if (error && !description) {
    return (
      <Layout>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <img
          src="/Pistis-users-data-management/thinking.png"
          alt="Pensando"
          className="w-40 h-40 mx-auto mb-4 object-contain"
        />

        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Confirmar eliminación de cuenta
        </h2>

        <div className="bg-gray-50 rounded-md p-4 my-6">
          <h3 className="font-medium text-gray-900 mb-2">
            Información sobre tus datos:
          </h3>
          <div className="text-gray-600 text-sm whitespace-pre-wrap">
            {description}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {isConfirming ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Confirmar eliminación
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
