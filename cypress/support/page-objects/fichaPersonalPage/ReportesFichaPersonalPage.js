require("cypress-xpath");
require("cypress-plugin-tab");
class ReportesFichaPersonalPage {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);
  }
  reporteEmpleadosAFecha() {
    cy.fixture("reportesFichaPersonal.json").then((data) => {
      const config = data.empleadosAlaFecha;

      cy.xpath("(//div[contains(.,'cloud_downloadReporte')])[15]").click();
      cy.xpath("(//div[contains(.,'Generar')])[183]").click();
      cy.wait(500);

      //Seleccionar los campos de Ficha personal
      cy.xpath(
        "(//div[@class='q-if-label'][contains(.,'Datos de ficha personal')])[2]"
      ).click();
      const checkboxesFichaPersonal = [
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Número de documento')]",
          valor: config.numeroDocumento,
          nombre: "Número de documento",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Apellidos')]",
          valor: config.apellidos,
          nombre: "Apellidos",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Nombres')]",
          valor: config.nombres,
          nombre: "Nombres",
        },
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Tipo de documento')]",
          valor: config.tipoDocumento,
          nombre: "Tipo de Documento",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Sexo')]",
          valor: config.sexo,
          nombre: "Sexo",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Estado civil')]",
          valor: config.estadoCivil,
          nombre: "Estado Civil",
        },
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Fecha de nacimiento')]",
          valor: config.fechaNacimiento,
          nombre: "Fecha de Nacimiento",
        },
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Empleado sustituto de PCD')]",
          valor: config.sustitutoPCD,
          nombre: "Sustituto de PCD",
        },
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Persona con discapacidad')]",
          valor: config.personaDiscapacidad,
          nombre: "Persona con discapacidad",
        },
        {
          xpath:
            "//div[@class='q-item-label'][contains(.,'Región donde ejecuta el trabajo')]",
          valor: config.regionTrabajo,
          nombre: "Region de Trabajo",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Ciudad')]",
          valor: config.ciudad,
          nombre: "Ciudad",
        },
      ];
      checkboxesFichaPersonal.forEach(({ xpath, valor, nombre }) => {
        this.sincronizarCheckbox(xpath, valor, nombre);
      });

      cy.xpath(
        "(//div[@class='q-pa-md text-h5'][contains(.,'Seleccione los campos que desea que se muestren en el reporte.')])[2]"
      ).click();

      //Seleccionar los campos de Contrato
      cy.xpath(
        "(//div[@class='q-if-label'][contains(.,'Datos de contratos')])[2]"
      ).click();
      const checkboxesContrato = [
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Cargo')]",
          valor: config.cargo,
          nombre: "Cargo",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Fecha de ingreso')]",
          valor: config.fechaIngreso,
          nombre: "Fecha de Ingreso",
        },
        {
          xpath: "//div[@class='q-item-label'][contains(.,'Tipo de contrato')]",
          valor: config.tipoContrato,
          nombre: "Tipo de Contrato",
        },
        {
          xpath: "(//div[@class='q-item-label'][contains(.,'Sueldo')])[1]",
          valor: config.sueldo,
          nombre: "Sueldo",
        },
      ];
      checkboxesContrato.forEach(({ xpath, valor, nombre }) => {
        this.sincronizarCheckbox(xpath, valor, nombre);
      });
      cy.xpath(
        "(//div[@class='q-pa-md text-h5'][contains(.,'Seleccione los campos que desea que se muestren en el reporte.')])[2]"
      ).click();

      const start = Date.now();
      const downloadsFolder = "cypress/downloads";
      cy.xpath("(//div[contains(.,'Generar')])[173]").click();
      cy.task("getLatestFile", { dirPath: downloadsFolder }).then(
        (latestFilePath) => {
          expect(latestFilePath).to.not.be.null;
          cy.readFile(latestFilePath, { timeout: 20000 })
            .should("exist")
            .then(() => {
              // Aquí puedes medir el tiempo, leer el archivo, etc.
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
    });
  }

  //Helpers
  sincronizarCheckbox(xpath, valorDeseado, nombre) {
    cy.xpath(xpath).then(($checkbox) => {
      const estaActivo = $checkbox.hasClass("active");
      if (estaActivo !== valorDeseado) {
        cy.xpath(
          xpath.replace(
            "/ancestor::div[contains(@class, 'q-item')]//div[contains(@class, 'q-option-inner')]",
            ""
          )
        ).click();
      }
    });
  }
}

export default ReportesFichaPersonalPage;
