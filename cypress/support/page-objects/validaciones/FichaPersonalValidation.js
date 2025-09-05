require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../utils/validationReporter";
import { validacion } from "../../utils/validacionCampos";
import { helper } from "../../utils/helpers";
class FichaPersonalValidation {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);
  }

  validarCamposFichaPersonal(datos) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addEmpleado')]").click();

    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    cy.wait(1000);
    this.seleccionarTipoDeDocumento(datos.tipoDocumento);
    this.ingresarNumeroDeCedula(datos.cedula);
    this.ingresarNombre(datos.nombres);
    this.ingresarApellido(datos.apellidos);
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
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();
    cy.wait(500);
    cy.get(".q-alert-content > div", { timeout: 5000 }).then(($els) => {
      const match = $els
        .toArray()
        .some((el) => el.innerText.trim().includes("Guardado correctamente"));
      if (!match) {
        cy.log("✅ No permite crear Ficha Personal ✅");
      } else {
        validationReporter.addError('❌ Error: Se creó Ficha Personal ❌" |');
      }
    });
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
    if (!validacion.campoObligatorio(numeroCedula, "Número de Documento")) {
      return;
    }
    cy.xpath("(//input[@type='text'])[4]").clear().type(numeroCedula);
    validacion.formatoCedula(
      "(//input[@type='text'])[4]",
      "Número de Documento:"
    );
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click();
  }

  ingresarNombre(nombres) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Nombres:')]"
    ).click();
    if (!validacion.campoObligatorio(nombres, "Nombres")) {
      return;
    }
    cy.xpath("(//input[@type='text'])[5]").clear().type(nombres);
    validacion.formatoSoloLetras("(//input[@type='text'])[5]", "Nombres");
  }

  ingresarApellido(apellidos) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Apellidos:')]"
    ).click();
    if (!validacion.campoObligatorio(apellidos, "Apellidos")) {
      return;
    }
    cy.xpath("(//input[@type='text'])[6]").clear().type(apellidos);
    validacion.formatoSoloLetras("(//input[@type='text'])[6]", "Apellidos");
  }

  ingresarCorreoIntitucional(correoInsitucional) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Correo institucional - Acceso:')]"
    ).click();
    cy.xpath("(//input[@type='email'])[1]").type(correoInsitucional);
    validacion.formatoCorreo(
      "(//input[@type='email'])[1]",
      "Correo institucional"
    );
  }

  ingresarCorreoPersonal(correoPersonal) {
    cy.xpath(
      "//div[@class='text-grey q-mb-xs'][contains(.,'Correo personal:')]"
    ).click();
    if (!validacion.campoObligatorio(correoPersonal, "Correo personal")) {
      return;
    }
    cy.xpath("(//input[@type='email'])[2]").type(correoPersonal);
    validacion.formatoCorreo("(//input[@type='email'])[2]", "Correo personal");
  }

  ingresarCodigoIESS(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Código Empleado IESS:|')]"
    ).click();
    cy.focused().type(data);
  }

  seleccionarSexo(sexo) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Sexo:|arrow_drop_downEl sexo es requerido.')]"
    ).click();
    if (!validacion.campoObligatorio(sexo, "Sexo")) {
      return;
    }
    validacion.correctaSeleccion(
      `(//div[contains(.,'${sexo}')])[5]`,
      "Sexo",
      sexo
    );
  }

  seleccionarEstadoCivil(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Estado civil:|arrow_drop_down')]"
    ).click();
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'][contains(.,'${data}')]`,
      "Estado civil",
      data
    );
  }

  seleccionarFechaDeNacimiento(fechaNacimiento) {
    if (!validacion.campoObligatorio(fechaNacimiento, "Fecha de Nacimiento")) {
      return;
    }
    if (!validacion.edadMinima(fechaNacimiento, 16)) {
      return;
    }
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    helper.seleccionarFecha(fechaNacimiento);
  }

  seleccionarEmpleadoSustituto(sustituto) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[35]"
    ).click();
    if (!validacion.campoObligatorio(sustituto, "Empeado Sustituto")) {
      return;
    }
    // Validar Seleccion dentro de la lista
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'][contains(.,'${sustituto}')]`,
      "Estado civil",
      sustituto
    );
  }

  seleccionarDiscapacidad(discapacidad) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[36]"
    ).click();

    if (
      !validacion.campoObligatorio(discapacidad, "Persona con discapacidad")
    ) {
      return;
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

  seleccionarEstudios(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Nivel de estudios:|arrow_drop_down')]"
    ).click("bottom");

    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Nivel de estudios seleccionado correctamente: ${data}`);
      }
    });
    return this;
  }

  ingresarProfecion(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Profesión:|')]"
    ).click("bottom");
    cy.focused().type(data);
  }

  ingresarPorcentajeAnticipo(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Porcentaje anticipo de quincena:|%')]"
    ).click("bottom");
    cy.focused().type(data);
  }

  seleccionarFoto(data) {
    cy.get("#picture-input > input[type=file]").selectFile(data, {
      force: true,
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                             DATOS DE UBICACIÓN                                     //
  ////////////////////////////////////////////////////////////////////////////////////////
  seleccinoarRegion(region) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    if (!validacion.campoObligatorio(region, "Región")) {
      return;
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
    if (!validacion.campoObligatorio(recidencia, "Tipo de Direccion")) {
      return;
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

  seleccionarProvincia(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Provincia:|arrow_drop_down')]"
    ).click("bottom");

    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Provincia seleccionada correctamente: ${data}`);
      }
    });
    return this;
  }

  seleccinoarCiudad(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Ciudad:|arrow_drop_down')]"
    ).click("bottom");

    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Ciudad seleccionada correctamente: ${data}`);
      }
    });
    return this;
  }

  ingresarTelfFijo(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Teléfono convencional:|')]"
    ).click("bottom");
    cy.focused().type(data);
    cy.focused().then(($input) => {
      const valorIngresado = $input.val();
      // Solo digitos
      if (!/^\d{8,10}$/.test(valorIngresado)) {
        validationReporter.addError(
          `⚠️Telefono Convencional con formato Invalido |`
        );
        cy.log(`⚠️ El Telefono Convencional solo puede contener Digitos`);
      } else {
        cy.log(
          `✅ Telefono Convencional con formato válido: ${valorIngresado}.`
        );
      }
    });
    return this;
  }

  ingresarTelfMovil(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Teléfono móvil:|')]"
    ).click("bottom");
    cy.focused().type(data);
    cy.focused().then(($input) => {
      const valorIngresado = $input.val();
      // Solo digitos
      if (!/^\d{8,10}$/.test(valorIngresado)) {
        validationReporter.addError(`⚠️Telefono móvil con formato Invalido |`);
        cy.log(`⚠️ El Telefono móvil solo puede contener Digitos`);
      } else {
        cy.log(`✅ Telefono móvil con formato válido: ${valorIngresado}.`);
      }
    });
    return this;
  }

  ingresarDireccion(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Dirección:|')]"
    ).click("bottom");
    cy.focused().type(data);
    cy.log(`✅ Dirección ingresada correctamente: ${data}`);
  }

  ingresarReferenciaDir(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Referencia de direccion:|')]"
    ).click("bottom");
    cy.focused().type(data);
    cy.log(`✅ Referencia de direccion ingresada correctamente: ${data}`);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                             DATOS FINANCIEROS                                      //
  ////////////////////////////////////////////////////////////////////////////////////////
  seleccionarTipoCobro(data) {
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    if (!validacion.campoObligatorio(data, "Tipo de Cobro")) {
      return;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${data}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de cobro seleccionado correctamente: ${data}`);
      }
    });
    return this;
  }

  selectBncOrigen(data) {
    if (!validacion.campoObligatorio(data, "Banco de Origen")) {
      return;
    }

    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Banco de Origen:|arrow_drop_down')]"
    ).click("bottom");
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Banco de Origen seleccionado correctamente: ${data}`);
      }
    });
    return this;
  }

  selectBncDestino(data) {
    if (!validacion.campoObligatorio(fechaNacimiento, "Fecha de Nacimiento")) {
      return;
    }
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Banco de Destino:|arrow_drop_down')]"
    ).click("bottom");
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Banco de Destino seleccionado correctamente: ${data}`);
      }
    });
    return this;
  }

  inputCuenta(data) {
    if (!validacion.campoObligatorio(fechaNacimiento, "Fecha de Nacimiento")) {
      return;
    }
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Cuenta bancaria:|')]"
    ).click("bottom");
    cy.focused().type(data);
    cy.focused().then(($input) => {
      const valorIngresado = $input.val();
      // Solo digitos
      if (!/^\d{1,20}$/.test(valorIngresado)) {
        validationReporter.addError(`⚠️Cuenta bancaria con formato Invalido |`);
        cy.log(`⚠️ La Cuenta bancaria solo puede contener Digitos`);
      } else {
        cy.log(`✅ Cuenta bancaria con formato válido: ${valorIngresado}.`);
      }
    });
    return this;
  }

  selectTipoCuenta(data) {
    if (!validacion.campoObligatorio(fechaNacimiento, "Fecha de Nacimiento")) {
      return;
    }
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Tipo de cuenta:|arrow_drop_down')]"
    ).click("bottom");
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de cuenta seleccionada correctamente: ${data}`);
      }
    });
    return this;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  //                                 DATOS FAMILIARES                                   //
  ////////////////////////////////////////////////////////////////////////////////////////
  agregarFamiliar(data) {
    this.selectTipoDocumentoFml(data);
  }

  selectTipoDocumentoFml(data) {
    cy.xpath(
      "//div[@class='col-md-3 col-xs-12'][contains(.,'Tipo de documento:|Cédulaarrow_drop_down')]"
    ).click();
    cy.log(data);
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`).click();
  }
}
export default FichaPersonalValidation;
