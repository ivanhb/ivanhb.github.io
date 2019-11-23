from bs4 import BeautifulSoup
import codecs

class Graphml(object):

    OBJECT_PROP_KEY = "@"
    SUBCLASS_KEY = "@isSubclassOf"
    DATATYPES = {
        "string":{"default":""},
        "int":{"default":-1},
        "datetime":{"default":-1},
        "url":{"default":-1}
    }

    def __init__(self, input_file_path):
        self.nodes = []
        self.edges = []
        with codecs.open(input_file_path, 'r', encoding='utf8') as f:
            self.raw = f.read()
            self.soup = BeautifulSoup(self.raw)

    def get_edges(self):
        res = []
        edges = self.find_all("edge",{})
        for e in edges:
            bs_e = BeautifulSoup(str(e))
            res.append({
                "id": bs_e.find("edge")["id"],
                "source": bs_e.find("edge")["source"],
                "target": bs_e.find("edge")["target"],
                "value": bs_e.find("y:edgelabel").contents
            })

        for i in range(0,len(res)):
            str_on_edge = res[i]["value"][0].split(",")[0]
            res[i]["value"] = str_on_edge.replace("\n",";")
        return res

    def get_nodes(self):
        res = []
        nodes = self.find_all("node",{})
        for n in nodes:
            bs_n = BeautifulSoup(str(n))
            res.append({
                "id": bs_n.find("node")["id"],
                "value": "".join(bs_n.find("y:nodelabel").contents)
            })
        return res

    def find_all(self,tag,att):
        return self.soup.findAll(tag,att)


    def normalize_into_owl_formalism(self):
        OWL_GRAPH = {
            "classes": [],
            "datatypes": [],
            "data_properties": [],
            "object_properties": []
        }

        self.nodes = self.get_nodes()
        self.edges = self.get_edges()

        #Classes and Datatypes
        for n in self.nodes:
            if(n["value"][0].isupper()):
                OWL_GRAPH["classes"].append(n)
            else:
                OWL_GRAPH["datatypes"].append(n)

        # Object/Data properties
        obj_props = []
        data_props = []
        for e in self.edges:
            edge_type = "dataProp"
            if(e["value"][0] == self.OBJECT_PROP_KEY):
                edge_type = "objProp"

            e["value"] = e["value"].split(";")
            if edge_type == "dataProp":
                OWL_GRAPH["data_properties"].append(e)
            elif edge_type == "objProp":
                OWL_GRAPH["object_properties"].append(e)

        return OWL_GRAPH


    # JSON Jago index,
    def build_jago_index(self,owl_gr):

        def _find_elem(items_list,att,val):
            for item in items_list:
                if item[att] == val:
                    return item
            return -1

        classes_index = {}
        for c in owl_gr["classes"]:
            classes_index[c["value"]]= {
                "prefix":None,
                "last_id": 0,
                "data_properties": {},
                "object_properties": {}
            }
            #check data properties
            for dp in owl_gr["data_properties"]:
                    if (dp["source"] == c["id"]):
                        for dp_val in dp["value"]:
                            default_value = -1
                            if dp_val in self.DATATYPES:
                                default_value = self.DATATYPES[dp["value"]]
                            classes_index[c["value"]]["data_properties"][dp_val] = default_value

            #check object properties
            for op in owl_gr["object_properties"]:
                    if (op["source"] == c["id"]):
                        for op_val in op["value"]:
                            target_node = _find_elem(owl_gr["classes"],"id",op["target"])
                            classes_index[c["value"]]["object_properties"][op_val] = target_node["value"]

            #define prefix
            pref = c["value"][:2].lower()
            i = 2
            while (pref in index_prefixes):
                pref = pref+c["value"][i].lower()
                i += 1
            index_prefixes[pref] = True
            classes_index[c["value"]]["prefix"] = pref

        return classes_index
