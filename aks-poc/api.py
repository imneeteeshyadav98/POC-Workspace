#!/usr/bin/python
# /bin/bash 
# coding=utf-8
import os, sys
import re
from flask import Flask, jsonify, request
import logging
from logging.handlers import RotatingFileHandler


from werkzeug.wrappers import response
app = Flask(__name__)
app.logger.setLevel(logging.INFO)
app.logger.disabled = False
handler = logging.handlers.RotatingFileHandler("app.log",'a',maxBytes=1024 * 1024 * 100,backupCount=20)
formatter = logging.Formatter(\
	"%(asctime)s - %(levelname)s - %(name)s: \t%(message)s")
handler.setFormatter(formatter)
app.logger.addHandler(handler)

@app.route('/api/v2/microservices1/healthcheckup', methods=["GET","POST"])
def healthcheckup():
	#data=request.headers
	response_data={
		"Success":"200"
		}
	app.logger.info(response_data)
	return jsonify(response_data)

@app.route('/api/v2/microservices1/button/button1', methods=["GET","POST"])
def button1():
	#data=request.headers
	response_data={
		"Success":"Button 1"
		}
	app.logger.info(response_data)
	return jsonify(response_data)

@app.route('/api/v2/microservices1/button/button2', methods=["GET","POST"])
def button2():
	#data=request.headers
	response_data={
		"Success":"Button 2"
		}
	app.logger.info(response_data)
	return jsonify(response_data)
if __name__ == '__main__':
	app.run(host="0.0.0.0",port=80,debug=True) 
