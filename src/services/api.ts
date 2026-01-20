import type { DeleteRequestResponse, ConfirmDeleteResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

interface RequestDeletionResponse {
  success: boolean;
  debug_link?: string; // Solo para pruebas
}

export async function requestAccountDeletion(email: string): Promise<RequestDeletionResponse> {
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

  return response.json();
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
