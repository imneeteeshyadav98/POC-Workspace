FROM zneetesh/logrotate
WORKDIR /app
COPY log.py /app
EXPOSE 5000 80
ENTRYPOINT ["python3"]
CMD ["log.py"]
