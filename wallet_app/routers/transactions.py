from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel
from utilities.transaction import Transaction

class transactionAddDic(BaseModel):
    id: Optional[str] = None
    category: str
    description: str
    amount: float
    user_id: str
    date: Optional[str] = None
    wallet_id: int
    participants: list
    
    
transactions = APIRouter()



#transactions
@transactions.get('/transactions/{wallet_id}')
def get_all_transaction(wallet_id: int):
    transaction = Transaction().transactions(wallet_id)
    return transaction

@transactions.get('/transaction/{transaction_id}')
def get_transaction(transaction_id: int):
    transaction = Transaction().transaction(transaction_id)
    return transaction

@transactions.get('/transaction/balance/{wallet_id}')
def get_balance(wallet_id: int):
    transaction = Transaction().amountTotal(wallet_id)
    return transaction

@transactions.get('/transaction/balance_min/{wallet_id}')
def get_balance_min(wallet_id: int):
    transaction = Transaction().balance(wallet_id)["member_min"]
    return transaction

@transactions.post("/transaction/")
def add_transaction(data_transaction: transactionAddDic):
    data_transaction_dic = data_transaction.dict()
    transaction = Transaction().add(data_transaction_dic)
    return transaction

@transactions.put("/transaction/")
def update_transaction(data_transaction: transactionAddDic):
    data_transaction_dic = data_transaction.dict()
    transaction = Transaction().update(data_transaction_dic)
    return transaction

@transactions.delete("/transaction/{del_id}")
def del_transaction(del_id: int):
    transaction = Transaction().delete(del_id)
    return transaction


