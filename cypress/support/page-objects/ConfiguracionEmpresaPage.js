require("cypress-xpath");
require("cypress-plugin-tab");
class ConfEmpresaPage {
  goToDatosEmpresa() {
    cy.xpath("(//div[contains(.,'Configuración')])[10]").click();
    cy.xpath("(//div[contains(.,'Empresa')])[23]").click();
    cy.xpath("(//div[contains(.,'Datos Empresa')])[17]").click();
    cy.wait(1000);
  }
  cambiarLogoEmpresa(datosEmpresa) {
    cy.xpath("(//div[contains(.,'Guardar')])[43]").scrollIntoView({
      easing: "linear",
      duration: 1000,
    });
    cy.get("#picture-input > input[type=file]").selectFile(datosEmpresa.logo1, {
      force: true,
    });
    cy.wait(1000);
    cy.xpath("(//div[contains(.,'Guardar')])[43]").click();
  }
}
export default ConfEmpresaPage;
