var my_config = {

  'entry_section' : {
    'border_pattern': 'img/circle_pattern.png',
    'main_eng_title': "Ivan Heibi's website",
    'intro_eng_text' : `
        This is Ivan Heibi's website, and you will find all the essential info about him in this page ... That's not giving you a lot of detail, is it? So in case you are still here and interested, just move down on this page and check out all the information you want.
        <p>In case you want to ask me for any further info, just feel free to contact me.</p>
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
    'preview_section': {
      'title': "Last work report",
      'id': 'diary',
      //'url': "https://github.com/ivanhb/phd/blob/master/doc/diary.csv",
      'url': 'https://ivanhb.github.io/phd/doc/diary.csv',
      'handle': handle_work_diary
    },
  },

  'bio_section': {
    'title': "A  short  Bio",
    'content': `
      <p> I'm Ivan, a computer scientist and a Ph.D student at the <a class="section_content_link" href="https://www.unibo.it/it">University of Bologna</a> mostly dealing with Semantic web technologies specially in scholarly publishing contexts. I am working under The <a class="section_content_link" href="http://www.ficlit.unibo.it/it">Department of Classic Philology and Italian Studies (FICLIT)</a> and specially involved in the new <a class="section_content_link" href="https://corsi.unibo.it/2cycle/DigitalHumanitiesKnowledge">Digital Humanities course</a>.</p>
      <p>I was born in Israel, my father is arab and my mother is Italian. Luckily, I gained both as mother languages and I like to maintain both the cultures active in my lifestyle. After my high school graduation at the age of 18, I moved to Italy and to the University of Bologna to study computer science, and I have successfully completed my bachelor and master degree.</p>
      <p>On the last year I worked with David Shotton from the University of Oxford, and Silvio Peroni of the University of Bologna as a research fellow under the <a class="section_content_link" href="http://opencitations.net/">OpenCitations project</a>: a scholarly infrastructure organization dedicated to open scholarship and the publication of open bibliographic and citation data by the use of Semantic Web (Linked Data) technologies, and engaged in advocacy for semantic publishing and open citations. My contribution was basically based on studying and developing applications for data visualization and data querying of RDF datasets of scholarly articles/papers. Here you will find a link to my CV in case you want to have more details about me.</p>
      <table width="100%" class="ui celled table"><tbody><tr><td></div></div></td><td><div class="extra_elem"><a class="git_repo_link" target="_blank" href="https://www.slideshare.net/slideshow/embed_code/key/BHStiTN572u9ju"><i class="file big icon"></i> Take a look at my CV</a><div></div></div></td></tr></tbody></table>
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


function handle_work_diary(data) {
  var res_data = {}
  var csv_str = data.data.toString();
  var rows = csv_str.split('\n');

  matrix = []
  for (var i = 0; i < rows.length; i++) {
    matrix.push(rows[i].split(','));
  }

  for (var i = matrix.length-1; i >= 0; i--) {
    if((matrix[i].length != 0) && (matrix[i] != "")) {
      res_data['title'] = matrix[i][0];
      res_data['link'] = matrix[i][1];
      break;
    }
  }

  console.log(res_data);
  var html_data = httpGetAsync(res_data['link'], "res_data['link']", translate_html);
}
function translate_html(data){
  console.log(data);
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
                console.log(list_obj);
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
       switch (elem[0].replace('"','')) {
         case 'twitter':
           obj_elem["a_class"] = "ui circular blue twitter icon button";
           obj_elem["content"] = '<i class="twitter big icon"></i>';
           break;
         case 'facebook':
           obj_elem["a_class"] = "ui circular blue facebook icon button";
           obj_elem["content"] = '<i class="facebook big icon"></i>';
           break;
         case 'git':
           obj_elem["a_class"] = "ui circular blue github icon button";
           obj_elem["content"] = '<i class="github big icon"></i>';
           break;
         case 'linkedin':
           obj_elem["a_class"] = "ui circular blue linkedin icon button";
           obj_elem["content"] = '<i class="linkedin big icon"></i>';
           break;
         default:
           push_it = false;
       }
       obj_elem['href'] = elem[1];
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
       console.log(obj_elem['extra']);
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
