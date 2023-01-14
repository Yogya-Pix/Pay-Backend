class Service {
    constructor(id, providerName, type, service, amount, status) {
        this.id = id;
        this.providerName = providerName;
        this.type = type;
        this.service = service
        this.amount = amount;
        this.status = status;

    }
}

module.exports = Service;