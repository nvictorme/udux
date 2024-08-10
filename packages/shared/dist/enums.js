"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CITA = exports.ESTADO_CIVIL = exports.GENERO = void 0;
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
var STATUS_CITA;
(function (STATUS_CITA) {
    STATUS_CITA["EN_ESPERA"] = "En espera";
    STATUS_CITA["EN_CONSULTA"] = "En consulta";
    STATUS_CITA["FINALIZADA"] = "Finalizada";
    STATUS_CITA["PAGADA"] = "Pagada";
    STATUS_CITA["EXONERADA"] = "Exonerada";
    STATUS_CITA["CANCELADA"] = "Cancelada";
})(STATUS_CITA || (exports.STATUS_CITA = STATUS_CITA = {}));
