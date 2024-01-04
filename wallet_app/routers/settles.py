from fastapi import APIRouter
from utilities.settle import Settle

settles = APIRouter()


@settles.get('/settle/{wallet_id}')
def get_division(wallet_id: int):
    settle = Settle().divisionWallet(wallet_id)
    return settle
