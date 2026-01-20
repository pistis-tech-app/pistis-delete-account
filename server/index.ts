/**
 * Servidor de prueba para la aplicación de eliminación de cuentas de Pistis
 *
 * Este servidor simula el backend para probar el flujo completo.
 *
 * ENDPOINTS:
 *
 * 1. POST /user/delete-request
 *    Body: { "mail": "usuario@email.com" }
 *    Response: { "success": true }
 *    Acción: Inicia el proceso de eliminación y "envía" un correo con el link
 *
 * 2. GET /user/delete-request?user_id=xxx
 *    Response: { "description": "..." }
 *    Acción: Retorna la descripción de los datos que serán eliminados
 *
 * 3. GET /user/delete-request?user_id=xxx&action=true
 *    Response: { "message": "El proceso de eliminación para el usuario xxx ha sido iniciado" }
 *    Acción: Confirma la eliminación de la cuenta
 */

const PORT = 3001;

// Base de datos en memoria para simular usuarios
const pendingDeletions = new Map<string, { email: string; createdAt: Date }>();

// Descripción de datos que se mostrarán al usuario
const DELETION_DESCRIPTION = `Datos que serán eliminados:
• Tu perfil de usuario y foto
• Historial de actividad
• Preferencias y configuraciones
• Datos de sesión

Datos que se conservarán por motivos legales (90 días):
• Registros de transacciones
• Logs de auditoría

Datos que se conservarán de forma anónima:
• Estadísticas de uso agregadas

Este proceso es irreversible. Una vez confirmado, no podrás recuperar tu cuenta ni los datos eliminados.`;

// Genera un ID único para el usuario
function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Headers CORS para permitir peticiones desde el frontend
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // POST /user/delete-request - Solicitar eliminación de cuenta
    if (path === "/user/delete-request" && req.method === "POST") {
      try {
        const body = await req.json();
        const { mail } = body;

        if (!mail || typeof mail !== "string") {
          return new Response(
            JSON.stringify({ error: "El campo 'mail' es requerido" }),
            { status: 400, headers: corsHeaders }
          );
        }

        // Generar user_id y guardar en "base de datos"
        const userId = generateUserId();
        pendingDeletions.set(userId, { email: mail, createdAt: new Date() });

        // Simular envío de correo (mostrar en consola)
        const deleteLink = `http://localhost:5173/Pistis-users-data-management/user/delete-request?user_id=${userId}`;

        console.log("\n" + "=".repeat(60));
        console.log("📧 SIMULACIÓN DE CORREO ENVIADO");
        console.log("=".repeat(60));
        console.log(`Para: ${mail}`);
        console.log(`Asunto: Confirma la eliminación de tu cuenta de Pistis`);
        console.log(`\nContenido:`);
        console.log(`Hola,\n`);
        console.log(`Recibimos una solicitud para eliminar tu cuenta de Pistis.`);
        console.log(`Si fuiste tú, haz clic en el siguiente enlace para continuar:\n`);
        console.log(`🔗 ${deleteLink}`);
        console.log(`\nSi no solicitaste esto, ignora este correo.`);
        console.log("=".repeat(60) + "\n");

        return new Response(
          JSON.stringify({
            success: true,
            // Solo para pruebas - en producción esto NO se enviaría
            debug_link: deleteLink
          }),
          { status: 200, headers: corsHeaders }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: `Error al procesar la solicitud: ${error}` }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // GET /user/delete-request?user_id=xxx[&action=true]
    if (path === "/user/delete-request" && req.method === "GET") {
      const userId = url.searchParams.get("user_id");
      const action = url.searchParams.get("action");

      if (!userId) {
        return new Response(
          JSON.stringify({ error: "El parámetro 'user_id' es requerido" }),
          { status: 400, headers: corsHeaders }
        );
      }

      const userRequest = pendingDeletions.get(userId);

      if (!userRequest) {
        return new Response(
          JSON.stringify({ error: "Solicitud no encontrada o expirada" }),
          { status: 404, headers: corsHeaders }
        );
      }

      // Si action=true, confirmar eliminación
      if (action === "true") {
        const email = userRequest.email;

        // Eliminar de la "base de datos"
        pendingDeletions.delete(userId);

        console.log("\n" + "=".repeat(60));
        console.log("✅ ELIMINACIÓN CONFIRMADA");
        console.log("=".repeat(60));
        console.log(`Usuario: ${email}`);
        console.log(`User ID: ${userId}`);
        console.log(`Fecha: ${new Date().toISOString()}`);
        console.log("=".repeat(60) + "\n");

        return new Response(
          JSON.stringify({
            message: `El proceso de eliminación para el usuario ${email} ha sido iniciado. Recibirás un correo de confirmación cuando se complete.`
          }),
          { status: 200, headers: corsHeaders }
        );
      }

      // Sin action, retornar descripción
      return new Response(
        JSON.stringify({ description: DELETION_DESCRIPTION }),
        { status: 200, headers: corsHeaders }
      );
    }

    // 404 para rutas no encontradas
    return new Response(
      JSON.stringify({ error: "Ruta no encontrada" }),
      { status: 404, headers: corsHeaders }
    );
  },
});

console.log(`
╔════════════════════════════════════════════════════════════╗
║        Servidor de prueba de Pistis iniciado               ║
╠════════════════════════════════════════════════════════════╣
║  URL: http://localhost:${PORT}                               ║
╠════════════════════════════════════════════════════════════╣
║  ENDPOINTS DISPONIBLES:                                    ║
║                                                            ║
║  POST /user/delete-request                                 ║
║       Body: { "mail": "usuario@email.com" }                ║
║       → Inicia solicitud y muestra link en consola         ║
║                                                            ║
║  GET  /user/delete-request?user_id=xxx                     ║
║       → Retorna descripción de datos a eliminar            ║
║                                                            ║
║  GET  /user/delete-request?user_id=xxx&action=true         ║
║       → Confirma eliminación de cuenta                     ║
╚════════════════════════════════════════════════════════════╝
`);
