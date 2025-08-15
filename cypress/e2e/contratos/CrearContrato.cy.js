require("cypress-xpath");
require("cypress-plugin-tab");
describe("Contratos - Crear Contrato del Empleado", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it("1. Crear Ficha Personal basica de un Empleado", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    // //Seleccion de de instancia de la empresa
    // cy.xpath("(//div[@tabindex='0'])[1]").click();
    // cy.wait(1000);
    // cy.xpath("(//div[contains(.,'Demo 3')])[17]").click();
    // cy.wait(10000);

    // //Saltar Advertencia sobre la falta de configuracion de la empresa
    // cy.wait(4000);
    // cy.xpath(
    //   "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    // ).click();
    // cy.wait(1000);

    //Seleccionar Modulo Ficha Personal
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
    cy.wait(5000);
  });

  it("2. Crear contrato basico de un Empleado", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
    cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
    cy.xpath("//div[contains(text(),'Iniciar')]").click();

    // //Seleccion de de instancia de la empresa
    // cy.xpath("(//div[@tabindex='0'])[1]").click();
    // cy.wait(1000);
    // cy.xpath("(//div[contains(.,'Demo 3')])[17]").click();
    // cy.wait(10000);

    // //Saltar Advertencia sobre la falta de configuracion de la empresa
    // cy.wait(4000);
    // cy.xpath(
    //   "//button[@class='q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable text-primary']"
    // ).click();
    // cy.wait(1000);

    //Seleccionar Modulo Contratos
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Contratos')]").click();
    cy.wait(1000);

    //Crear Contrato
    cy.xpath("(//div[contains(.,'addcontrato')])[13]").click();
    cy.wait(3000);

    //Informacion administratica y laboral
    cy.xpath("(//input[contains(@type,'text')])[4]").type("1104730229");
    cy.xpath(
      "//div[@class='q-item-sublabel'][contains(.,'1104730229')]"
    ).click(); //Seleccion del Empleado

    cy.xpath(
      "(//div[contains(@class,'col q-input-target ellipsis justify-start')])[49]"
    ).click();
    cy.xpath("(//span[contains(.,'1')])[3]").click(); //Fecha de ingreso

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    ).click();
    cy.xpath("(//div[contains(.,'Servicios Profecionales')])[5]").click(); //Tipo de contrato

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//div[contains(.,'001')])[5]").click(); //Codigo de establecimiento

    cy.xpath("(//input[contains(@type,'number')])[7]").type("600"); //Sueldo

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[35]"
    ).click();
    cy.xpath("(//div[contains(.,'Mensual')])[5]").click(); //Tipo de sueldo

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[37]"
    ).click();
    cy.xpath("(//div[contains(.,'Cargo 1')])[5]").click(); //Cargo

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[38]"
    ).click();
    cy.xpath("(//div[contains(.,'Departamento 1')])[5]").click(); //Departamento

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[39]"
    ).click();
    cy.xpath("(//div[contains(.,'Centro de Costo 1')])[5]").click(); //Centro de Costo

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[42]"
    ).click();
    cy.xpath("(//div[contains(.,'IESS')])[15]").click(); //Fondo de Reserva

    cy.xpath("//input[contains(@max,'240')]").type("240"); //Horas laborables por mes

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[43]"
    ).click();
    cy.xpath("(//div[contains(.,'MOD')])[5]").click(); //Tipo de Egreso

    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[45]"
    ).click();
    cy.xpath("(//div[contains(.,'0001')])[5]").click(); //Codigo de establecimiento IESS

    cy.xpath("(//div[contains(.,'Guardar')])[37]").click();
    cy.wait(3000);
  });
});
