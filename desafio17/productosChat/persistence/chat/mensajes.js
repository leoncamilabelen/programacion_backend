export class Mensajes {
    constructor(author, texto) {
        this.author = author
        this.texto = texto
    }
    static mensajeDesdeDto(dto) {
        const mensaje = [];

        dto.map((e) => {
            const msj = new Mensajes(e.author, e.texto)
            mensaje.push(msj)
        })
        return mensaje
    }

    mensajeADto() {
        const { author, texto } = this
        return {
            author,
            texto
        }
    }
}