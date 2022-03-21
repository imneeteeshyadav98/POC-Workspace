from sqlite3 import Cursor
from venv import create
import pymysql
# from healthcheckup import healthcheckup
# conn = pymysql.connect(
#         host="flaskdatabase.cczllozqgewl.us-east-1.rds.amazonaws.com", #endpoint link
#         port = 3306, # 3306
#         user ="admin", # admin
#         password ="redhat1234567", #adminadmin 
#         db = "chatbot", #test
#         )
# mydb=conn.cursor()


def db_connection():
        conn = pymysql.connect(
                host="flaskdatabase.cczllozqgewl.us-east-1.rds.amazonaws.com", #endpoint link
                port = 3306, # 3306
                user ="admin", # admin
                password ="redhat1234567", #adminadmin 
                db = "chatbot", #test
        )
        return conn
# mydb=db_connection()
# mydb1=mydb.cursor()
# mydb1.execute("show databases")
# for x in mydb1:
#         print(x)



# mycursor.execute("CREATE DATABASE mydatabase")





# def db_connection():

# mydb.execute("CREATE TABLE doctor_details (name VARCHAR(255), address VARCHAR(255),email VARCHAR(200),gender VARCHAR(20),specialization VARCHAR(200),phone_number VARCHAR(10))")

# mydb.execute("DROP tables doctor_name")
# mydb.execute("DROP TABLE chatbot.doctor_name")
# mydb.execute("SHOW TABLES")
# for x in mydb:
#     print(x)


# sql="insert into doctor_details (name,address,email,gender,specialization,phone_number) VALUES(%s,%s,%s,%s,%s,%s)"
# val=("Neetesh","MMIG C-146 Aashiyana Phase-1 moradabad","neeteeshyadav98@gmail.com","M","Emergency Doctor",7839426854)
# mydb.execute(sql,val)
# conn.commit()
# print(mydb.rowcount, "record inserted")