var my_config = {

  'section': [
    {
      'id': 'diary',
      'section_title': "Last work report",
      'section_type': 'report',
      'section_class': 'card',
      'url': 'https://ivanhb.github.io/phd/doc/diary.csv'
    },
    {
      'id': 'news',
      'section_title': "News",
      'section_type': 'news',
      'section_class': 'card',
      'max': 2,
      'url': 'https://ivanhb.github.io/phd/doc/news.md'
    },
    {
      'id': 'profile',
      'source': 'https://ivanhb.github.io/data/index/bio.json',
      'section_title': 'About me',
      'section_type': 'profile',
      'section_class': 'profile',
      'normalize': {},
      'layout':{
        "content": ['[[description]]'],
        "extra": ['[[extra]]']
      }
    },
    {
      'id': 'projects',
      'source': 'https://ivanhb.github.io/data/index/project.json',
      'section_title': 'Main Projects',
      'section_type': 'gen-sec',
      'section_class': 'project',
      'normalize': {},
      //define the DOM layout pattern of each entity
      'layout':{
        "title": ['[[name]]'],
        "subtitle": ['[[sub_name]]'],
        "content": ['[[description]]'],
        "extra": ['[[extra]]']
      }
    },
    {
      'id': 'publications',
      'source': 'https://ivanhb.github.io/data/index/publication.json',
      'section_title': 'Publications',
      'section_type': 'gen-sec',
      'section_class': 'publication',
      'normalize': {
        'date': normalize_date,
      },
      //define the DOM layout pattern of each entity
      'layout':{
        "title": ['[[name]]'],
        "extra": ['[[extra]]']
      }
    },
    {
      'id': 'activities',
      'source': 'https://ivanhb.github.io/data/index/activity.json',
      'section_title': 'Activities',
      'section_type': 'gen-sec',
      'section_class': 'activity',
      'normalize': {
        'date': normalize_date_range,
      },
      //define the DOM layout pattern of each entity
      'layout':{
        "title": [
          '<div class="section_label">Event: </div>[[name]]'
        ],
        "subtitle": [
          '<div class="section_label">Location: </div>[[location]]',
          '<div class="section_label">Date: </div>[[date]]',
          '<div class="section_label">Contribution: </div>[[contribution]]'
        ],
        "content": [
          '<div class="section_label">Description </div>[[description]]'
        ],
        "extra": ['[[extra]]']
      }
    }
  ]
}


function normalize_date_range(date_range){
  if (date_range == null) {
    return date_range;
  }
  var date_range_parts = date_range.split("-");
  //console.log(date_range_parts);
  for (var i = 0; i < date_range_parts.length; i++) {
    date_range_parts[i] = normalize_date(date_range_parts[i]);
  }
  var str_splitter = "";
  var str_date_range = "";
  if (date_range_parts.length > 0) {
    str_date_range = date_range_parts[0];
  }
  if (date_range_parts.length > 1) {
    str_date_range = str_date_range + "  to "+ date_range_parts[1];
  }
  return str_date_range;
}
function normalize_date(d) {
  // e.g. 02/15/2017
  const months = {
    "01": "Jan.",
    "02": "Feb.",
    "03": "Mar.",
    "04": "Apr.",
    "05": "May.",
    "06": "Jun.",
    "07": "Jul.",
    "08": "Aug.",
    "09": "Sep.",
    "10": "Oct.",
    "11": "Nov.",
    "12": "Dec."
  };

  var str_date = "";
  if (d != "") {
      var d_parts = d.split("/");
      if(d_parts.length > 1){
        d_parts[1] = months[d_parts[1]];
      }
      for (var i = d_parts.length - 1; i >= 0; i--) {
        str_date = " "+d_parts[i] + str_date;
      }
  }
  return str_date;
}













