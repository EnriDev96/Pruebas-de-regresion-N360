require("cypress-xpath");
require("cypress-plugin-tab");

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

it.only("1. Crear Ficha Personal de un Empleado", () => {
  //Login del sistema de Nomina360
  cy.visit("http://localhost:8080/#/login");
  cy.xpath("//input[contains(@type,'email')]").type("admin@demo360.com");
  cy.xpath("//input[contains(@type,'password')]").type("Nomina360");
  cy.xpath("//div[contains(text(),'Iniciar')]").click();
});
