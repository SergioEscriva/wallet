import { UserManager } from './UserManager.js'

window.addEventListener('load', async () => {
    const usermanager = new UserManager()
    await usermanager.initialiting()
    //const walletManager = new WalletManager()
    //await walletManager.init()
})