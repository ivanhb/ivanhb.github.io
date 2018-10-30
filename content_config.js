var my_config = {
  'intro_text' : [
    "This is Ivan Heibi's website, and you will find all the essential info about him in this page ...",
    " That's not giving you a lot of detail, is it? So read more about: my Biography here, or move to see ",
    "what I am working on here, or even check how I like to spend my spread time here.",
    "Yes, There's something in there for everyone. Following these links and moving down on this page will led you through all you need to know about me.",
    "<h3 style='font-family: Thabit, serif;'>",
"    هذا هو موقع إيفان هيبي ، وسوف تجد كل المعلومات الأساسية عنه في هذه الصفحة ... وهذا لا يعطيك الكثير من التفاصيل ، أليس كذلك؟ اقرأ المزيد عن: السيرة الذاتية الخاصة بي هنا ، أو انتقل لرؤية ما أعمل عليه هنا ، أو حتى تحقق من مدى رغبتي في قضاء وقت انتشاري هنا. نعم ، هناك شيء هناك للجميع. بعد هذه الروابط والتنقل في هذه الصفحة ستقودك خلال كل ما تحتاج إلى معرفته عني.",
    "</h3>"
  ],

  'fixed_menu' : {
    'items': {
      'Home':{'default':true},
      'University':{},
      'CV':{},
      'Interests':{}
    },
    'position':'right'
  },

  'slide_menu' : {
    'items': {
      'Home':{'default':true},
      'University':{},
      'CV':{},
      'Interests':{}
    }
  },

  'toc_a' : {
    'items': {
      'Home':{'default':true},
      'University':{},
      'CV':{},
      'Interests':{}
    }
  },

  'short_bio_title': "A  short  Bio",
  'short_bio': [
      "<p>",
      "I'm Ivan, a computer scientist and a Ph.D student at the University of Bologna mostly dealing with Semantic web technologies specially in scholarly publishing contexts. I am working under The Department of Classic Philology and Italian Studies with the new Digital Humanities course.",
      "</p>",
      "<p>",
      "I was born in Israel, my father is arab and my mother is Italian. Luckily, I gained both as mother languages and I like to maintain both the cultures active in my lifestyle. After my high school graduation at the age of 18, I moved to Italy at to the University of Bologna to study computer science, and I have successfully completed my bachelor and master degree.",
      "</p>",
      "<p>",
      "On the last year I worked as a research fellow with the OpenCitations project, specially dealing with data visualization and data querying of RDF datasets of scholarly articles/papers. Here my first steps toward Semantic web technologies began.",
      "</p>"
  ],

  'works': [
    {
      'title': 'OSCAR',
      'subtitle': 'The general Search Application for Rdf data specially designed for Open Citations',
      'content': [
        'A user friendly search platform applicable for any triplestore endpoint.',
        'This idea came out with regard to the OpenCitations project, which contains an open repository of scholarly citation data in RDF format, we would like to make accesible for any user to search and explore. The current version of the tool is integrated inside the OpenCitations web interface.',
        'One of the main characteristics of OSCAR is its adaptability to work with any other RDF triplestore. It is possible to configure OSCAR to work with a particular endpoint by configuring a particular JSON document, which specifies how the SPARQL queries are sent to that endpoint, and how the returned query results should be visualized, according to the predefined tabular view that OSCAR provides.'
      ]
    },
    {
      'title': 'LUCINDA',
      'subtitle': 'An RDF data browser Javascript-based application.',
      'content': [
        'This idea came out with regard to the OpenCitations project, which contains an open repository of scholarly citation data in RDF format, we would like to make accesible for any user to search and explore. LUCINDA uses OSCAR and its features: which is a general search application for rdf data specially designed for open citations.',
        'One of the main characteristics of LUCINDA is its adaptability to work with any other RDF triplestore. In order to do that there is a configuration file that could be adopted according to the SPARQL endpoint we wish to integrate.'
      ]
    },
    {
      'title': 'EMA',
      'subtitle': 'The Email Mining Application',
      'content': [
        'A visual web-based framework meant for Email data analysis in digital and forensic investigation. The image legendOnion.png shows the general Framework architecture. Each different analysis will be contained in a unique folder inside the static/ folder. This architecture is meant to be flexible for updates and additional integration of new components and data analysis.'
      ]
    }
  ]


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
