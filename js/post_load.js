
$( ".a_list_menu").replaceWith(build_list(my_config['list_menu'],a_class= "item scroll"));
$(".img_border").replaceWith(build_border_img(my_config['border_pattern']));
$('.an_entry').replaceWith(build_entry(my_config));
$('.a_bio_section').replaceWith(build_bio_section(my_config['bio_section']))
$( ".a_section" ).each(function( i ) {
  if(my_config['section'][i] != undefined){
      $( this ).replaceWith(build_section_skeleton(my_config['section'][i]));
  }
});





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
            <div class="eleven wide column">
              <div class="section_title">`+obj['title']+`</div>
              `+obj['content']+`
            </div>
            <div class="five wide column">
                <img id='pro_img' class="ui medium circular image img-thumbnail img-responsive bordered" rel="foaf:depiction" style="float: left; width: 310px; height: 310px; margin-bottom: 50px;" src="img/prof.jpg">
              <div style="text-align: center;">
              `+list_a+`
              </div>
            </div>
          </div>
        </div>
      </div>`;

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
