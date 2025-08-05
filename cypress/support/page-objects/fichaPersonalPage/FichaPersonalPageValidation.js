require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../support/utils/validationReporter";

class FichaPersonalValidation {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);
  }

  crearFichaPersonal(datos) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addEmpleado')]").click();
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    cy.wait(2000);

    this.ingresarValidarCédula(datos.cedula);
    this.ingresarNombre(datos.nombres);
    this.ingresarApellido(datos.apellidos);
    this.ingresarCorreoIntitucional(datos.emailInstitucional);
    this.ingresarCorreoPersonal(datos.emailPersonal);

    cy.wait(1000);
  }

  ingresarValidarCédula(numeroCedula) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath("//div[contains(text(),'Cédula')]").click();

    cy.xpath("(//input[@type='text'])[4]").clear().type(numeroCedula);

    validationReporter.clearErrors();
    cy.xpath("(//input[@type='text'])[4]").then(($input) => {
      const valorIngresado = $input.val();
      // Validación 1: Formato de cédula (10 dígitos)
      if (!/^\d{10}$/.test(valorIngresado)) {
        validationReporter.addError(
          `La cédula ${valorIngresado} no tiene el formato correcto (10 dígitos).`
        );
      } else {
        cy.log(
          `✅ Validación OK: Formato de cédula correcto (${valorIngresado}).`
        );
      }
    });
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click();
    return this;
  }

  ingresarNombre(nombres) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Nombres:')]"
    ).click();
    cy.xpath("(//input[@type='text'])[5]").clear().type(nombres);

    validationReporter.clearErrors();
    cy.xpath("(//input[@type='text'])[5]").then(($input) => {
      const valorIngresado = $input.val();
      //Validación 1: Máximo 64 caracteres
      if (valorIngresado.length > 100) {
        validationReporter.addError(
          `Los nombres exceden el límite de 100 caracteres. Actual: ${valorIngresado.length} caracteres`
        );
      }
      // Validación 2: Solo letras y espacios
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
        validationReporter.addError(
          "Los nombres solo pueden contener letras y espacios"
        );
      }
      // Log de éxito si todas las validaciones pasan
      if (
        valorIngresado.length <= 100 &&
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)
      ) {
        cy.log(
          `✅ Validación OK: Nombres "${valorIngresado}" (${valorIngresado.length} caracteres)`
        );
      }
    });
    return this;
  }

  ingresarApellido(apellidos) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Apellidos:')]"
    ).click();
    cy.xpath("(//input[@type='text'])[6]").clear().type(apellidos);

    validationReporter.clearErrors();
    cy.xpath("(//input[@type='text'])[6]").then(($input) => {
      const valorIngresado = $input.val();
      //Validación 1: Máximo 64 caracteres
      if (valorIngresado.length > 100) {
        validationReporter.addError(
          `Los apellidos exceden el límite de 100 caracteres. Actual: ${valorIngresado.length} caracteres`
        );
      }
      // Validación 2: Solo letras y espacios
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
        validationReporter.addError(
          "Los apellidos solo pueden contener letras y espacios"
        );
      }
      // Log de éxito si todas las validaciones pasan
      if (
        valorIngresado.length <= 100 &&
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)
      ) {
        cy.log(
          `✅ Validación OK: Apellidos "${valorIngresado}" (${valorIngresado.length} caracteres)`
        );
      }
    });
    return this;
  }

  ingresarCorreoIntitucional(correoInsitucional) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Correo institucional - Acceso:')]"
    ).click();
    cy.xpath("(//input[@type='email'])[1]").type(correoInsitucional);

    validationReporter.clearErrors();
    cy.xpath("(//input[@type='email'])[1]").then(($input) => {
      const valorIngresado = $input.val();

      // Validación: estructura de correo user-name@sub-domain.org
      if (
        !/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(valorIngresado)
      ) {
        validationReporter.addError(
          "El correo Institucional no tiene un formato válido: debe ser (algo)@(algo).(algo) (mínimo 2 caracteres después del punto)"
        );
      } else {
        cy.log(`✅ Correo electronico válido: ${valorIngresado}`);
      }
    });
  }

  ingresarCorreoPersonal(correoPersonal) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Correo personal:')]"
    ).click();
    cy.xpath("(//input[@type='email'])[2]").type(correoPersonal);
    validationReporter.clearErrors();
    cy.xpath("(//input[@type='email'])[2]").then(($input) => {
      const valorIngresado = $input.val();

      // Validación: estructura de correo user-name@sub-domain.org
      if (
        !/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(valorIngresado)
      ) {
        validationReporter.addError(
          "El correo Personal no tiene un formato válido: debe ser (algo)@(algo).(algo) (mínimo 2 caracteres después del punto)"
        );
      } else {
        cy.log(`✅ Correo electronico válido: ${valorIngresado}`);
      }
    });
  }
}
export default FichaPersonalValidation;
