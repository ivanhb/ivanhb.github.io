
var pending = 0;
var PROF_SEC = "";
var SECTIONS_DOM = {};
var SECTIONS_OBJ = {};
var SLIDERS = {};
var SECTIONS_ITEMS_SUITABLE = {}

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
        SECTIONS_OBJ[sec_obj["id"]] = data["items"];

        var str_html = "";
        switch (sec_obj["section_type"]) {
          case "gen-sec":
            str_html = build_sec_dom(sec_obj, data["items"]);
            break;
          case "profile":
            break;
        }
        SECTIONS_DOM[sec_obj["id"]] = str_html;
        if (pending == 0) {
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
function build_page() {
    //Populate the GENRAL SECTION div
    var str_gen_section_str = "";
    for (var sec_id in SECTIONS_DOM) {
        str_gen_section_str = str_gen_section_str + SECTIONS_DOM[sec_id];
    }
    document.getElementById("sections").innerHTML = str_gen_section_str;

    //BUILD Dynamic sections


    /*BUILD slider filters*/
    var add_filter = null;
    if ("add_filter" in my_config) {
      add_filter = my_config["add_filter"]
    }
    if (add_filter) {
      /*First the sections filter*/
      var str_slider_section = "";
      if (Object.keys(SECTIONS_OBJ).length > 1) {
        str_slider_section = str_slider_section + '<div class="slider-filter"><div class="input-label">Section</div><div class="input-slider"><input type="text" id="slider_section" class="slider"></div></div>';
      }
      document.getElementById("sliders").innerHTML = str_slider_section;

      var sec_ids = get_arr_val_from_arr_obj(my_config["section"],"id");
      var sec_lbls = get_arr_val_from_arr_obj(my_config["section"],"section_title");
      var values_map = {};
      for (var i = 0; i < sec_lbls.length; i++) {
        values_map[sec_lbls[i]] = sec_ids[i];
      }
      values_map["All"] = sec_ids;

      SLIDERS["slider_section"] = {
                "slider_obj": new rSlider({
                        target: '#slider_section',
                        values: ["All"].concat(sec_lbls),
                        range: false,
                        set:    null, // an array of preselected values
                        width:    null,
                        scale:    true,
                        labels:   true,
                        tooltip:  true,
                        step:     null, // step size
                        disabled: false, // is disabled?
                        onChange: function change_slider_section() {
                        } // callback
                      }),
                "values_map": values_map,
      }
      build_att_filters();
    }
}

function build_att_filters() {
  //*Now check all the other filters*//
  if ('section_filter' in my_config) {
    for (var k_att in my_config['section_filter']) {
      var selected_lbl = SLIDERS["slider_section"]["slider_obj"].getValue();
      var sec_ids_selected = SLIDERS["slider_section"]["values_map"][selected_lbl];

      SECTIONS_ITEMS_SUITABLE = {};
      for (var i = 0; i < sec_ids_selected.length; i++) {
        SECTIONS_ITEMS_SUITABLE[sec_ids_selected[i]] = [];
        for (var j = 0; j < SECTIONS_OBJ[sec_ids_selected[i]].length; j++) {
          var sec_item = SECTIONS_OBJ[sec_ids_selected[i]][j];
          if (k_att in sec_item) {
            SECTIONS_ITEMS_SUITABLE[sec_ids_selected[i]].push(sec_item);
          }
        }
      }

      console.log(SECTIONS_ITEMS_SUITABLE);
    }
  }
}


/*UTIL*/
function get_arr_val_from_list_obj(obj, val) {
  var arr_res = [];
  for (var k in obj) {
    for (var att in obj[k]) {
      if (att == val) {
        arr_res.push(obj[k][att]);
      }
    }
  }
  return arr_res;
}
function get_arr_val_from_arr_obj(arr_obj, val) {
  var arr_res = [];
  for (var i = 0; i < arr_obj.length; i++) {
    if (val in arr_obj[i]) {
      arr_res.push(arr_obj[i][val]);
    }
  }
  return arr_res;
}
