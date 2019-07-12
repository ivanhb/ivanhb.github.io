
//BUILD SECTIONS
if (my_config['section'] != undefined) {
  pending = my_config['section'].length;
  for (var i = 0; i < my_config['section'].length; i++) {
      get_entities_and_build_sec(my_config['section'][i]);
  }
}

//Check if I am requesting another resource
var myRegexp = /index\.html\?(.*)=(.*)/g;
var groups = myRegexp.exec(String(window.location.href));
var type_req = null;
var res_req = null;
if (groups != null) {
  if (groups.length > 1) {type_req = groups[1];}
  if (groups.length > 2) {res_req = groups[2];}
}

if (type_req != null) {
  handle_req(type_req, res_req, my_config['request']);
}
