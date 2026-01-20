import type { DeleteRequestResponse, ConfirmDeleteResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn('VITE_API_URL no está configurada. Las llamadas a la API fallarán.');
}

export async function requestAccountDeletion(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/user/delete-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail: email }),
  });

  if (!response.ok) {
    throw new Error('Error al enviar la solicitud. Por favor, intenta de nuevo.');
  }
}

export async function getDeleteRequestDetails(userId: string): Promise<DeleteRequestResponse> {
  const response = await fetch(`${API_URL}/user/delete-request?user_id=${userId}`);

  if (!response.ok) {
    throw new Error('No se pudo obtener la información de la solicitud.');
  }

  return response.json();
}

export async function confirmAccountDeletion(userId: string): Promise<ConfirmDeleteResponse> {
  const response = await fetch(`${API_URL}/user/delete-request?user_id=${userId}&action=true`);

  if (!response.ok) {
    throw new Error('Error al confirmar la eliminación. Por favor, intenta de nuevo.');
  }

  return response.json();
}
