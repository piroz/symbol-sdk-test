export class NodeService {

    async getUnlockedAccountInfo(host) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./worker.js", {type: 'module'})

            worker.onmessage = (e) => {
                resolve(e.data)
            }

            worker.onmessageerror = (e) => {
                console.log(e)
                reject(e)
            }

            worker.onerror = (e) => {
                console.log(e)
                reject(e)
            }
    
            worker.postMessage({host})
        })
    }
}