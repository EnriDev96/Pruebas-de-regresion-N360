/// <reference types="Cypress"/>
require("cypress-xpath");
describe("Ficha Personal - Crear Ficha Personal del Empleado", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it.only("1. Ingresar Pagina - demo - Local", () => {
    //Login del sistema de Nomina360
    cy.visit("http://localhost:8080/#/login");
    cy.get(
      ":nth-child(4) > .col-md-5 > .q-if > .q-if-inner > .row > .col"
    ).type("admin@demo360.com");
    cy.get(
      ":nth-child(5) > .col-md-5 > .q-if > .q-if-inner > .row > .col"
    ).type("Nomina360");
    cy.get(":nth-child(7) > .col-md-8 > .q-btn").click();

    //Saltar Advertencia sobre la falta de configuracion de la empresa
    cy.get(".modal-buttons > .q-btn").click();

    //Seleccion de de instancia de la empresa
    cy.get(".q-list > :nth-child(1) > :nth-child(1) > .q-if > .q-icon").click();
    cy.get(".q-select-highlight > .q-item-main > .q-item-label").click();
    cy.wait(5000);

    //Seleccionar Ficha Personal
    cy.get(":nth-child(4) > .q-btn > .q-btn-inner > div").click();
    cy.get(".q-popover > :nth-child(1) > .q-btn > .q-btn-inner > div").click();
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
