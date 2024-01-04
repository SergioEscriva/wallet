#!/usr/bin/python
# -*- coding: utf-8 -*-
from utilities.sqlitedb import Database
from utilities.transaction import Transaction
from utilities.wallet import Wallet
from utilities.print import Print

class Settle():
    def __init__(self):
        database = Database()
        self.conn = database.connection["conn"]
        self.cursor = database.connection["cursor"]
        
    def walletTransactions(self,wallet_id):
        transactions = Transaction().transactions(wallet_id)
        all_names = []
        all_names_transaction = []
        for id_transac in transactions:
            participants = id_transac["participants"]
            #participants = participants.split(",")
            name = id_transac["name"]
            amount = id_transac["amount"]
            dats = (name,amount)
            all_names.append(dats)
            for names in participants:
                name = (names,0.0)
                all_names.append(name)
                all_names_transaction.append(all_names)
                members_amounts = {}
                for x in all_names_transaction[0]:
                    members_amounts.setdefault(x[0],[]).append(x[1])
        members_amounts_total = []
        members_balance_total = {}
        for n in members_amounts:
            member_amount = sum(members_amounts[n])
            member_balance_total = {"%s" % n:member_amount}
            members_balance_total.update(member_balance_total)
        #print ("walletTransactions",members_balance_total)
        return members_balance_total
    
    def divisionTransactions(self,wallet_id):
        transactions = Transaction().transactions(wallet_id)
        participants_amount = []
        for transac_one in transactions:
            transaction_one = Settle().namesTransaction(transac_one)
            amounts = Settle().amountPerFriend(transaction_one)
            total_debt = amounts[0]
            amount_per_friend = amounts[1]
            transaction = transaction_one[0]
            participants = transaction_one[1]
            debts = []
            
            for participant,amount in transaction:
                    if amount <=0:
                        debts = (participant, round(amount - amount_per_friend,2) )
                        participants_amount.append(debts)
                    if amount >0:
                        debts = (participant, total_debt )
                        participants_amount.append(debts)
                        
        participants_amounts = {}
        for x in participants_amount:
            participants_amounts.setdefault(x[0],[]).append(x[1])
        participants_balance_total = {}
        
        for n in participants_amounts:
            amount = participants_amounts[n]
            participant_amount = sum(amount)
            participant_balance_total = {"%s" % n:round(participant_amount,2)}
            participants_balance_total.update(participant_balance_total)

        #print ("divisionTransactions",participants_balance_total)
       
        return participants_balance_total
    
    def namesTransaction(self,transaction):
        all_names_transaction = []
        participants = transaction["participants"]
        name = transaction["name"]
        amount = transaction["amount"]
        dats = [(name,amount)]
        for names in participants:
            name = (names,0.0)
            dats.append(name)
            all_names_transaction = dats
        members_total = [all_names_transaction, participants]
        return members_total
    
    def amountPerFriend(self,transaction):
        #transaccion = list(transaccion[0].items())
        # Calculamos la deuda total
        total_debt = sum(friend[1] for friend in transaction[0])
        # Calculamos la cantidad que cada amigo debería pagar
        participants = (transaction[1])
        amount_per_friend = total_debt / len(participants)
        friend_amount = round(total_debt,2), round(amount_per_friend,2)
        return friend_amount
    
                    
                    
    def divisionWallet(self,wallet_id):
        debts = Settle().divisionTransactions(wallet_id)
        pay = [(name, amount) for name, amount in debts.items() if amount <= 0]
        receive = [(name, amount) for name, amount in debts.items() if amount > 0]
        # Ordenamos la lista de los que tienen que pagar de menor a mayor cantidad
        pay.sort(key=lambda x: x[1])
        # Ordenamos la lista de los que tienen que recibir de mayor a menor cantidad
        receive.sort(key=lambda x: x[1], reverse=True)
        # Creamos un diccionario para almacenar las soluciones
        solutions = []
        # Iteramos sobre la lista de los que tienen que pagar
        for payer, amount_pay in pay:
            # Iteramos sobre la lista de los que tienen que recibir
            while abs(amount_pay) > 0:
                amount_pay = round(amount_pay,2)
                for receiver, amount_receive in receive:
                    amount_receive = round(amount_receive,2)
                    # Si el receptor debe recibir más de lo que el pagador tiene que pagar
                    if amount_receive > abs(amount_pay):
                        amount_pay_ini = amount_pay
                        # El pagador paga la cantidad que debe al receptor
                        solutions.append([payer,receiver,abs(amount_pay)])
                        #solutions[f"{payer} paga a {receiver}"] = abs(amount_pay)
                        # Actualizamos la cantidad que el receptor tiene que recibir
                        receive[receive.index((receiver, round(amount_receive,2)))] = (receiver, round(amount_receive + amount_pay,2))
                        # El pagador ya no tiene que pagar nada
                        
                        amount_pay = 0.0
                        pay[pay.index((payer, amount_pay_ini))] = (payer, amount_pay)
                        # Salimos del bucle interno
                        break
                    # Si el receptor debe recibir menos o lo mismo de lo que el pagador tiene que pagar
                    if abs(amount_pay) == 0:
                        # Salimos del bucle interno
                        break
                    if abs(amount_pay) > 0:
                        amount_pay_ini = amount_pay
                        # El pagador paga la cantidad que el receptor tiene que recibir
                        solutions.append([payer,receiver,abs(amount_receive)])
                        #solutions[f"{payer} paga a {receiver}"] = amount_receive
                        # Actualizamos la cantidad que el pagador tiene que pagar
                        amount_pay += amount_receive
                        # El receptor ya no tiene que recibir nada
                        receive.remove((receiver, round(amount_receive,2)))
                        pay[pay.index((payer, amount_pay_ini))] = (payer, round(amount_pay,2))
                        break
                if len(receive) == 0:
                    print ("Deduda sin Saldar--- pagador",pay,"recibe",receive)
                    break
        
        pagos = Settle().walletTransactions(wallet_id)
        solutions_all = solutions ,debts, pagos
        solution = Print().printSolutions(wallet_id, solutions_all)
        #print ("divisionWallet",soluciones_all)
        return solution
        
        
