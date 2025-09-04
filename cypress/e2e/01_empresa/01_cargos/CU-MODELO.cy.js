//Formato de cada Spec
//Cada describe dentro de un Spec responde a un Caso de Prueba ya documentado.
describe.only("CP-EMP-6011 - Configuración básica, valores válidos", () => {
  //Before each se puede usar para el login al sistema y cada test inicie siempre en un mismo punto
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  //Afeter each se puede usar para acomular los reportes de cada test
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Set-up de Data", () => {
    //Primer paso donde se preparan los datos necesarios para este caso de Prueba
  });
  it("Paso 1", () => {
    //Pasos individuales para completar el flujo de prueba.
  });
  it("Teardown de Data", () => {
    //Paso final donde se eliminan todos los datos.
    // El sistema debe quedar intacto, sin mopdificaciones.
    // Como si nunca se hubiese pasado ninguna prueba
  });
});

//Cada describe dentro de un Spec responde a un Caso de Prueba ya documentado.
describe.only("CP-EMP-6011 - Configuración básica, valores válidos", () => {
  //Before each se puede usar para el login al sistema y cada test inicie siempre en un mismo punto
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  //Afeter each se puede usar para acomular los reportes de cada test
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Set-up de Data", () => {
    //Primer paso donde se preparan los datos necesarios para este caso de Prueba
  });
  it("Paso 1", () => {
    //Pasos individuales para completar el flujo de prueba.
  });
  it("Teardown de Data", () => {
    //Paso final donde se eliminan todos los datos.
    // El sistema debe quedar intacto, sin mopdificaciones.
    // Como si nunca se hubiese pasado ninguna prueba
  });
});
