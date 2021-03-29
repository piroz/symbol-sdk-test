import { RepositoryFactoryHttp } from "symbol-sdk"

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
}