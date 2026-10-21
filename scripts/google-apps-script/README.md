# Actualizar los correos del formulario

1. Abre tu proyecto de Google Apps Script.
2. Reemplaza todo el contenido de Código.gs por el de Code.gs en esta carpeta.
3. Guarda los cambios.
4. Ve a **Implementar → Gestionar implementaciones**.
5. Selecciona la implementación que ya usa el sitio y pulsa **Editar** (lápiz).
6. En **Versión**, selecciona **Nueva versión** y pulsa **Implementar**.
7. Mantén **Ejecutar como: Yo** y el acceso para **Cualquier persona**.

Actualizar la implementación existente conserva la URL que ya usa el sitio.
Guardar el archivo por sí solo no actualiza la aplicación publicada.

## Resultado

- El equipo recibe un correo HTML con los datos de la consulta y una referencia.
- El visitante recibe un acuse HTML en el correo que indicó en el formulario.
- Ambos correos incluyen una versión de texto plano.
- El equipo puede responder directamente al visitante; el visitante puede responder a soporte.
- La respuesta JSON confirma primero la entrega al equipo (ok) e indica por separado
  si se envió el acuse (receiptSent). Esto evita pedir repetir una consulta ya recibida
  cuando falla únicamente el segundo correo.

## Comprobación tras publicar

Envía una consulta desde el sitio usando un correo que controles. Revisa el mensaje
en soporte y el acuse en el correo introducido. La pantalla de éxito debe mostrar
“Enviamos un correo de confirmación” solo cuando el servicio devuelve receiptSent: true.

Documentación:
- https://developers.google.com/apps-script/reference/mail/mail-app
- https://developers.google.com/apps-script/concepts/deployments
