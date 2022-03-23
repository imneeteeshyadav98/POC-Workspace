from email import message
import os, sys
from sqlite3 import Cursor
import re
from unicodedata import name
from flask import Flask, jsonify, request
import logging
from logging.handlers import RotatingFileHandler
from db import db_connection
from appointment_type import appointment_type
from werkzeug.wrappers import response
app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.logger.disabled = False
handler = logging.handlers.RotatingFileHandler("app.log",'a',maxBytes=1024 * 1024 * 100,backupCount=20)
formatter = logging.Formatter(\
	"%(asctime)s - %(levelname)s - %(name)s: \t%(message)s")
handler.setFormatter(formatter)
app.logger.addHandler(handler)

@app.route('/', methods=["GET","POST"])
def index():
    if request.method=="GET":
        response_data="Welcome!!!!!!!!!!"
        app.logger.info(response_data)
        return response_data
    else:
        message="Your method is not GET"
        return message

@app.route('/api/v2/microservices1/healthcheckup', methods=["GET","POST"])
def healthcheckup():
    if request.method=="GET" and db_connection():
        response_data={
            "Success":"200"
		        }
        app.logger.info(response_data)
        return jsonify(response_data)
    else:
        response_data={
            "Erro":"404"
		        }
        app.logger.info(response_data)
        return jsonify(response_data)

@app.route("/api/v2/microservices1/doctor_details",methods=["GET"])
def doctor_details():
    conn=db_connection()
    cursor=conn.cursor()
    if request.method=="GET":
        cursor.execute("select * from doctor_details")
        doctor_details=[dict(Name=row[0],Address=row[1],Email=row[2],Gender=row[3],Specialization=row[4],Phone_Number=row[5]) for row in cursor.fetchall()]
        if doctor_details is not None:
            app.logger.info(doctor_details)
            return jsonify(doctor_details)

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

@app.route("/api/v2/microservices1/patient_type",methods=["GET"])
def patient_type():
    conn=db_connection()
    cursor=conn.cursor()
    if request.method=="GET":
        cursor.execute("select * from patient_type")
        patient_type=[dict(ID=row[0],Patient_Type=row[1]) for row in cursor.fetchall()]
        if appointment_type is not None:
            app.logger.info(patient_type)
            return jsonify(patient_type)


@app.route("/api/v2/microservices1/treatment_type",methods=["GET"])
def treatment_type():
    conn=db_connection()
    cursor=conn.cursor()
    if request.method=="GET":
        cursor.execute("select * from treatment_type")
        treatment_type=[dict(ID=row[0],Treatment_Type=row[1]) for row in cursor.fetchall()]
        if treatment_type is not None:
            app.logger.info(treatment_type)
            return jsonify(treatment_type)

if __name__ == '__main__':
	app.run(host="0.0.0.0",port=80,debug=True) 