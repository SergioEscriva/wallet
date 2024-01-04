#!/usr/bin/python
# -*- coding: utf-8 -*-
from utilities.sqlitedb import Database
from utilities.user import User


class Wallet():
    
    def __init__(self):
        database = Database()
        self.conn = database.connection["conn"]
        self.cursor = database.connection["cursor"]
    #### WALLETS
     
    def walletNameToId(self,wallet_name):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT name,id from 'WALLET' WHERE name = ?",(wallet_name,))
        data = cursor.fetchall()
        wallets_dic = []
        for name,id in data:
            wallets_name = {"name":name,"id":id}
            wallets_dic.append(wallets_name)
        return wallets_dic
        
        
        return wallet_id_name
      
    def walletIdToName(self,wallet_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT id,name from 'WALLET' WHERE id =?",(wallet_id,))
        data = cursor.fetchall()
        wallets_dic = []
        for id,name in data:
            wallets_name = {"id":id,"name":name}
            wallets_dic.append(wallets_name)
        conn.close()
        return wallets_dic
     
    def readWallets(self,proprietary):
        cursor = self.cursor
        conn = self.conn
        prop = (f"%{proprietary}%")
        cursor.execute("SELECT WALLET.id,wallet_id,name,WALLET.description,proprietary,user_id,share FROM 'WALLET' INNER JOIN 'WALLET_USER' ON WALLET.id=wallet_id WHERE proprietary=? OR (WALLET_USER.user_id=(?) AND share=1)",(str(proprietary), str(proprietary)))
        data = cursor.fetchall()
        nueva_lista = []
        wallets_dic = []
        data_final = []
        # Elimina duplicados
        for ids,null,null,null,null,null,null in data:
             if not ids in nueva_lista:
                 nueva_lista.append(ids)
        # Selecciona los wallet en propiedad y participados con sus datos.
        for id_selected in nueva_lista:
            cursor.execute("SELECT id,name,description,proprietary,share FROM 'WALLET' WHERE id=?",(id_selected,))
            data = cursor.fetchall()
            for id,name,description,proprietary,share in data: 
                wallets_name = {"id":id,"name":name,"description":description,"proprietary":proprietary,"share":share}
                wallets_dic.append(wallets_name) 
                data_final.append(data)
        conn.close()
        return wallets_dic

    def addWallet(self,wallet_name,proprietary):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("INSERT INTO 'WALLET' (name,proprietary) VALUES (?,?)",(wallet_name,proprietary))
            data = cursor.rowcount
            conn.commit()
            return True if data == 1 else False
        except:
            return False
        
    def updateWallet(self, name_old, name_new):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'WALLET' set name = ? where name = ?",(name_new,name_old))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            return False
        
    def share(self,wallet_id,share):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'WALLET' set share = ? where id=?",(share,wallet_id))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            return False        
        
        
    def deleteWallet(self,wallet_id):
            cursor = self.cursor
            conn = self.conn
            try:
                cursor.execute("DELETE from 'WALLET' WHERE id = ?",(wallet_id,))
                data = cursor.rowcount
                conn.commit()
                if data == True :
                    cursor.execute("DELETE FROM 'TRANSACTION' WHERE wallet_id =?",(wallet_id,))
                    conn.commit()
                    cursor.execute("DELETE FROM 'WALLET_USER' WHERE wallet_id =?",(wallet_id,))
                    conn.commit()
                    return True if data == 1 else False
                return True if data == 1 else False
                conn.close()
            except:
                return False
            
    #### proprietary
    def updateProprietary(self, wallet_id, proprietary_name):
        proprietary = User().userNameId(proprietary_name)[0]["id"]
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'WALLET' set proprietary = ? where id = ?",(proprietary,wallet_id))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            return False        
    
    #### DESCRIPTIONS
    
    def readDescription(self,wallet_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT description from 'WALLET' WHERE id = ?",(wallet_id,))
        data = cursor.fetchall()
        conn.close()
        return data
        

    
    def updateDescription(self,id,description):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("UPDATE 'WALLET' set (description) = ? where id = ?",(description,id))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False
    
    
        
    def deleteDescription(self,wallet_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("UPDATE 'WALLET' set description = NULL where id = ?",(wallet_id,))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False
    
    
    
    #### MEMBERS

    def membersWallet(self,wallet_id):
            cursor = self.cursor
            conn = self.conn
            cursor.execute("SELECT wallet_id,user_id,name,nickname FROM 'WALLET_USER' INNER JOIN 'USER' ON user_id=USER.id WHERE wallet_id = ?",(wallet_id,))
            data = cursor.fetchall()
            members = []
            for wallet_id,user_id,name,nickname in data:
                member = {"wallet_id":wallet_id,"user_id":user_id,"name":name, "nickname":nickname}
                members.append(member) #["user_id"]para que poner el wallet?, aquí quitado
            conn.close()
            return members
    
    def addMember(self ,wallet_id, member_name, pin):
        if pin == "undefined":
            pin = "0000"
        User().new(member_name, pin)
        id_user = User().userNameId(member_name)
        id_user = id_user[0]["id"]
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT count(*) from 'WALLET_USER' WHERE wallet_id = ? AND user_id = ?",(wallet_id,id_user))
        user_exist = cursor.fetchall()
        if user_exist[0][0] == 0:
            cursor.execute("INSERT INTO 'WALLET_USER' (wallet_id,user_id) VALUES (?,?)",(wallet_id,id_user))
            conn.commit()
            conn.close()
            return True
        conn.close()
        return False
    
    def deleteMember(self,wallet_id,del_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT participants from 'TRANSACTION' WHERE wallet_id = ?",(wallet_id,))
        all_files = cursor.fetchall()
        participant_count = False
        participant_list = []
        for participants in all_files:
            participant = participants[0].split(',')
            if str(del_id) in participant:
                participant_count = True
        cursor.execute("SELECT count(user_id) from 'TRANSACTION' WHERE user_id = ? AND wallet_id = ?",(del_id,wallet_id))
        member_exist = (cursor.fetchall())[0][0]
        if member_exist == 0 and participant_count == False:
            cursor.execute("DELETE from 'WALLET_USER' WHERE wallet_id = ? AND user_id = ?",(wallet_id,del_id))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        else:
            conn.close()
            return False