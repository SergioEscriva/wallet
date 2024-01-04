import sqlite3
import os.path
import shutil

class Database():
    def __init__(self):
        self.DB_PATH = "./db/serjav.sqlite"
        #self.DB_PATH = "../db/serjav.sqlite"
        self.DBAK_PATH = "./db/serjav.bak"
        self.connectToDatabase()
    
        
    def fileDatabase(self,file_db):
        #self.DB_PATH = file
        #contents = file_db.read()
    
        print (type(file_db))
        conn = sqlite3.connect(file_db)

    def connectToDatabase(self):
        path_exist = os.path.exists(self.DB_PATH)
        if path_exist == True:
            try:
                shutil.copy(self.DB_PATH, self.DBAK_PATH)
                conn = sqlite3.connect(self.DB_PATH)
                cursor = conn.cursor()
                #hay que cerrar la base en la otra función conn.close()
                self.connection = {"conn":conn , "cursor":cursor}
                return self.connection
            except Exception as e:
                print ("Connect Error",e)
        else:
            print ("Recuperar Backup si está disponible.")
            self.backup()
            self.connectToDatabase()
            
            
    def backup(self):
        path_exist = os.path.exists(self.DBAK_PATH) 
        if path_exist == True:
            try:
                shutil.copy(self.DBAK_PATH, self.DB_PATH)
                self.connectToDatabase()
            except Exception as e:
                return print ("Backup Error:",e)
        else:
            print("Backup no encontrado, creando nueva base de datos.")
            self.createDatabase()
            

    def createDatabase(self):
        conn = sqlite3.connect(self.DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
        CREATE TABLE "transaction" (
        "id"	INTEGER NOT NULL,
        "category"	TEXT,
        "description"	TEXT NOT NULL,
        "amount"	REAL NOT NULL,
        "user_id"	INTEGER NOT NULL,
        "date"	INTEGER NOT NULL,
        "wallet_id"	INTEGER NOT NULL,
        "participants"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )""")
        cursor.execute(
            """
        CREATE TABLE "user" (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL UNIQUE,
    	"nickname"	TEXT NOT NULL UNIQUE,
	    "pin"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )""")
        cursor.execute(
            """
        CREATE TABLE "wallet" (
        "id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL UNIQUE,
        "description"	TEXT,
        "proprietary"	INTEGER NOT NULL,
        "share"	INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY("id" AUTOINCREMENT)
    )""")
        cursor.execute(
            """
        CREATE TABLE wallet_user (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        wallet_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL
    )""")
        cursor.execute(
            """
        CREATE TABLE "category" (
	    "id"	INTEGER NOT NULL UNIQUE,
	    "category"	TEXT NOT NULL UNIQUE,
	    PRIMARY KEY("id" AUTOINCREMENT)
    )""")

        conn.close()
        self.databaseDemo()
        print ("Base de datos creada.")



    def databaseDemo(self):
        conn = sqlite3.connect(self.DB_PATH)
        cursor = conn.cursor()

        cursor.execute("INSERT INTO 'CATEGORY' ('id', 'category') VALUES ('1', 'Gasolina')")
        cursor.execute("INSERT INTO 'main'.'category' ('id', 'category') VALUES ('2', 'Restaurante')")
        cursor.execute("INSERT INTO 'main'.'category' ('id', 'category') VALUES ('3', 'Hostelería')")
        cursor.execute("INSERT INTO 'main'.'category' ('id', 'category') VALUES ('4', 'Supermercado')")
        cursor.execute("INSERT INTO 'main'.'transaction' ('id', 'category', 'description', 'amount', 'user_id', 'date', 'wallet_id', 'participants') VALUES ('3', 'bebida', 'Café', '17.0', '1', '15/10/2022', '1', '3')")
        cursor.execute("INSERT INTO 'main'.'transaction' ('id', 'category', 'description', 'amount', 'user_id', 'date', 'wallet_id', 'participants') VALUES ('2', 'bebida', 'Cola', '25.0', '3', '25/10/2022', '1', '1,3')")
        cursor.execute("INSERT INTO 'main'.'transaction' ('id', 'category', 'description', 'amount', 'user_id', 'date', 'wallet_id', 'participants') VALUES ('1', 'bebida', 'Horchata', '26.0', '1', '28/10/2022', '1', '1,2,3')")
        
        cursor.execute("INSERT INTO 'main'.'user' ('id', 'name', 'nickname', 'pin') VALUES ('3', 'Usuario3', 'Usuario3', '0000')")
        cursor.execute("INSERT INTO 'main'.'user' ('id', 'name', 'nickname', 'pin') VALUES ('2', 'Usuario2', 'Usuario2', '0000')")
        cursor.execute("INSERT INTO 'main'.'user' ('id', 'name', 'nickname', 'pin') VALUES ('1', 'Usuario1', 'Usuario1', '0000')")
        
        cursor.execute("INSERT INTO 'main'.'wallet' ('id', 'name', 'description', 'proprietary', 'share') VALUES ('1', 'Wallet1', 'Wallet de Prueba', '0', '1')")
      
        cursor.execute("INSERT INTO 'main'.'wallet_user' ('id', 'wallet_id', 'user_id') VALUES ('3', '1', '3')")
      
        cursor.execute("INSERT INTO 'main'.'wallet_user' ('id', 'wallet_id', 'user_id') VALUES ('2', '1', '2')")
       
        cursor.execute("INSERT INTO 'main'.'wallet_user' ('id', 'wallet_id', 'user_id') VALUES ('1', '1', '1')")
        conn.commit()
        conn.close()
        
       
        print ("Datos demo creadas.")

#Database().connectToDatabase()
