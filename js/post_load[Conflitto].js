

var pending = 0;
var ext_calls = {}
populate_config_file();

var resource_iri = null;
var myRegexp = /index\.html\?(.*)=(.*)/g;
var groups = myRegexp.exec(String(window.location.href));

var type_req = null;
var res_req = null;
if (groups != null) {
  if (groups.length > 1) {type_req = groups[1];}
  if (groups.length > 2) {res_req = groups[2];}
}

function build_page() {
    $( ".a_list_menu").replaceWith(build_list(my_config['entry_section']['list_menu'],a_class= "item scroll"));
    $(".img_border").replaceWith(build_border_img(my_config['entry_section']['border_pattern']));
    $('.an_entry').replaceWith(build_entry(my_config['entry_section']));
    if ('preview_section' in my_config['entry_section']) {
        get_preview_data();
    }

    $('.a_bio_section').replaceWith(build_bio_section(my_config['bio_section']))
    $( ".a_section" ).each(function( i ) {
      if(my_config['section'][i] != undefined){
          $( this ).replaceWith(build_section_skeleton(my_config['section'][i]));
      }
    });
    if (type_req != null) {
      handle_req(res_req, type_req);
    }
}

function populate_config_file() {

  if (my_config['bio_section'] != undefined) {
      var a_target_fun = my_config['bio_section']['target'];
      if (a_target_fun != undefined) {
        pending += 1;
        Reflect.apply(a_target_fun,undefined,[]);
      }
  }

  if (my_config['section'] != undefined) {
    for (var i = 0; i < my_config['section'].length; i++) {
      var a_target_fun = my_config['section'][i]['target'];
      if (a_target_fun != undefined) {
        pending += 1;
        Reflect.apply(a_target_fun,undefined,[]);
      }
    }
  }
}

function call_bk_prof_section(items) {
      my_config['bio_section'].links = items;
      pending -= 1;
      if (pending == 0) {
        build_page();
      }
}

function call_bk_section(id,items) {
  for (var i = 0; i < my_config['section'].length; i++) {
    if (my_config['section'][i].id == id){
      my_config['section'][i].items = items;
    }
  }

  //console.log(my_config['section']);

  pending -= 1;
  if (pending == 0) {
    build_page();
  }
}

function build_border_img(img_path){
  return '<div class="img_border"><img class="ui fluid image" src="'+img_path+'"></div>'
}

function build_add_img(img_path){
  return '<div class="add_img"><img class="add_inner_img" src="'+img_path+'"></div>'
}