function handle_news(data) {
  var md_str = data.data.toString();
  var html_content = _translate_it_html();
  update_page({'value':{'subtitle': '','content':html_content.content},'call_param':data.call_param});

  function _translate_it_html() {

    var FROM = data.call_param.ifrom;
    var MAXINLIST = data.call_param.ito;

    var subtitle_list = [];
    var content_list = [];
    var parts = md_str.split("** ");
    parts = parts.filter(function (el) {
        return el != "";
    });

    for (var i = FROM; i < parts.length; i++) {

      if (MAXINLIST == 0) {
        break;
      }

      if (parts[i] != ""){
        var content_parts = parts[i].split('\n');
        subtitle_list.push(content_parts[0]);

        var rest_content = content_parts.slice(1);
        var a_content = "";
        for (var j = 0; j < rest_content.length; j++) {
          a_content = a_content + rest_content[j];
        }
        content_list.push(a_content);
        MAXINLIST = MAXINLIST -1;
      }
    }

    var content_str = "";
    for (var i = 0; i < subtitle_list.length; i++) {
      content_str = content_str + '<p class="prev_subtitle">' + subtitle_list[i] + '<p>' + content_list[i];
    }

    var show_prev_link = 'block';
    var show_next_link = 'block';
    content_str = content_str + "</br></br>";
    if (FROM != 0) {
      content_str = content_str + "<a id='link_next_news' style='display:"+show_next_link+"; float:right' href='javascript:get_preview_data(load_prev=false);'> Most recent news </a>";
    }

    if (data.call_param.ito < parts.length) {
      content_str = content_str + "<a id='link_previous_news' style='display:"+show_prev_link+"; float:left' href='javascript:get_preview_data(load_prev=true);'> Previous news </a>";
    }

    return {'subtitle': subtitle_list, 'content':content_str}

  }
}

function handle_work_diary(data) {
  console.log(data);
  var res_data = {}
  var csv_str = data.data.toString();
  var rows = csv_str.split('\n');

  matrix = []
  for (var i = 0; i < rows.length; i++) {
    matrix.push(rows[i].split(','));
  }

  for (var i = matrix.length-1; i >= 0; i--) {
    console.log(i);
    console.log(matrix[i]);
    if((matrix[i].length != 0) && (matrix[i] != "")) {
      res_data['title'] = matrix[i][0];
      res_data['link'] = matrix[i][1];
      break;
    }
  }
  var html_data = httpGetAsync(res_data['link'], res_data['link'], translate_html, {'time': res_data['title'], 'link': res_data['link'], 'id': data.call_param.id});
}
function translate_html(data){
  var html_content = data.data.toString();
  var subtitle_list = [];

  var myRegexp = /\<h2.*id="(.*?)"\>/g;
	var match = myRegexp.exec(html_content);
	while (match) {
    subtitle_list.push(match[1].replace(new RegExp('-', 'g'), " "));
    html_content = html_content.replace(match[0], "");
    match = myRegexp.exec(html_content);
	}

  var str_content = "";
  for (var i = 0; i < subtitle_list.length; i++) {
    str_content = str_content + "  - "+ subtitle_list[i] +"</br>";
  }
  str_content = str_content + "</br><a id='link_last_workreport' style='float:right' href="+data.call_param['link']+"> Read more on the full report </a>";

  update_page({'value':{'subtitle': data.call_param['time'],'content':str_content},'call_param':data.call_param});
}

