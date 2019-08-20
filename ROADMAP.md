Contratobook.org propuesta de actividades de fortalecimiento para CIDE
Resumen
Contratobook es una plataforma que facilita la búsqueda de contratos del gobierno Federal contenidos en el sistema compranet. Es un proyecto desarrollado independientemente por Spaceshiplabs que se lanzó en octubre de 2016. Desde entonces ha sido citado en decenas de investigaciones periodísticas incluyendo algunas de alto impacto como “La estafa Maestra”. 


Este documento describe una ruta tecnológica para fortalecer Contratobook y hacerlo más Útil para sus usuarios. En él se describen los proyectos que consideramos podrían ayudarnos a cumplir mejor nuestros objetivos. Los proyectos están ordenados según la prioridad que creemos tiene cada uno.
Objetivos
Mejorar la comprensión de las contrataciones públicas en México
Facilitar la búsqueda de contratos, contratistas y dependencias que participan en compranet
Generar información oportuna, objetiva y facilitar su propagación
Proyectos
Estandarización de Unidades Compradoras
Antecedentes
Contratobook utiliza dos conjuntos de datos que publica SFP: COMPRANET 3.0 (2002-2011) y Compranet(2011-). Una de las diferencias de entre ambos conjuntos es la jerarquía de unidades compradoras. Por ejemplo los municipios antes estaban catalogados como dependencias, a partir de compranet 2011 estos están catalogados como unidades compradoras. 
Propuesta
Mejorar la agrupación e identificación de las unidades compradoras y dependencias de las siguientes maneras:
Estandarizar jerarquía de dependencias municipales y estatales.
Categorizar dependencias y unidades compradoras municipales y estatales para facilitar su búsqueda.
Consolidar dependencias y unidades compradoras repetidas, hacer un cruce entre ambos datasets.
Permitir buscar por estado/municipio.
Resultados esperados
El efecto de estas mejoras es facilitar la búsqueda de contratos de municipios o entidades. También eliminará la necesidad de conocer más acerca de las diferentes jerarquías de compranet para hacer búsquedas en Contratobook. 
Costo Aproximado
$38,000.00
Optimización de mecanismo de actualización
Antecedentes
Uno de los mayores retos de este proyecto es importar y actualizar la información. Actualmente el proceso es tardado (varias horas) ya que reprocesa toda la base de datos cada vez. Adicionalmente en cada actualización se pierden los identificadores únicos utilizados por Contratobook para generar las URLs de cada contrato, lo cual en la práctica causa que las ligas (URL’s) de recursos individuales (contratos, dependencias, empresas) cambien cada que se actualiza la base de datos. 
Propuesta
Generar identificadores únicos para contratos y entidades re-utilizables.
Crear mecanismo de actualización basado en diff que solo procese nuevos contratos y modificaciones a contratos existentes. 
Automatizar actualizaciones lo más cercano a tiempo real posible. 
Resultados Esperados
Contar con la información de contrataciones oportunamente permitiría acción e investigaciones en momentos más críticos y posiblemente con mayor impacto sobre las contrataciones. Tambien servira como una base sobre la cual desarrollar servicios de auditorías automatizadas.  
Costo Aproximado
$42,000.00

Búsqueda de texto completo
Antecedentes
Una limitación actual de Contratobook es que no se puede buscar por contenido del texto del título del contrato o expediente. La razón de esto es que las búsquedas de texto completo son muy caras computacionalmente en una base de datos tan extensa y hacerlas con nuestra infraestructura y tecnología actual saturaría nuestro API y seria muy tardado. 
Propuesta
Integrar un servicio de búsqueda especializada como Elasticsearch o SOLR. 
Agregar opcion de busqueda de texto en la interfaz y API. 
Resultados Esperados
Esta mejora incrementara el tipo de búsquedas que se pueden hacer en la plataforma. Algunos ejemplos de aplicaciones de este tipo de búsquedas son:
La búsqueda por palabras clave puede facilitar la investigación de contratos de cierto rubro o tipo
Facilita la búsqueda a usuarios que conocen de antemano el proyecto a investigar
Costo Aproximado
$27,000.00
Visualización por dependencia y unidad compradora
Antecedentes
Hemos observado que los investigadores frecuentemente están buscando información referente a las actuaciones de ciertos servidores públicos y dependencias específicas. Actualmente se pueden filtrar contratos por dependencias y años pero pensamos que podemos generar información y estadísticas de valor si creamos una nueva vista de dependencia/unidad compradora. 
Propuesta
Agregar una vista de dependencia/unidad compradora individual. Esta vista contendrá diversas gráficas y estadísticas:
Contratistas y montos obtenidos por periodo
Gráfica de área de tipo de procedimiento y montos por año. Ej:




