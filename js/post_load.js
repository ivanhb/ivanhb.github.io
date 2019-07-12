

var pending = 0;
var PROF_SEC = "";
var SECTIONS_DOM = {};


function build_page() {

    //Populate the GENRAL SECTION div
    var str_gen_section_str = "";
    for (var sec_id in SECTIONS_DOM) {
        str_gen_section_str = str_gen_section_str + SECTIONS_DOM[sec_id];
    }
    document.getElementById("sections").innerHTML = str_gen_section_str;
}

function handle_req(type_req, res_req, request_obj) {
  if (request_obj != undefined) {
    if (type_req in request_obj) {
      var link = request_obj[type_req]["link"];

      if (res_req in request_obj[type_req]["query"]) {
        var fun_to_call = request_obj[type_req]["query"][res_req];
        $.ajax({
            type: "GET",
            url: link,
            dataType: "json",
            success: function(data) {
              console.log(data);
              var redirect_href = Reflect.apply(fun_to_call,undefined,[data]);
              if (redirect_href != -1) {
                window.location.replace(redirect_href);
              }
            }
         });
      }
    }
  }
}

function get_entities_and_build_sec(sec_obj){
  $.ajax({
      type: "GET",
      url: sec_obj["source"],
      dataType: "json",
      error: function() {
        pending -= 1;
      },
      success: function(data) {
        pending -= 1;
        console.log(data);

        var str_html = "";
        switch (sec_obj["section_type"]) {
          case "gen-sec":
            str_html = build_sec_dom(sec_obj, data["items"]);
            break;
          case "profile":
            break;
        }

        console.log(str_html);
        SECTIONS_DOM[sec_obj["id"]] = str_html;
        console.log(pending);
        if (pending == 0) {
          console.log(SECTIONS_DOM);
          build_page();
        }
      }
   });
   //returns the HTML string of all the section
   function build_sec_dom(sec_obj, list_obj){
      const sec_order = ["title","subtitle","content","extra"];

      var layout = sec_obj["layout"];
      var str_list_items = "<div class='"+sec_obj["section_type"]+" "+sec_obj["section_class"]+"'>";

      str_list_items = str_list_items + "<div class='sec-header'>"+sec_obj["section_title"]+"</div>";
      str_list_items = str_list_items + "<div class='sec-body'>";
      for (var i = 0; i < list_obj.length; i++) {
        var an_entity = list_obj[i];
        var str_all_subsec = "";

        //check all sections and build the final HTML string
        for (var j = 0; j < sec_order.length; j++) {
          if(sec_order[j] in layout){
            var str_subsec = "";
            for (var k = 0; k < layout[sec_order[j]].length; k++) {
              var normalized_subsec = layout[sec_order[j]][k];

              //get the list of attributes
              var att = {};
              var re_patt = /\[\[(\w*)\]\]/g;
              var match;
              while((match = re_patt.exec(normalized_subsec)) !== null) {
                  att[match[1]] = an_entity[match[1]];
              }

              if(sec_order[j] != "extra"){
                //replace the values in normalized string
                for (var a_k in att) {
                  var replaced_val = att[a_k];
                  if (replaced_val == null) {
                    replaced_val = "";
                  }
                  if (a_k in sec_obj["normalize"]) {
                    replaced_val = Reflect.apply(sec_obj["normalize"][a_k],undefined,[replaced_val]);
                  }

                  normalized_subsec = normalized_subsec.replace("[["+a_k+"]]", replaced_val);
                }
              }else {
                var extra_str_dom = "";
                for (var a_k in att) {
                  for (var ex_i = 0; ex_i < att[a_k].length; ex_i++) {
                    extra_str_dom = extra_str_dom + _build_extra_item(att[a_k][ex_i]);
                  }
                }
                normalized_subsec = extra_str_dom;
              }

              str_subsec = str_subsec + "<div id="+k+">"+normalized_subsec+"</div>";
            }
            str_all_subsec = str_all_subsec + "<div class="+sec_order[j]+">"+str_subsec+"</div>";
          }
        }
        //add the new entity here
        str_list_items = str_list_items + "<div class='sec-item'>"+str_all_subsec+"</div>";
      }
      str_list_items = str_list_items + "</div>";

      //return an HTML string with a list of all entites
      return str_list_items + "</div>";

      function _build_extra_item(extra_item) {
        var str_extra_item = "";
        switch (extra_item["type"]) {
          case "git_repository":
            return '<a class="item_link" target="_blank"  href="'+extra_item["value"]+'"><i class="github alternate big icon"></i>'+extra_item["label"]+'</a>';
          case "presentation":
            return '<a class="item_link" target="_blank"  href="'+extra_item["value"]+'"><i class="eye big icon"></i>'+extra_item["label"]+'</a>';
          case "document":
            return '<a class="item_link" target="_blank"  href="'+extra_item["value"]+'"><i class="linkify big icon"></i>'+extra_item["label"]+'</a>';
          case "webpage":
            return '<a class="item_link" target="_blank"  href="'+extra_item["value"]+'"><i class="linkify big icon"></i>'+extra_item["label"]+'</a>';
          case "special":
            return '<a class="item_link" target="_blank"  href="'+extra_item["value"]+'"><i class="star big icon"></i>'+extra_item["label"]+'</a>';
        }
      }
   }
}


