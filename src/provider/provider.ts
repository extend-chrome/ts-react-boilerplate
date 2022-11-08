export interface Provider {
    getData(name: string): void
    getName(): string
    getCurrency(): string
    getHost(): string
}