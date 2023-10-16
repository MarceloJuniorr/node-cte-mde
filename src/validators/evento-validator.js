'use strict'

const { EVENTOS } = require('../env')

class EventoValidator {
  /**
   *
   * @param {Object} evento
   * @param {210200 | 210210 | 210220 | 210240} evento.tipoEvento
   * @param {string} [evento.justificativa]
   */
  constructor(evento) {
    const { tipoEvento, justificativa } = evento

    this.tipoEvento = tipoEvento
    this.justificativa = justificativa
    this.error = ''
  }

  isValid() {

    if (!this.tipoEvento) {
      this.error = 'Tipo Evento não informado.'
      return false
    }

    if (!EVENTOS[this.tipoEvento]) {
      this.error =
        'Tipo Evento deve conter um dos valores: 210200, 210210, 210220 ou 210240'
      return false
    }

    if (Number(this.tipoEvento) === 210240) {
      if (!this.justificativa) {
        this.error = 'Justificativa não informada.'
        return false
      }

      if (this.justificativa.length < 15 || this.justificativa.length > 255) {
        this.error = 'Justificativa com tamanho incorreto.'
        return false
      }
    }

    const { tpEvento, descEvento } = EVENTOS[this.tipoEvento]

    this.tpEvento = tpEvento
    this.descEvento = descEvento

    return true
  }

  getValues() {
    return {
      justificativa: this.justificativa,
      tpEvento: this.tpEvento,
      descEvento: this.descEvento,
    }
  }

  getError() {
    return this.error
  }
}

module.exports = Object.freeze(EventoValidator)
