#!/usr/bin/python
# -*- coding: utf-8 -*-
from utilities.sqlitedb import Database

class User():
    def __init__(self):
        database = Database()
        self.conn = database.connection["conn"]
        self.cursor = database.connection["cursor"]
        
        
    def users(self):
            cursor = self.cursor
            conn = self.conn
            cursor.execute("SELECT id,name,nickname from 'USER'")
            data = cursor.fetchall()
            name_users_dic = []
            for id, name in data:
                name_users = {"id" : id, "name" : name, "nickname" : nickname}
                name_users_dic.append(name_users)
            conn.close()
            return name_users_dic 
        
    def new(self, name_new, pin):
        if pin == "undefined":
            pin = "0000"
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT count(*) from 'USER' WHERE name = ? AND pin = ?",(name_new, pin))
        user_exist = (cursor.fetchall())[0][0]
        if user_exist == 0:
            try:
                cursor.execute("INSERT INTO 'USER' (name,nickname,pin) VALUES (?,?,?)",(name_new,name_new,pin))
                data = cursor.rowcount
                conn.commit()
                conn.close()
                return True if data == 1 else False
            except:
                conn.close()
                return False

    def update_nickname(self, name_old, name_new):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'USER' set nickname = ? WHERE nickname = ?",(name_new,name_old))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            conn.close()
            return False
        
    def update_pin(self, pin_old, pin_new, user_id):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'USER' set pin = ? WHERE pin = ? AND id = ?",(pin_new,pin_old,user_id))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            conn.close()
            return False        
    
    def update_user(self, name_old, name_new):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("UPDATE 'USER' set name = ? WHERE name = ?",(name_new,name_old))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            conn.close()
            return False

    
    def delete(self, del_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT count(*) from 'WALLET_USER' WHERE user_id = ?",(del_id,))
        user_exist = (cursor.fetchall())[0][0]
        print(user_exist)
        if user_exist == 0:
            cursor.execute("DELETE from 'USER' WHERE id = ?",(del_id,))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        else:
            conn.close()
            return False      

    def userIdName(self,user_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT id,name,nickname from 'USER' WHERE id = ?",(user_id,))
        data = cursor.fetchall()
        name_dic = []
        for id,name,nickname in data:
            data_name = {"id":id,"name":name, "nickname":nickname}
            name_dic.append(data_name)
        return name_dic
    
    def userNameId(self,user_name):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT name,id,nickname from 'USER' WHERE name = ? OR nickname = ?",(user_name,user_name))
        data = cursor.fetchall()
        id_dic = []
        for name,id, nickname in data:
            data_name = {"name":name,"id":id, "nickname":nickname}
            id_dic.append(data_name)
        return id_dic
    
    def pin(self,user_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT id,pin from 'USER' WHERE id = ?",(user_id,))
        data = cursor.fetchall()
        pin_dic = []
        for id,pin in data:
            data_name = {"id":id,"pin":pin}
            pin_dic.append(data_name)
        return pin_dic