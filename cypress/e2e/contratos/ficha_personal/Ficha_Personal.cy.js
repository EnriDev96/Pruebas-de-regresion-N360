///<reference types="cypress" />;
require("cypress-xpath");
require("cypress-plugin-tab");
describe("Ficha Personal - Crear Ficha Personal del Empleado", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it("1. Crear Ficha Personal de un Empleado", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    //Saltar Advertencia sobre la falta de configuracion de la empresa
    cy.wait(4000);
    cy.xpath(
      "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    ).click();
    cy.wait(1000);

    //Seleccion de de instancia de la empresa
    // cy.get(".q-list > :nth-child(1) > :nth-child(1) > .q-if > .q-icon").click();
    // cy.wait(2000);
    // cy.get(".q-select-highlight > .q-item-main > .q-item-label").click();
    // cy.wait(10000);

    //Seleccionar Ficha Personal
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);

    //Crear Empleado
    cy.xpath("(//div[contains(.,'Empleado')])[47]").click();
    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    cy.wait(2000);

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath("//div[contains(text(),'Cédula')]").click(); //Tipo de Documento

    cy.xpath("(//input[@type='text'])[4]").type("1104730229"); //Numero de Documento
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click(); //Verificar Cédula

    cy.xpath("(//input[contains(@type,'text')])[5]")
      .type("Eempleado Uno")
      .type("{enter}") //Nombres
      .tab()
      .type("Test QA")
      .type("{enter}"); //Apellidos

    cy.xpath("(//input[@type='email'])[2]").type("testqa@email.com"); //Email

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    ).click();
    cy.xpath("(//div[contains(.,'Masculino')])[5]").click(); //Sexo del Empleado

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath("(//div[contains(.,'1996')])[6]").click();
    cy.xpath("(//div[contains(.,'Agosto')])[6]").click();
    cy.xpath("(//span[contains(.,'2')])[3]").click(); //Fecha de Nacimiento

    cy.xpath("(//div[@class='col q-input-target ellipsis justify-start'])[34]")
      .focused()
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}") //Empleado Sustituto
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}"); //Persona con Discapacidad

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    cy.wait(1000);
    cy.xpath("(//i[@aria-hidden='true'])[124]").click();
    cy.xpath("(//div[contains(.,'Sierra')])[5]").click();
    cy.xpath("(//i[@aria-hidden='true'])[125]").click();
    cy.xpath("(//div[contains(.,'Residencial')])[5]").click();

    //Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    cy.wait(1000);
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    cy.xpath("(//div[contains(.,'Efectivo')])[5]").click();

    //Guardar Datos
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();

    //Visualizar Ficha Personal de Empleado sin Contrato
    cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    cy.wait(1000);
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      "1104730229{enter}"
    );

    //Eliminar Ficha personal de Empleado Sin Contrato
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Eliminar ficha personal')])[16]").click();
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("x.Crear Ficha Personal de 2 Empleados ", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    //Saltar Advertencia sobre la falta de configuracion de la empresa
    cy.wait(4000);
    cy.xpath(
      "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    ).click();
    cy.wait(1000);

    //Seleccionar Ficha Personal
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);

    //Crear Empleado Dos Test QA
    cy.xpath("(//div[contains(.,'Empleado')])[47]").click();
    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath("//div[contains(text(),'Cédula')]").click(); //Tipo de Documento

    cy.xpath("(//input[@type='text'])[4]").type("0102312758"); //Numero de Documento
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click(); //Verificar Cédula

    cy.xpath("(//input[contains(@type,'text')])[5]")
      .type("Eempleado DOS")
      .type("{enter}") //Nombres
      .tab()
      .type("Test QA")
      .type("{enter}"); //Apellidos

    cy.xpath("(//input[@type='email'])[2]").type("testqa@email2.com"); //Email

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    ).click();
    cy.xpath("(//div[contains(.,'Masculino')])[5]").click(); //Sexo del Empleado

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath("(//div[contains(.,'1965')])[6]").click();
    cy.xpath("(//div[contains(.,'Enero')])[49]").click();
    cy.xpath("//span[contains(.,'15')]").click();

    cy.xpath("(//div[@class='col q-input-target ellipsis justify-start'])[34]")
      .focused()
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}") //Empleado Sustituto
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}"); //Persona con Discapacidad

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    cy.xpath("(//i[@aria-hidden='true'])[124]").click();
    cy.xpath("(//div[contains(.,'Sierra')])[5]").click();
    cy.xpath("(//i[@aria-hidden='true'])[125]").click();
    cy.xpath("(//div[contains(.,'Residencial')])[5]").click();

    //Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    cy.xpath("(//div[contains(.,'Efectivo')])[5]").click();

    //Guardar Datos
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();

    //Crear Empleado Uno Test QA
    cy.xpath("(//div[contains(.,'Empleado')])[47]").click();
    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath("//div[contains(text(),'Cédula')]").click(); //Tipo de Documento

    cy.xpath("(//input[@type='text'])[4]").type("1104730229"); //Numero de Documento
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click(); //Verificar Cédula

    cy.xpath("(//input[contains(@type,'text')])[5]")
      .type("Eempleado Uno")
      .type("{enter}") //Nombres
      .tab()
      .type("Test QA")
      .type("{enter}"); //Apellidos

    cy.xpath("(//input[@type='email'])[2]").type("testqa@email.com"); //Email

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    ).click();
    cy.xpath("(//div[contains(.,'Masculino')])[5]").click(); //Sexo del Empleado

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath("(//div[contains(.,'1996')])[6]").click();
    cy.xpath("(//div[contains(.,'Agosto')])[6]").click();
    cy.xpath("(//span[contains(.,'2')])[3]").click();

    cy.xpath("(//div[@class='col q-input-target ellipsis justify-start'])[34]")
      .focused()
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}") //Empleado Sustituto
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}"); //Persona con Discapacidad

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    cy.xpath("(//i[@aria-hidden='true'])[124]").click();
    cy.xpath("(//div[contains(.,'Sierra')])[5]").click();
    cy.xpath("(//i[@aria-hidden='true'])[125]").click();
    cy.xpath("(//div[contains(.,'Residencial')])[5]").click();

    //Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    cy.xpath("(//div[contains(.,'Efectivo')])[5]").click();

    //Guardar Datos
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("2.Visualizar Ficha Personal del Empleado Sin Contrato", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    //Saltar Advertencia sobre la falta de configuracion de la empresa
    cy.wait(4000);
    cy.xpath(
      "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    ).click();
    cy.wait(1000);

    //Seleccionar Ficha Personal
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);

    //Visualizar Ficha Personal de Empleado UNO sin Contrato
    cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    cy.wait(500);
    // cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    // cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
    //   "1104730229{enter}"
    // );
    // cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    // cy.xpath("(//div[contains(.,'Editar ficha personal')])[16]").click();
    // cy.wait(5000);
    // cy.xpath("(//div[contains(.,'Guardar')])[39]").click();

    //Visualizar Ficha Personal de Empleado DOS sin Contrato
    // cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    // cy.wait(500);
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      "0102312758{enter}"
    );
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Editar ficha personal')])[16]").click();
    cy.wait(5000);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it.only("4.ELiminar Ficha Personal de 2 Empleados Sin Contratos", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    //Saltar Advertencia sobre la falta de configuracion de la empresa
    cy.wait(4000);
    cy.xpath(
      "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    ).click();
    cy.wait(1000);

    //Seleccionar Ficha Personal
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);

    //Visualizar Ficha Personal de Empleado UNO sin Contrato
    cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    cy.wait(500);
    // cy.xpath("(//i[@aria-hidden='true'][contains(.,'close')])[16]").click();
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      "1104730229{enter}"
    );

    //Eliminar Ficha personal de Empleado UNO Sin Contrato
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Eliminar ficha personal')])[16]").click();
    cy.xpath("//i[@aria-hidden='true'][contains(.,'arrow_back')]").click();

    //Visualizar Ficha Personal de Empleado DOS sin Contrato
    cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    cy.wait(500);
    // cy.xpath("(//i[@aria-hidden='true'][contains(.,'close')])[16]").click();
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      "0102312758{enter}"
    );

    //Eliminar Ficha personal de Empleado DOS Sin Contrato
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Eliminar ficha personal')])[16]").click();
  });
});
