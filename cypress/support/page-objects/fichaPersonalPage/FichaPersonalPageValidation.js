require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../support/utils/validationReporter";

class FichaPersonalValidation {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(500);
  }

  crearFichaPersonal(datos) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addEmpleado')]").click();

    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    cy.wait(1000);
    this.seleccionarTipoDeDocumento(datos.tipoDocumento);
    this.ingresarNumeroDeCedula(datos.cedula);
    this.ingresarNombre(datos.nombres);
    this.ingresarApellido(datos.apellidos);
    this.ingresarCorreoIntitucional(datos.emailInstitucional);
    this.ingresarCorreoPersonal(datos.emailPersonal);
    this.seleccionarSexo(datos.sexo);
    this.seleccionarFechaDeNacimiento(datos.fechaNacimiento);
    this.seleccionarEmpleadoSustituto(datos.sustitutoPCD);
    this.seleccionarDiscapacidad(datos.discapacidad);

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    this.seleccinoarRegion(datos.region);
    this.seleccionarRecidencia(datos.tipoRecidencia);

    //Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    this.seleccionarTipoCobro(datos.tipoCobro);

    //Guardar FichaPersonal
    cy.wait(1000);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                                 DATOS BÁSICOS                                      //
  ////////////////////////////////////////////////////////////////////////////////////////
  seleccionarTipoDeDocumento(documento) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath(`//div[contains(text(),'${documento}')]`).click();
  }

  ingresarNumeroDeCedula(numeroCedula) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Número de Documento:')]"
    ).click();
    // Validar que el campo reciba un valor
    if (!numeroCedula || numeroCedula.trim() === "") {
      validationReporter.addError(`❌Campo "Número de Documento" vacio |`);
      cy.log(
        `❌ El campo "Número de Documento" es requerido y no puede estar vacío`
      );
      return this;
    }

    cy.xpath("(//input[@type='text'])[4]").clear().type(numeroCedula);
    cy.xpath("(//input[@type='text'])[4]").then(($input) => {
      const valorIngresado = $input.val();
      // Validación 1: Formato de cédula (10 dígitos)
      if (!/^\d{10}$/.test(valorIngresado)) {
        validationReporter.addError(`⚠️Cédula con formato Invalido |`);
        cy.log(`⚠️ La cedula solo puede contener 10 Digitos`);
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
    // Validar que el campo reciba un valor
    if (!nombres || nombres.trim() === "") {
      validationReporter.addError(`❌Campo "Nombres" vacio|`);
      cy.log(`❌ El campo "Nombres" es requerido y no puede estar vacío`);
      return this;
    }
    cy.xpath("(//input[@type='text'])[5]").clear().type(nombres);
    cy.xpath("(//input[@type='text'])[5]").then(($input) => {
      const valorIngresado = $input.val();
      //Validación 1: Máximo 64 caracteres
      if (valorIngresado.length > 100) {
        validationReporter.addError(
          `⚠️Los Nombres exceden cantidad de caracteres |`
        );
        cy.log(
          `⚠️ Los nombres exceden el límite de 100 caracteres. Actual: ${valorIngresado.length} caracteres`
        );
      }
      // Validación 2: Solo letras y espacios
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
        validationReporter.addError("⚠️Nombres con formato Invalido |");
        cy.log(`⚠️ Los nombres solo pueden contener letras y espacios `);
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

    // Validar que el campo reciba un valor
    if (!apellidos || apellidos.trim() === "") {
      validationReporter.addError(`❌Campo "Apellidos" vacio|`);
      cy.log(`❌ El campo "Apellidos" es requerido y no puede estar vacío`);
      return this;
    }

    cy.xpath("(//input[@type='text'])[6]").clear().type(apellidos);
    cy.xpath("(//input[@type='text'])[6]").then(($input) => {
      const valorIngresado = $input.val();
      //Validación 1: Máximo 64 caracteres
      if (valorIngresado.length > 100) {
        validationReporter.addError(
          `⚠️Los Apellidos exceden cantidad de caracteres |`
        );
        cy.log(
          `⚠️ Los Apellidos exceden el límite de 100 caracteres. Actual: ${valorIngresado.length} caracteres`
        );
      }
      // Validación 2: Solo letras y espacios
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valorIngresado)) {
        validationReporter.addError("⚠️Apellidos con formato Invalido |");
        cy.log(`⚠️ Los Apellidos solo pueden contener letras y espacios `);
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
    // Validar que el campo reciba un valor
    if (!correoInsitucional || correoInsitucional.trim() === "") {
      validationReporter.addError(`❌Campo "Correo institucional" vacio|`);
      cy.log(
        `❌ El campo "Correo institucional" es requerido y no puede estar vacío`
      );
      return this;
    }

    cy.xpath("(//input[@type='email'])[1]").type(correoInsitucional);
    cy.xpath("(//input[@type='email'])[1]").then(($input) => {
      const valorIngresado = $input.val();

      // Validación: estructura de correo user-name@sub-domain.org
      if (
        !/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(valorIngresado)
      ) {
        validationReporter.addError(
          `⚠️Correo Institucional con formato Invalido |`
        );
        cy.log(
          `⚠️ El correo "${valorIngresado}", no tiene un formato válido: debe ser (algo)@(algo).(algo) (mínimo 2 caracteres después del punto)`
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
    // Validar que el campo reciba un valor
    if (!correoPersonal || correoPersonal.trim() === "") {
      validationReporter.addError(`❌Campo "Correo personal" vacío |`);
      cy.log(
        `❌ El campo "Correo personal" es requerido y no puede estar vacío`
      );
      return this;
    }

    cy.xpath("(//input[@type='email'])[2]").type(correoPersonal);
    cy.xpath("(//input[@type='email'])[2]").then(($input) => {
      const valorIngresado = $input.val();

      // Validación: estructura de correo user-name@sub-domain.org
      if (
        !/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/.test(valorIngresado)
      ) {
        validationReporter.addError(`⚠️Correo Personal con formato Invalido |`);
        cy.log(
          `⚠️ El correo "${valorIngresado}", no tiene un formato válido: debe ser (algo)@(algo).(algo) (mínimo 2 caracteres después del punto)`
        );
      } else {
        cy.log(`✅ Correo electronico válido: ${valorIngresado}`);
      }
    });
  }

  seleccionarSexo(sexo) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Sexo:|arrow_drop_downEl sexo es requerido.')]"
    ).click();
    // Validar que el campo reciba un valor
    if (!sexo || sexo.trim() === "") {
      validationReporter.addError(`❌Campo "Sexo" vacío |`);
      cy.log(`❌ El campo "Sexo" es requerido y no puede estar vacío`);
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${sexo}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Sexo seleccionado correctamente: ${sexo}`);
      }
    });
    return this;
  }

  seleccionarFechaDeNacimiento(fechaNacimiento) {
    // Validar que el campo reciba un valor
    if (!fechaNacimiento || fechaNacimiento.trim() === "") {
      validationReporter.addError(`❌Campo "Fecha de Nacimiento" vacío|`);
      cy.log(
        `❌ El campo "Fecha de Nacimiento" es requerido y no puede estar vacío`
      );
      return this;
    }
    const [anio, mes, dia] = fechaNacimiento.split("-");
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const mesNombre = meses[parseInt(mes, 10)];
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath(`(//div[contains(.,'${anio}')])[6]`).click();
    cy.xpath(`(//div[contains(.,'${mesNombre}')])[20]`).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'${parseInt(
        dia,
        10
      )}')]`
    ).click();
  }

  seleccionarEmpleadoSustituto(sustituto) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[35]"
    ).click();
    // Validar que el campo reciba un valor
    if (!sustituto || sustituto.trim() === "") {
      validationReporter.addError(`❌Campo "Empleado Sustituto de PCD" vacío|`);
      cy.log(
        `❌ El campo "Empleado Sustituto de PCD" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${sustituto}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Empleado sustituto seleccionado correctamente: ${sustituto}`
        );
      }
    });
    return this;
  }

  seleccionarDiscapacidad(discapacidad) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[36]"
    ).click();

    // Validar que el campo reciba un valor
    if (!discapacidad || discapacidad.trim() === "") {
      validationReporter.addError(`❌Campo "Persona con Discapacidad" vacío |`);
      cy.log(
        `❌ El campo "Persona con Discapacidad" es requerido y no puede estar vacío`
      );
      return this;
    }

    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${discapacidad}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Discapacidad seleccionada correctamente: ${discapacidad}`);
      }
    });
    return this;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                             DATOS DE UBICACIÓN                                     //
  ////////////////////////////////////////////////////////////////////////////////////////
  seleccinoarRegion(region) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    // Validar que el campo reciba un valor
    if (!region || region.trim() === "") {
      validationReporter.addError(
        `❌Campo "Región donde ejecuta trabajo" vacío |`
      );
      cy.log(
        `❌ El campo "Región donde ejecuta trabajo" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${region}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Región seleccionada correctamente: ${region}`);
      }
    });
    return this;
  }

  seleccionarRecidencia(recidencia) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    // Validar que el campo reciba un valor
    if (!recidencia || recidencia.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de direccion" vacío |`);
      cy.log(
        `❌ El campo "Tipo de direccion" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${recidencia}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Tipo de direccion seleccionado correctamente: ${recidencia}`
        );
      }
    });
    return this;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                             DATOS FINANCIEROS                                      //
  ////////////////////////////////////////////////////////////////////////////////////////
  seleccionarTipoCobro(cobro) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    // Validar que el campo reciba un valor
    if (!cobro || cobro.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de cobro" vacío |`);
      cy.log(`❌ El campo "Tipo de cobro" es requerido y no puede estar vacío`);
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${cobro}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de cobro seleccionado correctamente: ${cobro}`);
      }
    });
    return this;
  }
}
export default FichaPersonalValidation;
