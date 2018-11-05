//build intro content
//document.getElementById("intro_text").innerHtml = "<h3>"+concat_arr_str(my_config['intro_text'])+"</h3>";

//$('.a_list_menu').html(build_list('list_menu'));
$( ".a_list_menu").replaceWith(build_list('list_menu'));

$('#main_eng_title').html(my_config['main_eng_title']);
$('#intro_eng_version').html(my_config['intro_eng_text']);
//$('#intro_arabic_version').html("<h3>"+concat_arr_str(my_config['intro_arabic_text'])+"</h3>");

$('#short_bio').html(my_config['short_bio']);

$('#works_list').html(build_works(my_config['works']));
$('#works_list').addClass('works_content');

$('#publications_list').html(build_publications(my_config['publications']));

$('#activities_list').html(build_section(my_config['activities']));


function build_works(works_list){
  var str_html = '';

  for (var i = 0; i < works_list.length; i++) {
    //Title + Content
    str_html = str_html + '<h2 class="ui header"><div class="content work_title">'+works_list[i]['title']+'<div class="sub header work_subtitle">'+works_list[i]['subtitle']+'</div></div></h2>';
    str_html = str_html + works_list[i]['content'] + '</br></br>';

    //Extra
    if ('extra' in works_list[i]) {
      str_html = str_html +'<table width="100%" class="ui celled table"><tbody>';
      for (var j = 0; j < works_list[i]['extra'].length; j++) {
        var extra_row = works_list[i]['extra'][j];
        str_html = str_html +'<tr>';

        for (var k = 0; k < extra_row.length; k++) {
          var row_elem = extra_row[k];
          str_html = str_html +'<td>';
          str_html = str_html+row_elem;
          str_html = str_html +'</td>';
        }

        str_html = str_html +'</tr>';
      }
      str_html = str_html +'</tbody></table>';
    }
  }
  return str_html;
}

function build_publications(publications_list){
  var str_html = '';

  for (var i = 0; i < publications_list.length; i++) {
    //Title + Content
    str_html = str_html + '<div class="publication_title">'+publications_list[i]['title']+'</div>';

    //Extra
    if ('extra' in publications_list[i]) {
      str_html = str_html +'<table width="100%" class="ui celled table"><tbody>';
      for (var j = 0; j < publications_list[i]['extra'].length; j++) {
        var extra_row = publications_list[i]['extra'][j];
        str_html = str_html +'<tr>';

        for (var k = 0; k < extra_row.length; k++) {
          var row_elem = extra_row[k];
          str_html = str_html +'<td>';
          str_html = str_html+row_elem;
          str_html = str_html +'</td>';
        }

        str_html = str_html +'</tr>';
      }
      str_html = str_html +'</tbody></table>';
    }
  }
  return str_html;
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

    //Title
    str_html = str_html + gen_html_entry(items[i],'title');

    //subtitle
    str_html = str_html + gen_html_entry(items[i],'subtitle');

    //content
    str_html = str_html + gen_html_entry(items[i],'content');

    //Extra

  }
  return str_html;


  function gen_html_entry(obj,field) {
    var str_html = "";
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
      str_html = '<div class="section_'+value+' section_'+field+'">'+str_val+'</div>';
    }
    return str_html;
  }
}
