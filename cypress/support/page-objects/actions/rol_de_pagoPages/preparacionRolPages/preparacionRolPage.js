require("cypress-xpath");
require("cypress-plugin-tab");

class preparacionRolPage {
  goToPreparacionDelRol() {
    cy.wait(500);
    cy.xpath("//a[@tabindex='0'][contains(.,'settingsConfiguración')]").click({
      force: true,
    });
    cy.wait(500);
    cy.xpath("//button[@tabindex='0'][contains(.,'Roles de pago')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Preparación de roles')]").click();
    cy.wait(1000);
  }
  seleccionarTipoRol(dataRol) {
    cy.xpath("(//div[contains(.,'Agosto')])[25]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.mes}')]`
    ).click();
    cy.xpath(
      "(//div[contains(.,'|RolFin de mesRolarrow_drop_down')])[19]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.tipo}')]`
    ).click();
  }

  seleccionarEmpleado(dataEmpleado) {
    cy.xpath("//button[@tabindex='0'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'buscar empleado')]").type(
      dataEmpleado.cedula
    );
    cy.xpath(
      `//div[@class='q-item-sublabel ellipsis'][contains(.,'${dataEmpleado.cedula}')]`
    ).click();
    cy.scrollTo("top");
    cy.wait(500);
  }
  modificarValores(dataRol) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Comisión')]").type(
      dataRol.comision
    );
    cy.xpath("//div[@class='q-if-label'][contains(.,'Bonificación')]").type(
      dataRol.bonificacion
    );
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();
    cy.wait(1000);
    cy.scrollTo("top");
  }
  descargarBorradorRol() {
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'cloud_downloadReportes')]"
    ).click();
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'cloud_downloadborrador de nomina')]"
    ).click();
    cy.xpath("(//div[contains(.,'Generar')])[179]").click();
    //this.tiempoGeneraciónDocumento("(//div[contains(.,'Generar')])[179]");
  }

  tiempoGeneraciónDocumento(xpath) {
    const start = Date.now();
    const downloadsFolder = "cypress/downloads";
    cy.xpath(xpath).click();
    cy.task("getLatestFile", { dirPath: downloadsFolder }).then(
      (latestFilePath) => {
        expect(latestFilePath).to.not.be.null;
        cy.readFile(latestFilePath, { timeout: 120000 })
          .should("exist")
          .then(() => {
            cy.log(`El archivo más reciente es: ${latestFilePath}`);
          });
      }
    );
    const end = Date.now();
    const elapsed = end - start; // tiempo en milisegundos
    const maxTime = 5000;
    if (elapsed > maxTime) {
      cy.log(`⚠️ El archivo tardó demasiado en generarse: ${elapsed} ms`);
    } else {
      cy.log(`✅ El archivo se generó en ${elapsed} ms`);
    }
  }
}

export default preparacionRolPage;
