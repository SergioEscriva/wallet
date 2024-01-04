import { WalletManager } from './WalletManager.js'

window.addEventListener('load', async () => {
    const walletManager = new WalletManager()
    await walletManager.init()
})