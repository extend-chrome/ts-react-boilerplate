import {Provider} from "./provider";
import {Search} from "../model/search";
import {Data} from "../model/data";
import {Size} from "../model/size";

export class Perfumehub implements Provider {
    private name = 'perfumehub.pl'
    private currency = 'zł'
    private host = 'https://perfumehub.pl'
    private apiHost = 'https://extension.isedo.pl'
    private period = '365'

    getData(name: string): Promise<Data> {
        const options = {
            method: "GET",
        };

        return fetch(this.apiHost + '/search/' + this.name + '/' + name, options)
            .then((response) => response.json())
            .then((data) => Object.assign(new Search(), data))
            .then((search) => this.getPrices(search))
    }

    getPrices(search: Search): Promise<Data>
    {
        const options = {
            method: "GET",
        };
        return fetch(this.apiHost + '/proxy/' + this.name + search.path, options)
            .then((response) => response.json())
            .then((data) => Object.assign(new Data(), data))
            .then((data) => data)
    }

    getPriceHistory(params: Size): Promise<any> {
        const options = {
            method: "GET",
        };
        return fetch(this.apiHost + '/price-history/' + this.name + '?' +
            new URLSearchParams({
                size: String(params.size),
                brand: params.brand,
                line: params.line,
                gender: params.gender,
                type: params.type,
                tester: String(params.tester),
                isSet: String(params.set),
                period: this.period
            })
            , options)
            .then((response) => response.json())
    }

    getName(): string {
        return this.name
    }

    getCurrency(): string {
        return this.currency
    }

    getHost(): string {
        return this.host
    }
}