Resultados Esperados
Esperamos que con la información adicional investigadores puedan responder mejor preguntas como: 
¿Cuales son los contratistas favorecidos por una administración o funcionario específico?
¿Un funcionario que pasó de una dependencia a otra, también favoreció a los mismos contratistas?
¿Cómo se comportan los tipos de contrataciones en diferentes administraciones? ¿Hay más adjudicaciones cuando entran ciertos funcionarios? 
Costo Aproximado
$34,000.00
Integrar información de SHCP
Antecedentes
En 2017 Contratobook ganó el reto “Tu ciudad tus datos” organizado por Transparencia Mexicana y la CDMX y desarrollo una herramienta que permite buscar en diferentes bases de datos de contribuyentes que han perdido el secreto fiscal. La intersección de esta información con contratistas de gobierno es de alto interés público. 
Propuesta
Mostrar información de SCHP en el perfil de cada empresa y los detalles del registro (fecha, motivo, etc).
Mostrar la información en caso de existir en el listado de contratos.
Notificar a usuarios vía un bot en caso de encontrar contratos nuevos con empresas que han perdido el secreto fiscal. 

Resultados Esperados
Esperamos que tener mayor visibilidad sobre contratistas que ya han sido identificadas por SHCP lleve a mayor escrutinio de contratos potencialmente problemáticos. 
Costo Aproximado
$31,000.00
Integrar datos de investigaciones periodísticas a resumen de empresas
Antecedentes
En el 2017 Contratobook terminó como finalista en un reto global de Open Contracting en donde desarrollamos una herramienta permite entrenar a un clasificador para reconocer artículos que pueden ser de interés periodístico al buscar una empresa. La idea de esto vino del equipo de Animal Político ya que es una de sus pasos estándares al iniciar investigaciones sobre empresas fantasma. 
Propuesta
El sistema que presentamos para el reto es un prototipo sin embargo es lo robusto suficiente para catalogar los resultados con una confiabilidad de alrededor del 86%. Para poder integrarlo a Contratobook necesitaríamos:

Eficientar el mecanismo para obtener los resultados de búsqueda
Clasificar el total de las empresas de compranet y hacer revisiones y re-clasificaciones de las empresas con más información. 
Mostrar esta información en la vista de empresa individual como vínculos a los artículos periodísticos.
Resultados Esperados
Creemos que tener la información periodística acerca de una empresa disponible rápidamente puede ayudar a los usuarios a identificar contratos potencialmente problemáticos. Por ejemplo cuando una empresa ya ha sido mencionada anteriormente en un escandalo de corrupcion. 


Costo Aproximado
$40,000.00
Crear Buscador Único
Antecedentes
Muchos usuarios no entienden las jerarquías gubernamentales y frecuentemente no saben si están buscando una dependencia o unidad compradora tampoco saben cómo encontrar municipios o entidades. Esto causa dificultad al encontrar contratos para ciertos usuarios. 
Propuesta
Proponemos cambiar la interfaz de Contratobook para que se pueda buscar por cualquier categoría en un mismo buscador. Como en el mockup siguiente, la búsqueda actual seguiría siendo accesible como “Búsqueda Avanzada”. También el listado de resultados incluiría no solo contratos si no tambien, dependencias, entidades, municipios unidades compradoras y proveedores. 



Resultados Esperados
Esperamos que este campo facilita la usabilidad del sitio para usuarios no-expertos y eso incremente el uso de la herramienta y mejore la calidad de los resultados que ve el usuario. 
Costo Aproximado
$72,000.00
Mejorar Busqueda Avanzada
Antecedentes
Algunas investigaciones se benefician de poder filtrar los resultados por categorías adicionales. Hemos recibido peticiones para algunas mejorar nuestra búsqueda. 
Propuesta
Agregar filtros de tipo de procedimiento (licitación, adjudicación directa, etc) 
Poder filtrar por monto
Poder cambiar el orden de los resultados de contratos por fecha (ahorita solo es descendiente por monto) 
Resultados Esperados
Agregar estas funcionalidades será simple y permitirá más control sobre los resultados que ve el usuario lo cual debe llevar a mejorar la calidad de la información que encuentran en contratobook. 
Costo Aproximado
$15,000.00

Proyectos Adicionales
Los siguientes son ideas que consideramos valiosas pero que necesitan de mayor análisis, pruebas y retroalimentación para delimitar una propuesta específica. 
Sistema de clasificación de riesgo de contratos
Hace unos meses el IMCO liberó un reporte acerca de su análisis de compranet y las Unidades Compradoras de mayor riesgo en compranet. Este reporte asignó un porcentaje de riesgo en cada unidad compradora. Nuestro plan es utilizar esa información así como la información de SCHP y periodística para crear un porcentaje de riesgo. 
Bot Generador de Infografías
Pensamos que con la información y cruces que tenemos podemos crear un bot que pueda generar infografías de interés para publicarse en redes sociales.





