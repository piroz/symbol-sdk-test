import { Address, NetworkType, RepositoryFactoryHttp } from "symbol-sdk"

/* eslint no-constant-condition: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-fallthrough: 0 */

addEventListener('message', async (event) => {
    const { host } = event.data;

    const repositoryFactory = new RepositoryFactoryHttp(host)

    const nodeRepository = repositoryFactory.createNodeRepository()

    const accountRepository = repositoryFactory.createAccountRepository()

    const unlockedAccount = (await nodeRepository.getUnlockedAccount().toPromise()).map(raw => {
        return Address.createFromPublicKey(raw, NetworkType.MAIN_NET)
    })

    const accountInfo =  await accountRepository.getAccountsInfo(unlockedAccount).toPromise()

    postMessage(accountInfo);
});