function build_entry(my_config){
  var str_html = '<h1 id="main_eng_title" class="ui inverted header" style="margin-top: 1em;">'+my_config['main_eng_title']+'</h1>';
  str_html = str_html + "<h3 class='intro_eng_version'>"+my_config['intro_eng_text']+"</h3>";


  str_html = str_html + "<div class='cards_section'>";
  str_html = str_html + build_add_img(my_config['add_img']);
  if ('preview_section' in my_config) {
      for (var i = 0; i < my_config.preview_section.length; i++) {
        var ele_obj = my_config.preview_section[i];

        var class_str = "";
        if ('class' in ele_obj) {
          class_str = ele_obj['class'];
        }

        str_html = str_html + '<div id="preview_card_'+ele_obj.id+'" class="ui card '+class_str+'"><div class="content"><div class="header"><h2>'+ele_obj.title+'</h2></div><div class="meta"><span id="prev_subtitle_'+ele_obj.id+'">Time</span><p id="prev_content_'+ele_obj.id+'"> ...</p></div><p></p></div></div>';
      }
  }
  return str_html+"</div>";
}
function get_preview_data(load_prev = null) {
  var prev_conf = my_config['entry_section'].preview_section;
  for (var i = 0; i < prev_conf.length; i++) {
    var prev_i = prev_conf[i];
    pending += 1;

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
}

function build_list(obj, a_class= "") {
  var str_html = '';
  for (var elem in obj['items']) {
    var active = "";
    var obj_elem = obj['items'][elem];
    if ('default' in obj_elem) {
      active = "active";
    }
    str_html = str_html + "<a class='"+active+" "+a_class+"' href='"+obj_elem['href']+"'>" + elem + "</a>";
    active = "";
  }
  return str_html;
}

function build_section(section_obj){
  var str_html = '';

  //all other html elemnts

  if (!('items' in section_obj)) {
    return str_html;
  }

  var items = section_obj['items'];
  for (var i = 0; i < items.length; i++) {

    str_html = str_html + "<div class='section_item'>";

    //Title
    str_html = str_html + gen_html_entry(items[i],'title');

    //subtitle
    str_html = str_html + gen_html_entry(items[i],'subtitle');

    //content
    str_html = str_html + gen_html_entry(items[i],'content');

    //Extra
    str_html = str_html + gen_html_entry(items[i],'extra');


    str_html = str_html + "</div>";
  }
  return str_html;


  function gen_html_entry(obj,field) {
    var str_html = "";

    if (field == 'extra') {
      if (field in obj) {
        str_html = str_html +'<table width="100%" class="ui celled table section_extra"><tbody>';
        for (var j = 0; j < obj['extra'].length; j++) {
          var extra_row = obj['extra'][j];
          str_html = str_html +'<tr>';

          for (var k = 0; k < extra_row.length; k++) {
            var row_elem = extra_row[k]['value'];
            str_html = str_html +'<td>';
            str_html = str_html+'<div class="'+extra_row[k]['class']+'">'+row_elem+'<div>';
            str_html = str_html +'</td>';
          }

          str_html = str_html +'</tr>';
        }
        str_html = str_html +'</tbody></table>';
      }
    }else {
        var end_index = 1;
        if (field in obj) {
          var arr_obj = [obj[field]];
          if (obj[field] instanceof Array) {
            end_index = obj[field].length;
            arr_obj = obj[field];
          }
          for (var j = 0; j < end_index; j++) {
                str_html = str_html + gen_html_elem(arr_obj,j,'label',field = field);
                str_html = str_html + gen_html_elem(arr_obj,j,'value',field = field);
          }
        }
      }
    return str_html;
  }

  function gen_html_extra(obj,index,value,field='content') {
    var str_html = "<div>";

    return str_html;
  }

  function gen_html_elem(obj,index,value,field='content') {
    var str_html = "";
    if (!(index in obj)) {
      str_html = "";
    }else if (!(value in obj[index])) {
      str_html = "";
    }else {
      var str_val = obj[index][value];
      var add_class = "";
      if ('class' in obj[index]) {
        add_class = obj[index]['class'];
      }
      str_html = '<div class="section_'+value+' section_'+field+' '+add_class+'">'+str_val+'</div>';
    }
    return str_html;
  }
}

function build_section_skeleton(section_obj) {
  str_html = `
      <div id="`+section_obj['id']+`_list_top" class="ui vertical stripe segment">
        <div class="mobile_section_title">`+section_obj['title']+`</div>
        <div class="ui middle aligned stackable grid container">
          <div class="row">
          <div class="section_vertical_title_container">
            <div class="section_vertical_title">`+section_obj['title']+`</div>
          </div>
            <div class="fourteen wide column">
              `+build_section(section_obj)+`
            </div>
          </div>
        </div>
      </div>
  `;
  return str_html;
}

function build_bio_section(obj) {
  var list_a = "";
  if ('links' in obj) {
    for (var i = 0; i < obj['links'].length; i++) {
      list_a = list_a + "<a class='"+obj['links'][i]['a_class']+"' href='"+obj['links'][i]['href']+"'>" + obj['links'][i]['content'] + "</a>";
    }
  }

  return `
      <div id="short_bio_top" class="ui vertical stripe segment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">

            <div class="my_bio wide column">
              <div class="section_title">`+obj['title']+`</div>
              <div class="bio_body">
                  <div class="bio_content">`+obj['content']+`</div>
                  <div class="bio_side">
                      <img id='pro_img' class="ui circular image img-thumbnail bordered" rel="foaf:depiction" src="img/prof.jpg">
                      <div class="bio_extra_elem" style="text-align: center;">`+list_a+`</div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>`;

}

function handle_req() {
  //console.log(res_req, type_req);
  switch (type_req) {
    case 'workdiary':
      if (res_req == 'last') {
        document.getElementById("link_last_workreport").click();
      }
      break;
    default:

  }
}


function update_page(data) {
  pending -= 1;
  document.getElementById("prev_subtitle_"+data.call_param.id).innerHTML = "<h3>"+data.value.subtitle+"</h3>";
  document.getElementById("prev_content_"+data.call_param.id).innerHTML = data.value.content;
  handle_req();
}


//UTIL
function concat_arr_str(arr_str){
  var concatter = "";
  var spanner = " ";
  for (var i = 0; i < arr_str.length; i++) {
    if ( i == arr_str.length - 1) {
      spanner = "";
    }
    concatter = concatter + arr_str[i] + spanner;
  }
  return concatter;
}

//utility
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
function process_csv_data(allText) {
    var record_num = 5;  // or however many elements there are in each row
    var all_rows = allText.split('\n');

    for (var i = 0; i < all_rows.length; i++) {
      if (all_rows[i].length != 0) {

        console.log(all_rows[i][all_rows[i].length - 1]);
        all_rows[i] = all_rows[i].slice(1,all_rows[i].length - 2);
        console.log(all_rows[i]);

        all_cells_i = all_rows[i].split('","');

        var last_str = all_cells_i[all_cells_i.length -1];
        all_rows[i] = all_cells_i;
      }
    }
    return all_rows;
}
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
