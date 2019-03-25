var my_config = {

  'entry_section' : {
    'border_pattern': 'img/circle_pattern.png',
    'add_img': 'img/cat2.png',
    'main_eng_title': "Ivan Heibi's website",
    'intro_eng_text' : `
      <p>This is Ivan Heibi’s website, Ivan is currently a Phd student at the <a href="https://centri.unibo.it/dharc/en">Digital Humanities Advanced Research Centre (DHARC)</a>, <a href="http://www.ficlit.unibo.it/it">Department of Classical Philology and Italian Studies</a>.
      Here you can find all you need regarding his past, present, and future works. Below this intro there is a preview of the last Phd weekly report made, and the most recent news regarding his subjects of interest.
      <p>Scroll this page and look at his main <a href="#projects_list_top">projects</a>,<a href="#activities_list_top">activities</a>, and <a href="#publications_list_top">publications</a> made. In case you want any further information, don’t hesitate to contact him through any of his social media accounts.
      `,
    'list_menu' : {
      'items': {
        'Page Top':{'href': '#_top', 'default':true},
        'Short Biography':{'href': '#short_bio_top'},
        'Main Projects':{'href': '#projects_list_top'},
        'Publications':{'href': '#publications_list_top'},
        'Activities':{'href': '#activities_list_top'}
      }
    },
    'preview_section':[
      {
        'title': "Last work report",
        'id': 'diary',
        'class': 'web_card',
        //'url': "https://github.com/ivanhb/phd/blob/master/doc/diary.csv",
        'url': 'https://ivanhb.github.io/phd/doc/diary.csv',
        'handle': handle_work_diary
      },
      {
        'title': "News",
        'id': 'news',
        'class': 'web_card',
        'max': 2,
        //'url': "https://github.com/ivanhb/phd/blob/master/doc/diary.csv",
        'url': 'https://ivanhb.github.io/phd/doc/news.md',
        'handle': handle_news
      }
    ]
  },

  'bio_section': {
    'title': "A  short  Bio",
    'content': `
      <p> I'm Ivan, a computer scientist and currently a Ph.D student at the <a class="section_content_link" href="https://www.unibo.it/sitoweb/ivan.heibi2/">University of Bologna</a> mostly dealing with Semantic web technologies in scholarly publishing contexts. I am working at The <a class="section_content_link" href="http://www.ficlit.unibo.it/it">Department of Classic Philology and Italian Studies (FICLIT)</a> and at the <a class="section_content_link" href="https://centri.unibo.it/dharc/en">Digital Humanities Advanced Research Centre (DHARC)</a>.</p>
      <p>I was born in Israel, my father is arab and my mother is Italian. Luckily, I gained both as mother languages and I like to maintain both the cultures active in my lifestyle. After my high school graduation at the age of 18, I moved to Italy and to the University of Bologna to study computer science, and I have successfully completed my bachelor and master degree.</p>
      <p>On the last year I worked with David Shotton from the University of Oxford, and Silvio Peroni of the University of Bologna as a research fellow under the <a class="section_content_link" href="http://opencitations.net/">OpenCitations project</a>: a scholarly infrastructure organization dedicated to open scholarship and the publication of open bibliographic and citation data by the use of Semantic Web (Linked Data) technologies, and engaged in advocacy for semantic publishing and open citations. My contribution was basically based on studying and developing applications for data visualization and data querying of RDF datasets of scholarly articles/papers. Here you will find a link to my CV in case you want to have more details about me.</p>
      <table width="100%" class="ui celled table"><tbody>
        <tr>
        <td>
          <div class="extra_elem"><a class="git_repo_link" target="_blank" href="data/CV-Professional.pdf"><i class="file big icon"></i> Curriculum vitae </a><div>
        </td>
        <td>
          <div class="extra_elem"><a class="git_repo_link" target="_blank" href="data/CV-Europass.pdf"><i class="file big icon"></i> Curriculum vitae (Europass)</a><div>
        </td>
        <td>
          <div class="extra_elem"><a class="git_repo_link" target="_blank" href="https://ivanhb.github.io/phd"><i class="linkify big icon"></i>My Ph.D page</a><div>
        </td>
        <td>
          <div class="extra_elem"><a class="git_repo_link" target="_blank" href="https://ivanhb.github.io/opencitations-doc"><i class="linkify big icon"></i>My OpenCitations page</a><div>
        </td>
        </tr>
      </tbody></table>
    `,
    'target': populate_bio_section_contacts,
    'links':[
    ]
  },

  'section': [
    {
      'id': 'projects',
      'title': 'Main projects',
      'type': 'project',
      'target': populate_project_section,
      'items': [
      ],
    },
    {
      'id': 'publications',
      'title': 'Publications',
      'type': 'publication',
      'target': populate_publication_section,
      'items': [
      ],
    },
    {
      'id': 'activities',
      'title': 'Activities',
      'type': 'activity',
      'target': populate_activity_section,
      'items': [
      ]
    }
  ]
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
