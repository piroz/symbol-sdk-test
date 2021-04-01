import { Address, NetworkType, RepositoryFactoryHttp } from "symbol-sdk"

import nodes from "./node.json"

export class NodeService {
    constructor() {
        this.nodes = nodes
    }

    async search(searchParameter) {
        
        return await Promise.all(
            this.nodes.map(n => new RepositoryFactoryHttp(n).createNodeRepository())
            .map(async(rep, idx, array) => {
                const peers = (await rep.getNodePeers().toPromise()).filter(p => p.host.indexOf(searchParameter) >= 0)
                return {apiNode: array[idx].url, friendlyName: array[idx].url.replace(".symbolblockchain.io:3000", "").replace("http://", ""), peers: peers}
            })
        )
    }

    async getUnlockedAccountInfo(host) {
        const repositoryFactory = new RepositoryFactoryHttp(host)
        const nodeRepository = repositoryFactory.createNodeRepository()
        const accountRepository = repositoryFactory.createAccountRepository()
        const unlockedAccount = (await nodeRepository.getUnlockedAccount().toPromise()).map(raw => {
            return Address.createFromPublicKey(raw, NetworkType.MAIN_NET)
        })
        const accountInfo =  await accountRepository.getAccountsInfo(unlockedAccount).toPromise()
        return accountInfo
    }
}