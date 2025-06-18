/// <reference types="Cypress"/>
require("cypress-xpath");
describe("Ficha Personal - Crear Ficha Personal del Empleado", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it.only("1. Ingresar Pagina - demo - Local", () => {
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
    // cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    // cy.wait(2000);
    // cy.xpath(
    //   "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    // ).click();
    // cy.xpath("//div[contains(text(),'Cédula')]").click();
    // cy.xpath("(//input[@type='text'])[4]").type("1104730229");
    // cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click(); //Verificar Cédula
    // cy.xpath("(//input[contains(@type,'text')])[5]")
    //   .type("Eempleado Uno")
    //   .type("{enter}")
    //   .tab()
    //   .type("Test QA")
    //   .type("{enter}");
    // cy.xpath("(//input[@type='email'])[2]").type("testqa@email.com");
    // cy.xpath(
    //   "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    // ).click();
    // cy.xpath("(//div[contains(.,'Masculino')])[5]").click();
    // cy.xpath("").click(); //Fecha de naciemiento
    cy.xpath(
      ":q-if row no-wrap relative-position q-select q-if-error q-if-focusable q-if-inverted bg-negative text-white"
    );
    cy.wait(5000);
    cy.xpath("//div[@class='q-item-label'][normalize-space()='No']").click();
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[36]"
    ).click();
    cy.xpath("//div[@class='q-item-label'][normalize-space()='No']").click();

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    cy.wait(2000);
    cy.xpath("(//i[@aria-hidden='true'])[124]").click();
    cy.xpath("(//div[contains(.,'Sierra')])[5]").click();
    cy.xpath("(//i[@aria-hidden='true'])[125]").click();
    cy.xpath("(//div[contains(.,'Residencial')])[5]").click();

    //Datos Familiares
  });

  it("2. ", () => {
    cy.visit("http://localhost:8080/#/login");
    cy.get(".modal-buttons > .q-btn").type("admin@demo360.com");
    cy.get(
      ":nth-child(5) > .col-md-5 > .q-if > .q-if-inner > .row > .col"
    ).type("Nomina360");
    cy.get(":nth-child(7) > .col-md-8 > .q-btn").click();
  });

  it("2. ", () => {
    cy.visit("http://localhost:8080/#/login");
    cy.get(".modal-buttons > .q-btn").type("admin@demo360.com");
    cy.get(
      ":nth-child(5) > .col-md-5 > .q-if > .q-if-inner > .row > .col"
    ).type("Nomina360");
    cy.get(":nth-child(7) > .col-md-8 > .q-btn").click();
  });
});
