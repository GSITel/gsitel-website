// Reemplaza el contenido de Código.gs en Google Apps Script por este archivo.
const CONTACTO_GSITEL = "soporte@gsitel-solutions.com";

function doPost(e) {
  try {
    const datos = (e && e.parameter) || {};
    const nombre = String(datos.name || "").trim();
    const correo = String(datos.email || "").trim();
    const empresa = String(datos.company || "").trim();
    const servicio = String(datos.service || "").trim();
    const mensaje = String(datos.message || "").trim();

    if (!nombre || !correo || !mensaje) {
      return respuesta({ ok: false, error: "Completa nombre, correo y mensaje." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return respuesta({ ok: false, error: "El correo no es válido." });
    }
    if (nombre.length > 150 || correo.length > 254 || empresa.length > 200 ||
        servicio.length > 150 || mensaje.length > 5000) {
      return respuesta({ ok: false, error: "Uno de los campos supera el límite permitido." });
    }

    const referencia = "GSI-" + Utilities.getUuid().slice(0, 8).toUpperCase();
    const detalleTexto = [
      "Referencia: " + referencia,
      "Nombre: " + nombre,
      "Correo: " + correo,
      "Empresa: " + (empresa || "No indicada"),
      "Servicio: " + (servicio || "No indicado"),
      "",
      "Mensaje:",
      mensaje
    ].join("\n");

    const detalleHtml = '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">' +
      fila("Referencia", referencia) +
      fila("Nombre", nombre) +
      fila("Correo", correo) +
      fila("Empresa", empresa || "No indicada") +
      fila("Servicio", servicio || "No indicado") +
      '</table><h2 style="margin:28px 0 12px;font-size:16px;color:#071b38;">Lo que necesita resolver</h2>' +
      '<div style="padding:20px;background:#f3f7fb;border:1px solid #e1eaf3;border-radius:12px;font-size:15px;line-height:1.7;color:#344c66;overflow-wrap:anywhere;">' +
      escaparHtml(mensaje).replace(/\r?\n/g, "<br>") + '</div>' +
      '<p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:#61758c;">Responde a este correo para conversar directamente con la persona que hizo la consulta.</p>';

    // Primero se entrega la consulta al equipo. Solo entonces se confirma la recepción.
    MailApp.sendEmail({
      to: CONTACTO_GSITEL,
      replyTo: correo,
      name: "GSITEL · Contacto web",
      subject: "Nueva solicitud web · " + referencia,
      body: "Nueva solicitud desde el sitio web de GSITEL\n\n" + detalleTexto,
      htmlBody: plantillaCorreo("Nueva solicitud", "Una nueva conversación empieza aquí.",
        "Recibimos una consulta desde el formulario del sitio web.", detalleHtml)
    });

    let receiptSent = false;
    try {
      // El acuse no reproduce el mensaje libre del formulario.
      const acuseHtml = '<p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#344c66;">Gracias por contactar con GSITEL. Tu solicitud se envió correctamente y nuestro equipo la revisará para responderte a este correo.</p>' +
        '<div style="margin:24px 0;padding:20px;background:#edf9fb;border:1px solid #ccecf1;border-radius:12px;">' +
        '<p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#326678;">Solicitud recibida</p>' +
        '<p style="margin:0;font-size:20px;font-weight:bold;color:#071b38;">' + referencia + '</p></div>' +
        '<h2 style="margin:24px 0 10px;font-size:17px;color:#071b38;">¿Qué sigue?</h2>' +
        '<p style="margin:0;font-size:15px;line-height:1.8;color:#344c66;">Revisaremos tu consulta y nos pondremos en contacto contigo para conocer el contexto y acordar el siguiente paso.</p>' +
        '<p style="margin:24px 0 0;font-size:14px;line-height:1.8;color:#61758c;">Si quieres añadir información, puedes responder directamente a este correo.</p>';
      MailApp.sendEmail({
        to: correo,
        replyTo: CONTACTO_GSITEL,
        name: "GSITEL",
        subject: "Recibimos tu solicitud · " + referencia,
        body: [
          "Gracias por contactar con GSITEL.",
          "",
          "Tu solicitud se envió correctamente y nuestro equipo la revisará.",
          "Referencia: " + referencia,
          "",
          "Nos pondremos en contacto contigo para conocer el contexto y acordar el siguiente paso.",
          "Si quieres añadir información, responde a este correo.",
          "",
          "Equipo GSITEL",
          CONTACTO_GSITEL
        ].join("\n"),
        htmlBody: plantillaCorreo("Solicitud recibida", "Gracias por dar el primer paso.",
          "Tu consulta ya está en manos de nuestro equipo.", acuseHtml)
      });
      receiptSent = true;
    } catch (errorAcuse) {
      // No se solicita repetir una consulta ya recibida si falla solo el acuse.
      console.error("No se pudo enviar el acuse de " + referencia + ": " + errorAcuse.message);
    }

    return respuesta({ ok: true, receiptSent: receiptSent, reference: referencia });
  } catch (error) {
    console.error("Error de contacto: " + error.message);
    return respuesta({ ok: false, error: "No se pudo enviar la consulta. Inténtalo de nuevo." });
  }
}

function escaparHtml(valor) {
  return String(valor).replace(/[&<>"']/g, function (caracter) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[caracter];
  });
}

function fila(etiqueta, valor) {
  return '<tr><td style="width:105px;vertical-align:top;padding:12px 8px 12px 0;border-bottom:1px solid #e6edf4;font-size:13px;color:#61758c;">' +
    escaparHtml(etiqueta) + '</td><td style="padding:12px 0;border-bottom:1px solid #e6edf4;font-size:14px;line-height:1.6;color:#071b38;overflow-wrap:anywhere;">' +
    escaparHtml(valor) + '</td></tr>';
}

function plantillaCorreo(etiqueta, titulo, introduccion, contenido) {
  return '<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background:#edf2f7;font-family:Arial,Helvetica,sans-serif;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edf2f7;"><tr><td align="center" style="padding:24px 12px;">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dfe8f1;border-radius:20px;overflow:hidden;">' +
    '<tr><td style="padding:28px 24px;background:#071b38;border-bottom:3px solid #79e4f2;">' +
    '<p style="margin:0;color:#ffffff;font-size:24px;font-weight:bold;letter-spacing:2px;">GSITEL<span style="color:#79e4f2;">.</span></p>' +
    '<p style="margin:12px 0 0;color:#b8d2e6;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">' +
    escaparHtml(etiqueta) + '</p></td></tr>' +
    '<tr><td style="padding:32px 24px;"><h1 style="margin:0 0 12px;font-size:26px;line-height:1.3;letter-spacing:-0.5px;color:#071b38;">' +
    escaparHtml(titulo) + '</h1><p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#61758c;">' +
    escaparHtml(introduccion) + '</p>' + contenido + '</td></tr>' +
    '<tr><td style="padding:22px 24px;background:#f7f9fc;border-top:1px solid #e6edf4;">' +
    '<p style="margin:0 0 8px;color:#071b38;font-size:13px;font-weight:bold;">Un equipo que se involucra.</p>' +
    '<a href="mailto:' + CONTACTO_GSITEL + '" style="color:#1b5aa6;font-size:12px;text-decoration:none;">' + CONTACTO_GSITEL + '</a>' +
    '</td></tr></table></td></tr></table></body></html>';
}

function respuesta(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos))
    .setMimeType(ContentService.MimeType.JSON);
}
