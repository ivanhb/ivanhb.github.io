import json

class Report(object):

    def __init__(self, model_path, type, report_path):
        self.type = type
        self.report_path = report_path

        self.model_path = model_path;
        self.model_index_path = model_path+"/index.json"
        self.model_index = json.load(open(self.model_index_path))
        self.report_class_def = self.__get_report_def()
        self.report_repository_path = self.__get_file_repository()

    def __get_report_def(self):
        if "Report" in self.model_index["class"]:
            return self.model_index["class"]["Report"]
        return None


    def __get_file_repository(self, key= "Report", tree= []):
        tree.append(key.lower())
        if "@isSubclassOf" not in self.report_class_def:
            strpath = ""
            for elem in tree:
                strpath = "/"+elem + strpath
            return self.model_path+"/src"+strpath+".json"
        else:
            _get_report_repository(self.report_class_def["@isSubclassOf"],tree)

    def add_entry(self, repo_entry):
        #-- id
        new_id = self.report_class_def["last_id"] + 1
        #-- attributes
        list_att = list(self.report_class_def["attribute"].keys())
        if "attribute" in repo_entry:
            for k in repo_entry["attribute"]:
                list_att.remove(k)
        if not(len(list_att) == 0):
            return "Not all attributes are included!"
        #-- relations
        list_rel = list(self.report_class_def["relation"].keys())
        if "relation" in repo_entry:
            for k in repo_entry["relation"]:
                list_rel.remove(k)
        if not(len(list_rel) == 0):
            return "Not all relations are included!"

        # write results on files
        obj_to_write = {}
        obj_to_write["id"] = new_id
        obj_to_write["attribute"] = repo_entry["attribute"]
        obj_to_write["relation"] = repo_entry["relation"]
        repository_file = json.load(open(self.report_repository_path))
        repository_file["items"].append(obj_to_write)
        with open(self.report_repository_path, 'w') as json_file:
            json.dump(repository_file, json_file)

        # update model index
        self.model_index["class"]["Report"]["last_id"] = new_id
        with open(self.model_index_path, 'w') as json_file:
            json.dump(self.model_index, json_file)
