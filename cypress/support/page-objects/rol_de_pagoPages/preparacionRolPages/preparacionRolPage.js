require("cypress-xpath");
require("cypress-plugin-tab");

class preparacionRolPage {
  goToPreparacionDelRol() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Roles de pago')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Preparación de roles')]").click();
    cy.wait(1000);
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
    this.goToPreparacionDelRol();
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'cloud_downloadReportes')]"
    ).click();
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'cloud_downloadborrador de nomina')]"
    ).click();

    // Interceptar la petición de descarga
    cy.intercept("POST", "**/api/obtener-archivo-blob**").as("downloadFile");

    // Hacer click en generar
    cy.xpath("(//div[contains(.,'Generar')])[179]").click();

    // Esperar a que la petición se complete
    cy.wait("@downloadFile").then((interception) => {
      expect(interception.response.statusCode).to.eq(60000);
    });

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
