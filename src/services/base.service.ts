import axios from "axios";

const fs = require('fs');
const path = require('path');

export default class BaseService {

    protected async isEthereumAddress(addressList) {
        const { wrongAddresses, correctAddresses } = addressList.reduce(
        (acc, address) => {
            if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                acc.correctAddresses.push(address);
            } else {
                acc.wrongAddresses.push(address);
            }
            return acc;
        },
        { wrongAddresses: [], correctAddresses: [] }
        );
        
        return { wrongAddresses, correctAddresses };
    }

    public async getSimplePrice(id: string, currencies: string) {
        const parameters = `ids=${id}&vs_currencies=${currencies}`;
        const url = process.env.COIN_GECKO_SIMPLE_PRICE_URL;

        try {
            const response = await axios.get(`${url}${parameters}`);
            return response.data || false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async findMatchingAddressesFromJson (correctAddresses) {
        const filePath = path.join(__dirname, '../..', 'ethereumBalance.json');

        return new Promise((resolve, reject) => { 
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                const walletList = JSON.parse(data).wallets;
                const ethereumWallets = walletList.filter(item => correctAddresses.includes(item.address));

                resolve(ethereumWallets);
            });
        });
    }
}