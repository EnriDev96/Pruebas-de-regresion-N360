require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "./validationReporter";
class validacionCampos {
  ingresarNombre(nombres) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Nombres:')]"
    ).click();
    this.campoObligatorio(nombres, "Nombres");
    cy.xpath("(//input[@type='text'])[5]").clear().type(nombres);
    this.formatoSoloLetras("(//input[@type='text'])[5]", "Nombres");
  }

  campoObligatorio(imputCampo, nombreCampo) {
    if (!imputCampo || imputCampo.trim() === "") {
      validationReporter.addError(`❌Campo "${nombreCampo}" es obligatorio |`);
      cy.log(
        `❌ El campo "${nombreCampo}" es requerido y no puede estar vacío`
      );
      return false;
    }
    return this;
  }
  formatoSoloLetras(xpath, nombreCampo) {
    cy.xpath(`${xpath}`).then(($input) => {
      const valorIngresado = $input.val();

      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
        validationReporter.addError(
          `⚠️ El campo "${nombreCampo}" tiene formato Invalido |`
        );
        cy.log(
          `⚠️ El campo "${nombreCampo}" solo pueden contener letras y espacios `
        );
      }
      if (
        valorIngresado.length <= 100 &&
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)
      ) {
        cy.log(`✅ Validación OK: campo "${nombreCampo}": "${valorIngresado}"`);
      }
    });
    return this;
  }
  formatoCedula(xpath, nombreCampo) {
    cy.xpath(`${xpath}`).then(($input) => {
      const valorIngresado = $input.val();
      if (!/^\d{10}$/.test(valorIngresado)) {
        validationReporter.addError(
          `⚠️ El campo "${nombreCampo}" tiene formato Invalido |`
        );
        cy.log(`⚠️ El campo "${nombreCampo}" solo pueden contener 10 digitos`);
      } else {
        cy.log(`✅ Validación OK: campo "${nombreCampo}": "${valorIngresado}"`);
      }
    });
    return this;
  }

  formatoCorreo(xpath, nombreCampo) {
    cy.xpath(`${xpath}`).then(($input) => {
      const valorIngresado = $input.val();
      if (
        !/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(valorIngresado)
      ) {
        validationReporter.addError(
          `⚠️ El campo "${nombreCampo}" tiene formato Invalido |`
        );
        cy.log(
          `⚠️ El correo "${valorIngresado}", no tiene un formato válido: debe ser (algo)@(algo).(algo) (mínimo 2 caracteres después del punto)`
        );
      } else {
        cy.log(`✅ Validación OK: campo "${nombreCampo}": "${valorIngresado}"`);
      }
    });
    return this;
  }
  correctaSeleccion(xpath, nombreCampo, imputCampo) {
    cy.xpath(`${xpath}`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Campo "${nombreCampo}" seleccionado correctamente: ${imputCampo}`
        );
      }
    });
    return this;
  }

  edadMinima(fechaNacimiento, edadMinima = 16) {
    // fechaNacimiento debe estar en formato 'YYYY-MM-DD'
    const hoy = new Date();
    const [anio, mes, dia] = fechaNacimiento.split("-").map(Number);
    const fechaNac = new Date(anio, mes - 1, dia);

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    // Si aún no ha cumplido años este año, restar 1
    if (mesActual < mes - 1 || (mesActual === mes - 1 && diaActual < dia)) {
      edad--;
    }

    if (edad < edadMinima) {
      validationReporter.addError(
        `⚠️Edad insuficiente: ${edad} años (mínimo ${edadMinima})`
      );
      cy.log(
        `⚠️ La persona debe tener al menos ${edadMinima} años cumplidos. Edad actual: ${edad} años |`
      );
      return false;
    } else {
      cy.log(`✅ Edad válida: ${edad} años`);
      return true;
    }
  }
}

export const validacion = new validacionCampos();
