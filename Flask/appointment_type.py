from email import message
import os, sys
from sqlite3 import Cursor
import re
from unicodedata import name
from flask import Flask, jsonify, request
import logging
from logging.handlers import RotatingFileHandler
from db import db_connection

from werkzeug.wrappers import response
app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.logger.disabled = False
handler = logging.handlers.RotatingFileHandler("app.log",'a',maxBytes=1024 * 1024 * 100,backupCount=20)
formatter = logging.Formatter(\
	"%(asctime)s - %(levelname)s - %(name)s: \t%(message)s")
handler.setFormatter(formatter)
app.logger.addHandler(handler)

@app.route("/api/v2/microservices1/appointment_type",methods=["GET"])
def appointment_type():
    conn=db_connection()
    cursor=conn.cursor()
    if request.method=="GET":
        cursor.execute("select * from appointment_type")
        appointment_type=[dict(ID=row[0],Appointment_type=row[1]) for row in cursor.fetchall()]
        if appointment_type is not None:
            app.logger.info(appointment_type)
            return jsonify(appointment_type)