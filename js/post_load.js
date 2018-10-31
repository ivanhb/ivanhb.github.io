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



function build_works(works_list){
  var str_html = '';

  for (var i = 0; i < works_list.length; i++) {
    //str_html = str_html + '<h2 class="ui horizontal header divider">'+ works_list[i]['title'] + '</h2>';
    //str_html = str_html + '<h2 class="ui horizontal header divider fitted">'+works_list[i]['title']+'</h2>';
    str_html = str_html + '<h2 class="ui header"><div class="content work_title">'+works_list[i]['title']+'<div class="sub header work_subtitle">'+works_list[i]['subtitle']+'</div></div></h2>'

    //str_html = str_html + '<h2 class="ui header"><i class="settings icon"></i><div class="content">'+ works_list[i]['title'] +'<div class="sub header">'+works_list[i]['subtitle']+'</div></div></h2>';
    str_html = str_html + works_list[i]['content'] + '</br></br>';
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
    str_menu = str_menu + "<a class='"+active+" item scroll' href='#"+obj_elem['id']+"'>" + elem + "</a>";
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
    str_html = str_html + "<a class='"+active+" item scroll' href='#"+obj_elem['id']+"_top'>" + elem + "</a>";
    active = "";
  }
  return str_html;
}
