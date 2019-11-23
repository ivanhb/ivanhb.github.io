from bs4 import BeautifulSoup

class Model():

    def __init__(self,in_file):
        self.in_html_path = in_file

    def find_all_g(self):
        f = open(self.in_html_path, 'r')
        parsed_html = BeautifulSoup(f,'lxml')
        f.close()
        return parsed_html.findAll('g')
