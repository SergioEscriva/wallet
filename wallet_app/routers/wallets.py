from fastapi import APIRouter
from utilities.wallet import Wallet

wallets = APIRouter()


# wallet
@wallets.get('/wallet/{proprietary}')
def get_wallet(proprietary :int):
    wallets = Wallet().readWallets(proprietary)
    return wallets

@wallets.get('/wallet/id/{wallet_name}')
def get_wallet_id(wallet_name :str):
    wallet = Wallet().walletNameToId(wallet_name)
    return wallet

@wallets.post("/wallet/{wallet_name}/{proprietary}")
def add_wallet(wallet_name :str, proprietary :int):
    wallet = Wallet().addWallet(wallet_name,proprietary)
    return wallet

@wallets.put("/wallet/{name_old}/{name_new}")
def update_wallet(name_old :str, name_new :str):
    wallet = Wallet().updateWallet(name_old, name_new)
    return wallet

@wallets.delete("/wallet/{wallet_id}")
def del_wallet(wallet_id :int):
    wallet = Wallet().deleteWallet(wallet_id)
    return wallet

#description

@wallets.get('/wallet/description/{wallet_id}')
def get_description(wallet_id :int):
    wallets = Wallet().readDescription(wallet_id)
    return wallets

@wallets.put("/wallet/description/{wallet_id}/{description}")
def update_description(wallet_id :int, description :str):
    wallet = Wallet().updateDescription(wallet_id,description)
    return wallet

@wallets.delete("/wallet/description/{wallet_id}")
def del_description(wallet_id :int):
    wallet = Wallet().deleteDescription(wallet_id)
    return wallet

@wallets.put("/wallet/share/{wallet_id}/{share}")
def update_description(wallet_id :int, share :int):
    wallet = Wallet().share(wallet_id,share)
    return wallet


#members
@wallets.get('/wallet/members/{wallet_id}')
def get_members(wallet_id :int):
    wallets = Wallet().membersWallet(wallet_id)#[0]["user_id"]
    return wallets

@wallets.post("/wallet/{wallet_id}/member/{member_name}/{pin}")
def add_member(wallet_id :int, member_name :str, pin :str):
    wallet = Wallet().addMember(wallet_id, member_name, pin)
    return wallet

@wallets.delete("/wallet/{wallet_id}/member/{del_id}")
def del_member(wallet_id :int, del_id :int):
    wallet = Wallet().deleteMember(wallet_id, del_id)
    return wallet

#proprietary

@wallets.put("/wallet/{wallet_id}/proprietary/{proprietary}")
def update_proprietary(wallet_id :int, proprietary :str):
    wallet = Wallet().updateProprietary(wallet_id,proprietary)
    return wallet