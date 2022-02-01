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

@app.route('/button1', methods=["GET","POST"])
def button1():
	#data=request.headers
	host=request.host
	url=request.base_url
	method=request.method
	path=request.full_path
	response_data={
		"Host":host,
		"URL":url,
		"Method":method,
		"Path":path,
		}
	app.logger.info(response_data)
	return jsonify(response_data)

@app.route('/button2', methods=["GET","POST"])
def button2():
	#data=request.headers
	host=request.host
	url=request.base_url
	method=request.method
	path=request.full_path
	response_data={
		"Host":host,
		"URL":url,
		"Method":method,
		"Path":path,
		}
	app.logger.info(response_data)
	return jsonify(response_data)
if __name__ == '__main__':
	app.run(host="0.0.0.0",port=5000,debug=True) 