//utility
function build_extra_arr_obj(a_text) {

  var arr_ext = a_text.split(']],[[')
  var extra_obj_arr = []

  for (var i = 0; i < arr_ext.length; i++) {
    var ex_i = arr_ext[i];
    ex_i = ex_i.replace('[[','');
    ex_i = ex_i.replace(']]','');
    ex_i = ex_i.replace('"','');
    ex_parts_i = ex_i.split(',');

    var type = ex_parts_i[0];
    var type_parts = type.split('_');
    var content = ex_parts_i[1];
    var link = ex_parts_i[2];

    var str_pre = "";
    //<a class="git_repo_link" target="_blank"  href="https://github.com/opencitations/oscar"><i class="github alternate big icon"></i>
    if (type_parts[0]=='link') {
      switch (type_parts[1]) {
        case 'img':
          switch (type_parts[2]) {
            case 'link':
              str_pre = '<a class="git_repo_link" target="_blank"  href="'+link+'"><i class="linkify big icon"></i>'+content+'</a>'
              break;
            case 'star':
              str_pre = '<a class="git_repo_link" target="_blank"  href="'+link+'"><i class="star big icon"></i>'+content+'</a>'
              break;
            case 'eye':
              str_pre = '<a class="git_repo_link" target="_blank"  href="'+link+'"><i class="eye big icon"></i>'+content+'</a>'
              break;
            case 'git':
              str_pre = '<a class="git_repo_link" target="_blank"  href="'+link+'"><i class="github alternate big icon"></i>'+content+'</a>'
              break;
            default:
          }
          break;
        case 'text':
          str_pre = '<a class="git_repo_link" target="_blank"  href="'+link+'">'+content+'</a>'
          break;
        default:

      }
    }


    var ext_obj = {}
    ext_obj['value'] = str_pre;
    ext_obj['class'] = 'extra_elem';
    //build value

    extra_obj_arr.push(ext_obj);
  }
  var final_res = [];
  final_res.push(extra_obj_arr);
  return final_res;
}




function get_preview_data(load_prev = null) {
  var prev_conf = my_config['entry_section'].preview_section;
  for (var i = 0; i < prev_conf.length; i++) {
    var prev_i = prev_conf[i];
    //pending += 1;

    if (!(prev_i.id in ext_calls)) {
        ext_calls[prev_i.id] = {'ifrom': 0,'ito': 2};
        if ('max' in prev_i) {
          ext_calls[prev_i.id] = {'ifrom': 0,'ito': prev_i.max};
        }
    }else {
      var toadd = ext_calls[prev_i.id].ito - ext_calls[prev_i.id].ifrom;
      if (load_prev) {
        ext_calls[prev_i.id].ifrom += toadd;
        ext_calls[prev_i.id].ito += toadd;
      }else {
        ext_calls[prev_i.id].ifrom -= toadd;
        ext_calls[prev_i.id].ito -= toadd;
      }
    }

    httpGetAsync(prev_i.url, prev_i.id, prev_i.handle, call_param = {'id':prev_i.id,'ifrom':ext_calls[prev_i.id].ifrom,'ito':ext_calls[prev_i.id].ito});
  }

  function httpGetAsync(theUrl, key, callback, call_param = null){
  		var xhr = new XMLHttpRequest();
  		xhr.open('GET', theUrl);
  		xhr.onload = function() {
  		    if (xhr.status === 200) {
  						var result = {};
  						result['call_url'] = theUrl;
  						result['key'] = key;
  						result['call_param'] = call_param;
              result['data'] = xhr.responseText
  						Reflect.apply(callback,undefined,[result]);
  		    }
  		    else {
  						var result = {};
  						result['call_url'] = theUrl;
  						result['key'] = key;
  						result['call_param'] = call_param;
  					  result['data'] = null;
  						//call the handle function
  						Reflect.apply(callback,undefined,[result]);
  		    }
  		};
  		xhr.send();
  	}
}
