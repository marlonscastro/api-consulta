import { badRequest, HttpResponse, notFound, ok, unauthorized } from "@/data/helpers/http";
import { BuscaCidadaoNominalCriminalUseCase } from "@/domain/use-cases/criminal/busca-cidadao-nominal";
import { ViewBuscarCidadao } from "@/view/cidadao";
import { Controller } from "@/data/controllers/controller";

type HttpRequest = any
type Model = Error | ViewBuscarCidadao[]

export class BuscaCidadaoNominalCriminalController extends Controller {
    constructor(
        private readonly buscaCidadaoNominal: BuscaCidadaoNominalCriminalUseCase) {
        super()
    }

    validate = (params: any): boolean => {
        const parametrosPermitidos: string[] = ['v_sNome', 'v_sNomeMae', 'v_sNomePai']
        let valid = true
        Object.keys(params).map(i => {
            if (!parametrosPermitidos.find(item => item === i)) {
                valid = false
            }
        })
        return valid
    }

    async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
        if (Object.keys(params).length === 0) {
            return badRequest({
                name: 'badRequest',
                message: 'Você tem que enviar ao menos um desses atributos: v_sNome, v_sNomeMae ou v_sNomePai!'
            })
        }
        if (!this.validate(params)) {
            return badRequest({
                name: 'ParametroInválido',
                message: 'Existem parâmetros inválidos na requisição!'
            })
        }

        try {
            const cidadao = await this.buscaCidadaoNominal.execute(params)
            if (cidadao.length === 0) {
                return notFound()
            }
            return ok(cidadao)
        } catch (error) {
            console.log(error.message)
            return unauthorized()
        }
    }
}