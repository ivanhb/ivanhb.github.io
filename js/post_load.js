//build intro content
//document.getElementById("intro_text").innerHtml = "<h3>"+concat_arr_str(my_config['intro_text'])+"</h3>";

//$('.a_list_menu').html(build_list('list_menu'));
$(".img_border").replaceWith(build_border_img(my_config['border_pattern']));

$( ".a_list_menu").replaceWith(build_list('list_menu'));

$('#main_eng_title').html(my_config['main_eng_title']);
$('#intro_eng_version').html(my_config['intro_eng_text']);
//$('#intro_arabic_version').html("<h3>"+concat_arr_str(my_config['intro_arabic_text'])+"</h3>");

$('#short_bio').html(my_config['short_bio']);



$( ".a_section" ).each(function( i ) {
  if(my_config['section'][i] != undefined){
      $( this ).replaceWith(build_section_skeleton(my_config['section'][i]));
  }
});


function build_border_img(img_path){
  return '<img class="ui fluid image" src="'+img_path+'">'
}

function build_menu(menu_type) {
  var str_menu = '<div class="ui container">';
  var closing_str = "";

  if (menu_type == 'fixed_menu') {
    str_menu = '';
    closing_str = "<div class='"+my_config[menu_type]['position']+" menu'></div></div>";
  }
  if (menu_type == 'slide_menu') {
    str_menu = '';
    closing_str = '';
  }
  if (menu_type == 'toc_a') {
    str_menu = '';
    closing_str = '';
  }

  for (var elem in my_config[menu_type]['items']) {
    var active = "";
    var obj_elem = my_config[menu_type]['items'][elem];
    if ('default' in obj_elem) {
      active = "active";
    }
    console.log(elem);
    str_menu = str_menu + "<a class='"+active+" item scroll' href='"+obj_elem['href']+"'>" + elem + "</a>";
    active = "";
  }
  str_menu = str_menu + closing_str;
  return str_menu;
}


function build_list(menu_type) {
  var str_html = '';
  for (var elem in my_config[menu_type]['items']) {
    var active = "";
    var obj_elem = my_config[menu_type]['items'][elem];
    if ('default' in obj_elem) {
      active = "active";
    }
    str_html = str_html + "<a class='"+active+" item scroll' href='"+obj_elem['href']+"'>" + elem + "</a>";
    active = "";
  }
  return str_html;
}


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
