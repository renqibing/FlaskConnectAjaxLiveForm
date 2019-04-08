import csv
import os

basedir = os.path.abspath(os.path.dirname(__file__))
data_dir = basedir + '\\static\\data\\countriesData.csv'

def read_lines(page_number):
    file = open(data_dir)
    csv_file = csv.reader(file)
    next(csv_file)
    lines = [line for line in csv_file]
    file.close()
    return [lines[5*(page_number-1)+i] for i in range(0, min(5, len(lines)-5*(page_number-1)))]

def get_table_lenth():
    file = open(data_dir)
    csv_file = csv.reader(file)
    lines = [line for line in csv_file]
    file.close()
    return len(lines)

def write_lines(line):
    file = open(data_dir, 'a', newline='')
    csv_writer = csv.writer(file, dialect='excel')
    csv_writer.writerow(line)
    file.close()
    pass
