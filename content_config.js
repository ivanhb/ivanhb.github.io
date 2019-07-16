var my_config = {
  'dynamic_section':[
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
    }
  ],
  'profile_section': {
    'id': 'profile',
    'source': 'https://ivanhb.github.io/data/index/bio.json',
    'section_title': 'About me',
    'section_type': 'profile',
    'section_class': 'profile',
    'normalize': {},
    'layout':{
      "content": ['[[description]]']
    }
  },
  'section':[
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
          "title": ['[[reference]]'],
          "subtitle": ['<a href="[[link]]">Go to publication resource</a>']
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
  ],
  'add_filter': true,
  'section_filter': {
    'date': {'label':"Date", 'all_label':"All Dates", "range":true, "normalize": normalize_filter_date, "normalize_lbl": normalize_filter_date, "data_type": "int"}
  },
  'request': {
    'workdiary':{
      'link': "https://ivanhb.github.io/data/index/diary.json",
      'query': {
          'last': last_diary
      }
    }
  }
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
//*must return an array of values*//
function normalize_filter_date(val){
  //05/07/2018
  var res = [];
  var parts = val.split("-");
  for (var i = 0; i < parts.length; i++) {
    var _year = _get_year(parts[i]);
    if (res.indexOf(_year) == -1) {
      res.push(_year);
    }
  }
  return res;
  function _get_year(val_date) {
    var parts = val.split("/");
    return parts[parts.length-1];
  }
}


function last_diary(diary_obj) {
  var items = diary_obj["items"];
  if (items.length > 0) {
    return items[0]["link"]
  }
  return -1;
}
