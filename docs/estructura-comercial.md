# Estructura comercial de GSITEL

## Objetivo

Ayudar al visitante a reconocer si GSITEL encaja con su necesidad y facilitar una conversación sobre un proyecto. La página debe mostrar criterio y trabajo concreto, sin urgencia artificial ni promesas de resultados no comprobados.

## Recorrido implementado en software

1. **Propuesta:** qué hacemos y para quién, con el proceso animado como apoyo. Un CTA principal: «Hablemos de tu proyecto».
2. **Confianza inicial:** empresas atendidas, sin convertir sus logos en afirmaciones de resultados.
3. **Servicios:** desarrollo de software y consultoría/reingeniería. Un resumen por servicio; el alcance completo se consulta en el modal existente.
4. **Proyectos:** productos desarrollados, capturas y alcance. Evidencia antes de profundizar en la metodología.
5. **Cómo trabajamos:** diagnóstico, diseño y ejecución, operación continua. Una explicación breve por etapa.
6. **Capacidades técnicas opcionales:** stack disponible bajo un desplegable, para quien necesite evaluarlo.
7. **Experiencias y contacto:** testimonios existentes y una invitación concreta a conversar.

Se retiraron del recorrido de software el selector que enlazaba a proveedores externos y el bloque de partner que repetía el caso CUADRAI. Los componentes se conservan en el repositorio; el selector de telecom sigue disponible.

## Encabezados y navegación

- Un H1 por página con la propuesta principal.
- H2 de sección: misma escala, peso semibold, interlineado y separación. Una sola idea por título.
- H3 de contenido: menor tamaño que H2, sin competir con el hero.
- Etiquetas de sección breves y descriptivas; frases en caja normal en el contenido.
- Menú principal: Servicios, Proyectos, Cómo trabajamos, Nosotros, Contacto.
- Sin banda adicional debajo del menú ni CTA repetidos en cada bloque.

## Criterio editorial

Mantener el detalle técnico bajo demanda. Dar prioridad a problema, solución y alcance. No añadir métricas, certificaciones, clientes ni testimonios nuevos sin evidencia. Revisar la atribución y autorización de los testimonios existentes antes de utilizarlos en campañas. No se han validado esas autorizaciones en este trabajo.

## Próximas mejoras a evaluar

La estructura actual no requiere nuevas tecnologías. Next.js, React y los componentes existentes cubren esta propuesta.

Antes de añadir herramientas, medir el recorrido: visitas a proyectos, apertura de servicios, clics de contacto, consultas recibidas y cuántas encajan con los servicios. Los clics no equivalen a clientes ni a solicitudes enviadas.

Si el formulario externo genera abandono, evaluar un formulario breve dentro del sitio: nombre, correo y necesidad. Requerirá decidir dónde recibir y conservar los datos, protección contra spam y confirmación de entrega. No se implementa ni se contrata un servicio sin evaluar esas decisiones.

Si el volumen de consultas lo justifica, evaluar seguimiento en un CRM y atribución de campañas. Elegir proveedor después de definir volumen, presupuesto y herramientas que el equipo ya utiliza.

La mejora de conversión es una hipótesis que debe contrastarse con consultas y proyectos obtenidos; no se garantiza un aumento de clientes por el cambio de diseño.
