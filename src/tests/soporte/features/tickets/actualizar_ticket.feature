# language: es
Característica: Actualizar Ticket
  Como ingeniero de soporte
  Deseo modificar un ticket
  Para actualizar su estado


  Esquema del escenario: Actualizar ticket
    Dado que existe un ticket con los siguientes atributos:
      | id    | nombre             | descripcion                  | responsable | tipo     | severidad | estado    | fechaDeCreacion     | fechaDeActualizacion |
      | 15784 | Duda sobre pedidos | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente | 2020/06/20 13:53:45 | 2020/06/20 13:58:24  |
    Y selecciono un ticket con nombre "Duda sobre pedidos"
    Cuando modifico el ticket "<caso>":
      | nombre   | descripcion   | responsable   | tipo   | severidad   | estado   |
      | <nombre> | <descripcion> | <responsable> | <tipo> | <severidad> | <estado> |
    Entonces veo que el resultado fue "<resultado>"

    Ejemplos:
      | caso       | resultado              | nombre | descripcion                  | responsable | tipo     | severidad | estado    |
      | sin nombre | El nombre es requerido |        | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente |
      | sin descripción  | La descripción es requerida | Duda sobre pedidos |                              | Juan Perez  | consulta | baja      | pendiente |
      | sin modificación | éxito                       | Duda sobre pedidos | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente |

  Esquema del escenario: Actualización exitosa
    Dado que existe un ticket con los siguientes atributos:
      | id    | nombre             | descripcion                  | responsable | tipo     | severidad | estado    | fechaDeCreacion  | fechaDeActualizacion |
      | 15784 | Duda sobre pedidos | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente | 20/06/2020 13:53 | 20/06/2020 13:58     |
    Y selecciono un ticket con nombre "Duda sobre pedidos"
    Cuando modifico el ticket "<caso>":
      | nombre   | descripcion   | responsable   | tipo   | severidad   | estado   |
      | <nombre> | <descripcion> | <responsable> | <tipo> | <severidad> | <estado> |
    Entonces veo que el resultado fue "éxito"
    Y veo que posee los siguientes atributos:
      | nombre   | descripcion   | responsable   | tipo   | severidad   | estado   | fechaDeCreacion  | fechaDeActualizacion |
      | <nombre> | <descripcion> | <responsable> | <tipo> | <severidad> | <estado> | 20/06/2020 13:53 | ahora                |

    Ejemplos:
      | caso                | nombre                  | descripcion                  | responsable | tipo     | severidad | estado    |
      | cambiando el nombre | Error al calcular envío | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente |
      | cambiando el descripción | Duda sobre pedidos      | No puedo ingresar el código postal para calcular el envío | Juan Perez  | consulta   | baja      | pendiente |
      | cambiando el responsable | Duda sobre pedidos      | ¿Cuál es el costo del envío?                              | Tomás Ayala | consulta   | baja      | pendiente |
      | cambiando el tipo        | Duda sobre pedidos      | ¿Cuál es el costo del envío?                              | Juan Perez  | incidencia | baja      | pendiente |
      | cambiando el severidad   | Duda sobre pedidos      | ¿Cuál es el costo del envío?                              | Juan Perez  | consulta   | alta      | pendiente |
      | cambiando el estado      | Duda sobre pedidos      | ¿Cuál es el costo del envío?                              | Juan Perez  | consulta   | baja      | iniciado  |
      | quitando reponsable      | Duda sobre pedidos      | ¿Cuál es el costo del envío?                              |             | consulta   | baja      | pendiente |