//Build a section
function populate_bio_section_contacts() {
  $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "https://ivanhb.github.io/data/contacts.csv",
            dataType: "text",
            success: function(data) {
                //console.log(data);
                var csv_matrix = process_csv_data(data);
                var list_obj = _build_items(csv_matrix);
                call_bk_prof_section(list_obj);
            }
         });
   });

   function _build_items(csv_matrix) {
     var list_obj = [];
     for (var i = 1; i < csv_matrix.length; i++) {
       var elem = csv_matrix[i];
       var obj_elem = {};
       var push_it = true;

       obj_elem["a_class"] = "";
       obj_elem["content"] = "";
       obj_elem['href'] = "";
       switch (elem[0].replace('"','')) {
         case 'twitter':
           obj_elem["a_class"] = "ui circular blue twitter icon button";
           obj_elem["content"] = '<i class="twitter big icon"></i>';
           break;
         case 'facebook':
           obj_elem["a_class"] = "ui circular blue facebook icon button";
           obj_elem["content"] = '<i class="facebook big icon"></i>';
           break;
         /*
         case 'orcid':
             obj_elem["a_class"] = "ui circular blue orcid icon button";
             obj_elem["content"] = '<i class="ai-orcid big icon"></i>';
             break;
         */
         case 'git':
           obj_elem["a_class"] = "ui circular blue github icon button";
           obj_elem["content"] = '<i class="github big icon"></i>';
           break;
         case 'linkedin':
           obj_elem["a_class"] = "ui circular blue linkedin icon button";
           obj_elem["content"] = '<i class="linkedin big icon"></i>';
           break;
         case 'university email':
           obj_elem["a_class"] = "ui circular blue envelope outline icon button";
           obj_elem["content"] = '<i class="envelope outline icon big"></i>';
           obj_elem['href'] = obj_elem['href'] +"mailto:";
           break;
         case 'telegram bot':
           obj_elem["a_class"] = "ui circular blue comment outline icon button";
           obj_elem["content"] = '<i class="comment outline icon big"></i>';
           obj_elem['href'] = obj_elem['href'] +"https://t.me/";

           break;

         default:
           push_it = false;
       }
       obj_elem['href'] = obj_elem['href'] + elem[1].replace('"','');
       if (push_it) {
          list_obj.push(obj_elem);
       }
     }
     return list_obj;
   }
}

function populate_activity_section() {
  $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "https://ivanhb.github.io/data/activity.csv",
            dataType: "text",
            success: function(data) {
                //console.log(data);
                var csv_matrix = process_csv_data(data);
                var list_obj = _build_items(csv_matrix);
                call_bk_section('activities',list_obj);
            }
         });
   });

   function _build_items(csv_matrix) {
     var list_obj = [];
     for (var i = 1; i < csv_matrix.length; i++) {
       var elem = csv_matrix[i];
       var obj_elem = {};

       obj_elem['title'] = [
         {'value':elem[0].replace('"',''), 'label': 'Event: '}
       ];
       obj_elem['subtitle'] = [
         {'value':elem[1], 'label': 'Location: '},
         {'value':elem[2], 'label': 'Date: '},
         {'value':elem[3], 'label': 'Contribution: '},
       ];
       obj_elem['content'] = [
         {'value':elem[4], 'label': 'Description'}
       ];
       obj_elem['extra'] = build_extra_arr_obj(elem[5]);
       list_obj.push(obj_elem);
     }
     return list_obj;
   }
}

function populate_publication_section() {
  //Projects section
  $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "https://ivanhb.github.io/data/publication.csv",
            dataType: "text",
            success: function(data) {
                //console.log(data);
                var csv_matrix = process_csv_data(data);
                var list_obj = _build_publication_elem(csv_matrix);
                call_bk_section('publications',list_obj);
            }
         });
   });

   function _build_publication_elem(csv_matrix) {
     var list_obj = [];
     for (var i = 1; i < csv_matrix.length; i++) {
       var elem = csv_matrix[i];
       var obj_elem = {};

       obj_elem['content'] = [{'value':elem[0].replace('"',''), 'label': ''}];
       obj_elem['extra'] = build_extra_arr_obj(elem[2]);
       list_obj.push(obj_elem);
     }
     return list_obj;
   }
}

function populate_project_section() {
  //Projects section
  $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "https://ivanhb.github.io/data/project.csv",
            dataType: "text",
            success: function(data) {
                //console.log(data);
                var csv_matrix = process_csv_data(data);
                var list_obj = build_project_elem(csv_matrix);
                call_bk_section('projects',list_obj);
            }
         });
   });

   function build_project_elem(csv_matrix) {
     var list_obj = [];
     for (var i = 1; i < csv_matrix.length; i++) {
       var elem = csv_matrix[i];
       var obj_elem = {};

       obj_elem['title'] = [{'value':elem[0].replace('"',''), 'label': ''}];
       obj_elem['subtitle'] = [{'value':elem[1], 'label': ''}];
       obj_elem['content'] = [{'value':elem[2], 'label': ''}];
       obj_elem['extra'] = build_extra_arr_obj(elem[3]);
       list_obj.push(obj_elem);
     }
     return list_obj;
   }
}
