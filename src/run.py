from flask import Flask, render_template, request,session
from flask import jsonify
import json
import csv
import os
from src.read_csv import write_lines,read_lines,get_table_lenth

app = Flask(__name__)
app.config['SECRET_KEY'] = "dfdfdffdad"
basedir = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/name', methods=['POST'])
def getname():
    data_dir = basedir + '\\static\\data\\countriesData.csv'
    countryname = request.form['countryname']
    seriesname = request.form['seriesname']
    d2010 = request.form['d2010']
    d2011 = request.form['d2011']
    d2012 = request.form['d2012']
    d2013 = request.form['d2013']
    d2014 = request.form['d2014']
    data = (countryname,seriesname,d2010,d2011,d2012,d2013,d2014)
    # print(data)
    write_lines(data)

    d = {'countryname': countryname, 'seriesname': seriesname}
    print(data)
    return jsonify(d)


@app.route('/getpage/<int:page_id>')
def getpage(page_id):

    table = [('Country Name', 'Series Name', '2010', '2011', '2012', '2013', '2014')]
    raw_lines = read_lines(page_id)
    lines = []

    for line in raw_lines:
        lines.append([line[0],line[2]]+line[-5:-1]+[line[-1]])
        # print(line[-1])
    table += lines
    data = json.dumps(table)
    # print(data)
    return data


@app.route('/getlength')
def get_length():
    length = get_table_lenth()
    len_dic = {'length':length}
    print(len_dic)
    return jsonify(json.dumps(len_dic))

if __name__ == '__main__':
    app.run(debug = True)
