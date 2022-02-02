#!/usr/bin/python
# /bin/bash 
# coding=utf-8
import os, sys
from sre_constants import SUCCESS
import re
from flask import Flask, jsonify, request
import logging
from logging.handlers import RotatingFileHandler
import requests

from werkzeug.wrappers import response
app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.logger.disabled = False
handler = logging.handlers.RotatingFileHandler("app.log",'a',maxBytes=1024 * 1024 * 100,backupCount=20)
formatter = logging.Formatter(\
	"%(asctime)s - %(levelname)s - %(name)s: \t%(message)s")
handler.setFormatter(formatter)
app.logger.addHandler(handler)

@app.route('/api/v2/microservices2/button/button3', methods=["GET","POST"])
def button3():
	#data=request.headers
	response_data={
		"Sucess":"Button 3"
		}
	app.logger.info(response_data)
	return jsonify(response_data)

@app.route('/api/v2/microservices2/button/button4', methods=["GET","POST"])
def button4():
	#data=request.headers
    #response = requests.get(url="http://192.168.29.197:5000/api/v1/button/button3")
    #print(response)
    response_data={
        "Success":"Button 4"
        }
    #response_data.update(response.json())
    app.logger.info(response_data)
    return jsonify(response_data)

@app.route('/api/v2/microservices2/button/button5', methods=["GET","POST"])
def button5():
	#data=request.headers
    res= requests.get(url="http://52.160.88.32:5000//api/v2/microservices1/button/button2")
    print(res)
    response_data={"response":[{"Success":"Button 5"}]}
    #response_data={[{"Success":"Button 5"}]}
    response_data["response"].append(res.json())
    print(response_data)
    #response_data.update(response.json())
    print(response_data)
    app.logger.info(response_data)
    return jsonify(response_data)
if __name__ == '__main__':
	app.run(host="0.0.0.0",port=5000,debug=True) 


