
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

if (type_req != null) {
  handle_req(res_req, type_req);
}else {
  $( ".a_list_menu").replaceWith(build_list(my_config['list_menu'],a_class= "item scroll"));
  $(".img_border").replaceWith(build_border_img(my_config['border_pattern']));
  $('.an_entry').replaceWith(build_entry(my_config));
  $('.a_bio_section').replaceWith(build_bio_section(my_config['bio_section']))
  $( ".a_section" ).each(function( i ) {
    if(my_config['section'][i] != undefined){
        $( this ).replaceWith(build_section_skeleton(my_config['section'][i]));
    }
  });
}



function populate_config_file() {
  //Projects section
  $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "https://ivanhb.github.io/data/project.csv",
            dataType: "text",
            success: function(data) {
                //console.log(data);
                csv_matrix = process_csv_data(data);
                console.log(csv_matrix);
                build_project_elem(csv_matrix);
            }
         });
   });

   function build_project_elem(csv_matrix) {
     var list_obj = [];
     for (var i = 1; i < csv_matrix.length; i++) {
       var elem = csv_matrix[i];
       var obj_elem = {};
       obj_elem['title'] = elem[0];
       obj_elem['subtitle'] = elem[1];
       obj_elem['content'] = elem[3];
       //obj_elem['extra'] = build_extra_arr_obj(elem[4]);
       console.log(obj_elem);
     }
   }
}

function build_border_img(img_path){
  return '<div class="img_border"><img class="ui fluid image" src="'+img_path+'"></div>'
}


function build_entry(my_config){
  var str_html = '<h1 id="main_eng_title" class="ui inverted header" style="margin-top: 1em;">'+my_config['main_eng_title']+'</h1>';
  str_html = str_html + "<h3 class='intro_eng_version'>"+my_config['intro_eng_text']+"</h3>";
  return str_html;
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

function handle_req(res, type) {
  switch (type) {
    case 'lib':
      switch (res) {
        case 'badge':
          break;
        default:
      }
      break;
    default:

  }
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

function process_csv_data(allText) {
    var record_num = 5;  // or however many elements there are in each row
    var all_rows = allText.split('\n');

    for (var i = 0; i < all_rows.length; i++) {
      all_cells_i = all_rows[i].split('","');
      all_rows[i] = all_cells_i;
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
    ex_parts_i = ex_i.split(',');

    var ext_obj = {}
    ext_obj['type'] = ex_parts_i[0];
    ext_obj['value'] = ex_parts_i[1];
    ext_obj['link'] = ex_parts_i[2];
    extra_obj_arr.push(ext_obj);
  }

  return extra_obj_arr;
}
