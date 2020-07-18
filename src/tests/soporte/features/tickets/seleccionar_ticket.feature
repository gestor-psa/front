# language: es
Característica: Seleccionar ticket
  Como ingeniero de soporte
  Deseo seleccionar un ticket
  Para ver información más detallada de este

  Escenario: Seleccionar ticket
    Dado que existe un ticket con los siguientes atributos:
      | id    | nombre             | descripcion                  | responsable | tipo     | severidad | estado   | fechaDeCreacion  | fechaDeActualizacion |
      | 68785 | Duda sobre pedidos | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | iniciado | 01/07/2020 22:46 | 02/07/2020 04:11     |
    Cuando selecciono un ticket con nombre "Duda sobre pedidos"
    Entonces veo que posee los siguientes atributos:
      | codigo | nombre             | descripcion                  | responsable | tipo     | severidad | estado   | fechaDeCreacion  | fechaDeActualizacion |
      | 68785  | Duda sobre pedidos | ¿Cuál es el costo del envío? | Juan Perez  | consulta | baja      | iniciado | 01/07/2020 22:46 | 02/07/2020 04:11     |
