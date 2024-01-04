#!/usr/bin/python
# -*- coding: utf-8 -*-
from utilities.sqlitedb import Database

class Category():
    def __init__(self):
        database = Database()
        self.conn = database.connection["conn"]
        self.cursor = database.connection["cursor"]
        
        
    def categories(self):
            cursor = self.cursor
            conn = self.conn
            cursor.execute("SELECT id,category from 'CATEGORY' ")
            data = cursor.fetchall()
            category_dic = []
            for id, category in data:
                categories = {"id" : id, "category" : category}
                category_dic.append(categories)
            conn.close()
            return category_dic 
        
    def new(self, name_new):
        cursor = self.cursor
        conn = self.conn
        try:
            cursor.execute("INSERT INTO 'CATEGORY' (category) VALUES (?)",(name_new,))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        except:
            conn.close()
            return False

    def update(self, name_old, name_new):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("UPDATE 'CATEGORY' set category = ? WHERE category = ?",(name_new,name_old))
        data = cursor.rowcount
        conn.commit()
        conn.close()
        return True if data == 1 else False

    
    def delete(self, category_id):
        cursor = self.cursor
        conn = self.conn
        cursor.execute("SELECT count(*) from 'CATEGORY' WHERE category = ?",(category_id,))
        category_exist = (cursor.fetchall())[0][0]
        if category_exist == 0:
            cursor.execute("DELETE from 'CATEGORY' WHERE id = ?",(category_id,))
            data = cursor.rowcount
            conn.commit()
            conn.close()
            return True if data == 1 else False
        else:
            conn.close()
            return False      
        
        
#print(Category().new("Autopista"))
#print(Category().update("Autovia","Autopista"))
#print(Category().delete(5))
#print(Category().categories())