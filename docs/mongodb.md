# 数据库操作命令 #

## 基本操作 ##
	> use db
		switched to db db

	> show collections
		accounts
		applicants
		classifications
		companies
		jobs
		media
		messages
		wxusers

## 导出 ##

	mongoexport -h 127.0.0.1 -p 27017 -d db -c classifications --type json -o D:\github\yimiwan\docs\classifications.json

## 导出 ##

	mongoimport -h 127.0.0.1 -p 27017 -d db -c classifications --type json --file /home/github/yimiwan/docs/classifications.json