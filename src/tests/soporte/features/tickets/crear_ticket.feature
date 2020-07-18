# language: es
Característica: Crear ticket
  Como ingeniero de soporte
  Deseo crea un ticket
  Para llevar un registro del mantenimiento de la versión de un producto

  Esquema del escenario: Crear ticket
    Dado que soy ingeniero de soporte
    Y que selecciono la versión 2 del producto "PSA ERP"
    Cuando creo un ticket "<caso>" ingresando:
      | nombre   | descripcion   | responsable   | tipo   | severidad   |
      | <nombre> | <descripcion> | <responsable> | <tipo> | <severidad> |
    Entonces veo que el resultado fue "<resultado>"

    Ejemplos:
      | caso            | resultado                   | nombre                | descripcion                     | responsable | tipo       | severidad |
      | sin nombre      | El nombre es requerido      |                       | ¿Cuál es el costo del envío?    |             | consulta   | baja      |
      | sin descripción | La descripción es requerida | Enviar pedido         |                                 |             | consulta   | baja      |
      | correctamente   | éxito                       | Enviar pedido         | ¿Cuál es el costo del envío?    |             | consulta   | baja      |
      | con responsable | éxito                       | Confirmar compra      | Mostrar un popup antes de pagar | Juan Perez  | mejora     | media     |
      | sin responsable | éxito                       | Autenticación fallida | No muestra el botón de login    |             | incidencia | alta      |

  Escenario: Creación exitosa
    Dado que soy ingeniero de soporte
    Y que selecciono la versión 2 del producto "PSA ERP"
    Cuando creo un ticket "correctamente" ingresando:
      | nombre        | descripcion                  | responsable | tipo     | severidad |
      | Enviar pedido | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      |
    Entonces veo que el resultado fue "éxito"
    Y veo que posee los siguientes atributos:
      | nombre        | descripcion                  | responsable | tipo     | severidad | estado    | fechaDeCreacion | fechaDeActualizacion |
      | Enviar pedido | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | pendiente | ahora           |                      |
    Y veo que no posee comentarios
