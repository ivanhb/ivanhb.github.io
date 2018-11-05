var my_config = {
  'main_eng_title': "Ivan Heibi's website",
  'intro_eng_text' : `
      This is Ivan Heibi's website, and you will find all the essential info about him in this page ...
      That's not giving you a lot of detail, is it? So read more about: my Biography, or move to see
      what I am working on, or even check how I like to spend my free time.
      <p>Yes, there's something in there for everyone. Following these links and moving down on this page will led you through all you need to know about me.</p>
    `,

  'intro_arabic_text' : `
"هذا هو موقع إيفان هيبي ، وسوف تجد كل المعلومات الأساسية عنه في هذه الصفحة ... وهذا لا يعطيك الكثير من التفاصيل ، أليس كذلك؟ اقرأ المزيد عن: السيرة الذاتية الخاصة بي هنا ، أو انتقل لرؤية ما أعمل عليه هنا ، أو حتى تحقق من مدى رغبتي في قضاء وقت انتشاري هنا. نعم ، هناك شيء هناك للجميع. بعد هذه الروابط والتنقل في هذه الصفحة ستقودك خلال كل ما تحتاج إلى معرفته عني."
  `,

  'list_menu' : {
    'items': {
      'Page Top':{'href': '#_top', 'default':true},
      'Short Biography':{'href': '#short_bio_top'},
      'Main Projects':{'href': '#works_list_top'},
      'Publications':{'href': '#publications_list_top'},
      'Activities':{'href': '#activities_list_top'}
    }
  },

  'short_bio_title': "A  short  Bio",
  'short_bio': `
      <p> I'm Ivan, a computer scientist and a Ph.D student at the University of Bologna mostly dealing with Semantic web technologies specially in scholarly publishing contexts. I am working under The Department of Classic Philology and Italian Studies with the new Digital Humanities course.</p>
      <p>I was born in Israel, my father is arab and my mother is Italian. Luckily, I gained both as mother languages and I like to maintain both the cultures active in my lifestyle. After my high school graduation at the age of 18, I moved to Italy at to the University of Bologna to study computer science, and I have successfully completed my bachelor and master degree.</p>
      <p>On the last year I worked as a research fellow with the OpenCitations project, specially dealing with data visualization and data querying of RDF datasets of scholarly articles/papers. Here my first steps toward Semantic web technologies began.</p>
  `,

  'works': [
    {
      'title': 'OSCAR',
      'subtitle': 'The general Search Application for Rdf data specially designed for Open Citations',
      'content': `
        A user friendly search platform applicable for any triplestore endpoint.
        This idea came out with regard to the OpenCitations project, which contains an open repository of scholarly citation data in RDF format, we would like to make accesible for any user to search and explore. The current version of the tool is integrated inside the OpenCitations web interface.
        One of the main characteristics of OSCAR is its adaptability to work with any other RDF triplestore. It is possible to configure OSCAR to work with a particular endpoint by configuring a particular JSON document, which specifies how the SPARQL queries are sent to that endpoint, and how the returned query results should be visualized, according to the predefined tabular view that OSCAR provides.
      `,
      'extra':[
        ['','<a class="git_repo_link" style="float:right;" href="https://github.com/opencitations/oscar"><i class="github alternate medium icon"></i> Go to repository</a>']
      ]
    },
    {
      'title': 'LUCINDA',
      'subtitle': 'An RDF data browser Javascript-based application.',
      'content': `
        This idea came out with regard to the OpenCitations project, which contains an open repository of scholarly citation data in RDF format, we would like to make accesible for any user to search and explore. LUCINDA uses OSCAR and its features: which is a general search application for rdf data specially designed for open citations.
        One of the main characteristics of LUCINDA is its adaptability to work with any other RDF triplestore. In order to do that there is a configuration file that could be adopted according to the SPARQL endpoint we wish to integrate.
      `,
      'extra':[
        ['','<a class="git_repo_link" style="float:right;" href="https://github.com/opencitations/lucinda"><i class="github alternate medium icon"></i> Go to repository</a>']
      ]
    },
    {
      'title': 'EMA',
      'subtitle': 'The Email Mining Application',
      'content': `
        A visual web-based framework meant for Email data analysis in digital and forensic investigation. The image legendOnion.png shows the general Framework architecture. Each different analysis will be contained in a unique folder inside the static/ folder. This architecture is meant to be flexible for updates and additional integration of new components and data analysis.
      `,
      'extra':[
        ['','<a class="git_repo_link" style="float:right;" href="https://github.com/ivanhb/EMA"><i class="github alternate medium icon"></i> Go to repository</a>']
      ]
    }
  ],

  'publications': [
    {
      'title': 'Heibi I., Peroni S., Shotton D. (2018) OSCAR: A Customisable Tool for Free-Text Search over SPARQL Endpoints. In: González-Beltrán A., Osborne F., Peroni S., Vahdati S. (eds) Semantics, Analytics, Visualization. SAVE-SD 2017, SAVE-SD 2018. Lecture Notes in Computer Science, vol 10959. Springer, Cham </br><a class="git_repo_link" href="https://doi.org/10.1007/978-3-030-01379-0_9">https://doi.org/10.1007/978-3-030-01379-0_9</a>',
      'doi': 'https://doi.org/10.1007/978-3-030-01379-0_9',
    }
  ],

  'activities': {

    'id': 'activities',
    'items':
      [
        {
            'title': {
              'value': 'The Semantics, Analytics, Visualisation: Enhancing Scholarly Dissemination (SAVE-SD) Workshop co-located with The Web Conference',
              'label': 'Event: '
            },
            'subtitle': [
              {
                'value': 'Lyon, France',
                'label': 'Location: '
              },
              {
                'value': '23 - 27 April 2018',
                'label': 'Date: '
              },
            ],
            'content':{
              'value': `
                  The International World Wide Web Conference Committee (IW3C2), is the organization that manages The Web Conference (former WWW Conference) series. This series aims to provide the world a premier forum for discussion and debate about the evolution of the Web, the standardization of its associated technologies, and the impact of those technologies on society and culture.
              `,
              'label': 'Description'
            }
        }
        //add other items
      ]
  }

}
