require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../utils/validationReporter";
class FichaPersonalPage {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);
  }

  crearFichaPersonalBasica(datos) {
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
    cy.log(`✅ Ficha Personal creada Correctamente ✅`);
    cy.wait(1000);
  }

  crearFichaPersonalCompleta(datos) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addEmpleado')]").click();
    cy.wait(1000);

    //Datos Basicos
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    this.seleccionarTipoDeDocumento(datos.basicos.tipoDocumento);
    this.ingresarNumeroDeCedula(datos.basicos.cedula);
    this.ingresarNombre(datos.basicos.nombres);
    this.ingresarApellido(datos.basicos.apellidos);
    this.ingresarCorreoIntitucional(datos.basicos.emailInstitucional);
    this.ingresarCorreoPersonal(datos.basicos.emailPersonal);
    this.ingresarCodigoIESS(datos.basicos.codigoIESS);
    this.seleccionarSexo(datos.basicos.sexo);
    this.seleccionarEstadoCivil(datos.basicos.estadoCivil);
    this.seleccionarFechaDeNacimiento(datos.basicos.fechaNacimiento);
    this.seleccionarEmpleadoSustituto(datos.basicos.sustitutoPCD);
    this.seleccionarDiscapacidad(datos.basicos.discapacidad);
    this.seleccionarEstudios(datos.basicos.estudios);
    this.ingresarProfecion(datos.basicos.profesion);
    this.ingresarPorcentajeAnticipo(datos.basicos.porcentajeAnticipoQuincena);
    this.seleccionarFoto(datos.basicos.foto);

    //Datos de Ubicacion
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    this.seleccinoarRegion(datos.ubicacion.ubi_1.region);
    this.seleccionarRecidencia(datos.ubicacion.ubi_1.tipoRecidencia);
    this.seleccionarProvincia(datos.ubicacion.ubi_1.provincia);
    this.seleccinoarCiudad(datos.ubicacion.ubi_1.ciudad);
    this.ingresarTelfFijo(datos.ubicacion.ubi_1.telefonoConvencional);
    this.ingresarTelfMovil(datos.ubicacion.ubi_1.telefonoMovil);
    this.ingresarDireccion(datos.ubicacion.ubi_1.direccion);
    this.ingresarReferenciaDir(datos.ubicacion.ubi_1.referenciaDireccion);

    //Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    this.seleccionarTipoCobro(datos.financieros.cuenta_1.tipoCobro);
    this.selectBncOrigen(datos.financieros.cuenta_1.bancoOrigen);
    this.selectBncDestino(datos.financieros.cuenta_1.bancoDestino);
    this.inputCuenta(datos.financieros.cuenta_1.cuentaBancaria);
    this.selectTipoCuenta(datos.financieros.cuenta_1.tipoCuenta);

    //Datos Familiares
    cy.xpath(
      "//div[@class='q-tab-label'][contains(.,'Datos familiares')]"
    ).click();

    const cantidad = Number(datos.familiares.cantidadFamiliares);
    for (let i = 1; i <= cantidad; i++) {
      const cuenta = datos.financieros[`.cuenta_${i}`];
      cy.xpath(
        "//button[@tabindex='0'][contains(.,'person_addAgregar familiar')]"
      ).click();
      this.agregarFamiliar(cuenta);
    }

    // //Guardar FichaPersonal
    // cy.xpath("(//div[contains(.,'Guardar')])[39]").click();
    // cy.log(`✅ Ficha Personal creada Correctamente ✅`);
    // cy.wait(1000);
  }

  buscarFichaPorCedula(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'Sin contratos')]").click();
    cy.wait(500);
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      `${dataEmpleado.cedula}{enter}`
    );
  }

  eliminarFichaPersonal() {
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Eliminar ficha personal')])[16]").click();
    cy.xpath("//i[@aria-hidden='true'][contains(.,'arrow_back')]").click();
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
        cy.log(`⚠️ La cédula solo puede contener 10 Digitos`);
      } else {
        cy.log(`✅ Cédula con formato válido: ${valorIngresado}.`);
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

  seleccionarEstadoCivil(data) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Estado civil:|arrow_drop_down')]"
    ).click();

    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${data}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Estado civil seleccionado correctamente: ${data}`);
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
    // Validar edad mínima - si falla, no continuar
    const edadValida = this.validarEdadMinima(fechaNacimiento, 16);
    if (!edadValida) {
      cy.log(
        `🚨 Fecha de nacimiento Invalida - no se procederá con la selección`
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
    cy.log(`✅ Fecha de Nacimiento seleccionada correctamente`);
    return this;
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
    // Validar que el campo reciba un valor
    if (!data || data.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de cobro" vacío |`);
      cy.log(`❌ El campo "Tipo de cobro" es requerido y no puede estar vacío`);
      return this;
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
    // Validar que el campo reciba un valor
    if (!data || data.trim() === "") {
      validationReporter.addError(`❌Campo "Banco de Origen" vacío |`);
      cy.log(
        `❌ El campo "Banco de Origen" es requerido y no puede estar vacío`
      );
      return this;
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
    // Validar que el campo reciba un valor
    if (!data || data.trim() === "") {
      validationReporter.addError(`❌Campo "Banco de Destino" vacío |`);
      cy.log(
        `❌ El campo "Banco de Destino" es requerido y no puede estar vacío`
      );
      return this;
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
    // Validar que el campo reciba un valor
    if (!data || data.trim() === "") {
      validationReporter.addError(`❌Campo "Cuenta bancaria" vacío |`);
      cy.log(
        `❌ El campo "Cuenta bancaria" es requerido y no puede estar vacío`
      );
      return this;
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
    // Validar que el campo reciba un valor
    if (!data || data.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de cuenta" vacío |`);
      cy.log(
        `❌ El campo "Tipo de cuenta" es requerido y no puede estar vacío`
      );
      return this;
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

  ////// HELPERS ////////
  validarEdadMinima(fechaNacimiento, edadMinima = 16) {
    // fechaNacimiento debe estar en formato 'YYYY-MM-DD'
    if (!fechaNacimiento) {
      validationReporter.addError("La fecha de nacimiento es requerida |");
      cy.log("🚨 La fecha de nacimiento es requerida");
      return false;
    }

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
export default FichaPersonalPage;
