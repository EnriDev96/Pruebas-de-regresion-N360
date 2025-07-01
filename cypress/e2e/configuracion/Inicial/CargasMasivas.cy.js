require("cypress-xpath");
require("cypress-plugin-tab");
describe("Configuracion Inicial - Cargas Masivas", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it("Prueba 1", () => {});
});
