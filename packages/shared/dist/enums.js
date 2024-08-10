"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESTATUS_CITA = exports.ESTADO_CIVIL = exports.GENERO = void 0;
var GENERO;
(function (GENERO) {
    GENERO["MASCULINO"] = "Masculino";
    GENERO["FEMENINO"] = "Femenino";
    GENERO["OTRO"] = "Otro";
})(GENERO || (exports.GENERO = GENERO = {}));
var ESTADO_CIVIL;
(function (ESTADO_CIVIL) {
    ESTADO_CIVIL["SOLTERO"] = "Soltero";
    ESTADO_CIVIL["CASADO"] = "Casado";
    ESTADO_CIVIL["CONCUBINATO"] = "Concubinato";
    ESTADO_CIVIL["DIVORCIADO"] = "Divorciado";
    ESTADO_CIVIL["VIUDO"] = "Viudo";
})(ESTADO_CIVIL || (exports.ESTADO_CIVIL = ESTADO_CIVIL = {}));
var ESTATUS_CITA;
(function (ESTATUS_CITA) {
    ESTATUS_CITA["EN_ESPERA"] = "En espera";
    ESTATUS_CITA["EN_CONSULTA"] = "En consulta";
    ESTATUS_CITA["FINALIZADA"] = "Finalizada";
    ESTATUS_CITA["PAGADA"] = "Pagada";
    ESTATUS_CITA["EXONERADA"] = "Exonerada";
    ESTATUS_CITA["CANCELADA"] = "Cancelada";
})(ESTATUS_CITA || (exports.ESTATUS_CITA = ESTATUS_CITA = {}));
