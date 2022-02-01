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


@app.route('/api/v1/button/button3', methods=["GET","POST"])
def button3():
	#data=request.headers
	response_data={
		"Sucess":"Button 3"
		}
	app.logger.info(response_data)
	return jsonify(response_data)

@app.route('/api/v1/button/button4', methods=["GET","POST"])
def button4():
	#data=request.headers
	response_data={
		"Success":"Button 4"
		}
	app.logger.info(response_data)
	return jsonify(response_data)
if __name__ == '__main__':
	app.run(host="0.0.0.0",port=5000,debug=True) 
