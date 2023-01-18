from bs4 import BeautifulSoup

class BSParser():

    def __init__(self,in_file, url):
        self.in_html_path = in_file
        self.url = url

    def get_keywords(self):
        list_keywords = self.find_tag("meta", {'name':'keywords'})
        if list_keywords == None:
            return []
        return list_keywords["content"].split(", ")

    def get_date(self):
        a_date = self.find_tag("meta", {'name':'updated'})
        if a_date == None:
            return []
        l = a_date["content"][0:10].split("-")
        return l[2]+"/"+l[1]+"/"+l[0]

    def get_source(self):
        return self.url;

    def find_tag(self, tag, my_attrs):
        f = open(self.in_html_path, 'r')
        parsed_html = BeautifulSoup(f)
        f.close()
        return parsed_html.find(tag,  attrs= my_attrs)
