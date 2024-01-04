#!/usr/bin/python
# -*- coding: utf-8 -*-
import operator
from utilities.sqlitedb import Database
from utilities.wallet import Wallet
from utilities.user import User


class Transaction():
    def __init__(self):
        database = Database()
        self.conn = database.connection["conn"]
        self.cursor = database.connection["cursor"]
    
    def transactions(self,wallet_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT 'TRANSACTION'.id,category,description,amount,user_id,date,nickname,participants from 'TRANSACTION' INNER JOIN 'USER' ON user_id=USER.id WHERE wallet_id = ?",(wallet_id,))
        all_files = cursor.fetchall()
        all_dats = []
        for id,category,description,amount,user_id,date,name,participants in all_files:
            participants = participants.split(',')
            participants_names = []
            for participant in participants:
                participant_name = User().userIdName(participant)
                participants_names.append(participant_name[0]["nickname"])
            participants = participants_names
            dats = {"id":id,"category":category,"description":description,"amount":amount,"user_id":user_id,"date":date,"name":name,"participants":participants}
            all_dats.append(dats)
        conn.close()
        return all_dats

    def transaction(self,transaction_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT category,description,amount,user_id,date,nickname,participants from 'TRANSACTION' INNER JOIN 'USER' ON user_id=USER.id WHERE 'TRANSACTION'.id = ?",(transaction_id,))
        one_file = cursor.fetchall()
        one_transaction = []
        for category,description,amount,user_id,date,name,participants in one_file:
            participants = participants.split(',')
            participants_names = []
            for participant in participants:
                participant_name = User().userIdName(participant)
                participants_names.append(participant_name[0]["nickname"])
            participants = participants_names
            data = {"category":category,"description":description,"amount":amount,"name":name,"user_id":user_id,"date":date,"participants":participants}
            one_transaction.append(data)
        conn.close()
        return one_transaction
    
    def add(self,data_transaction):
        cursor = self.cursor
        conn = self.conn
        participants = ",".join(data_transaction["participants"])
        cursor.execute("INSERT INTO 'TRANSACTION' (category,description,amount,user_id,date,wallet_id,participants) VALUES (?,?,?,?,?,?,?)",(data_transaction["category"],data_transaction["description"],data_transaction["amount"],data_transaction["user_id"],data_transaction["date"],data_transaction["wallet_id"],participants))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False 
        
    
    def update(self,data_transaction):
        cursor = self.cursor
        conn = self.conn
        participants = ",".join(data_transaction["participants"])
        cursor.execute("UPDATE 'TRANSACTION' SET  (category,description,amount,user_id,date,wallet_id,participants) =(?,?,?,?,?,?,?) WHERE id = ?",(data_transaction["category"],data_transaction["description"],data_transaction["amount"],data_transaction["user_id"],data_transaction["date"],data_transaction["wallet_id"],participants,data_transaction["id"]))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False  
    
    def delete(self,trans_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("DELETE from 'TRANSACTION' WHERE id = ?",(trans_id,))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False    
    
    def amountTotal(self,wallet_id):
        data = self.transactions(wallet_id) 
        parcial_amount = []
        for i in range(len(data)):
            dat = (data[i]["amount"])
            parcial_amount.append(dat)

        total_amount = {"amount" : sum(parcial_amount)}

        return total_amount
        
    def balance(self,wallet_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT wallet_id,user_id,nickname FROM 'WALLET_USER' INNER JOIN 'USER' ON user_id=USER.id WHERE wallet_id = ?",(wallet_id,))
        data = cursor.fetchall()
        members_amount = []
        for wallet_id,user_id,name in data: #crea un diccionario con los nombres del wallet
            member = (name, float(0))
            members_amount.append(member)
        
        cursor.execute("SELECT nickname,amount FROM 'TRANSACTION' INNER JOIN 'USER' ON user_id=USER.id  WHERE wallet_id = ?",(wallet_id,))
        transaction_all = cursor.fetchall()
        members_amount+=transaction_all #añade al diccionario de nombres lo que ha pagado cada uno
        # Crea un diccionario con la suma de los gastos totales por nombre
        members_amounts = {}
        
        for x in members_amount:
            members_amounts.setdefault(x[0],[]).append(x[1])
        members_amounts_total = []
        members_balance_total = {}
        for n in members_amounts:
            member_amount = sum(members_amounts[n])
            # Para sacar el que ha pagado menos hay que hacerlo de otra manera
            # va con la linea llamada Opcion 1
            member_min_total = {"member_id":n,"amount":member_amount}
            members_amounts_total.append(member_min_total)
            # Así queda mucho mejor
            member_balance_total = {"%s" % n:member_amount}
            members_balance_total.update(member_balance_total)
        # Opción 1
        member_min = min(members_amounts_total, key=operator.itemgetter("amount"))
        conn.close()
        balance_end = {"member_min":member_min,"all_amounts":members_balance_total,"members_amount":members_amount}
        
        return balance_end
    
