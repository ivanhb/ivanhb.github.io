//var website_homepage = "https://ivanhb.github.io/website/"
var website_homepage = "https://ivanhb.it/website/"
var my_config = {
    //**  /request/
    'query':{
          'lastreport':{
              'format': ['html'],
              'data': "https://ivanhb.it/edu/index/diary.json",
              'handler': last_report
          }
     },
     'format': {
          'html':{'handler': handle_html},
          'csv':{'handler': handle_csv},
          'json':{'handler': handle_json},
      }
}



function handle_url(str_url){
  var url = new URL(str_url);
  var params = new URLSearchParams(url.search);

  var dict_params = [];
  for(var pair of params.entries()) {
    var dict_elem = {}
    dict_elem[pair[0]] = pair[1];
    dict_params.push(dict_elem);
  }
  console.log(dict_params);

  if (dict_params.length == 0) {
    window.location.replace(website_homepage);
  }else {
    var i_query = check_list_dict(dict_params,"query");
    if (i_query != -1) {
      var param_val = dict_params[i_query]["query"];
      if(param_val in my_config['query']){
        var param_obj = my_config['query'][param_val];

        //check the format
        var format = param_obj.format[0];
        var i_format = check_list_dict(dict_params,"format");
        if (i_format != -1) {
          var format_val = dict_params[i_format]["format"];
          if (param_obj.format.indexOf(format_val) != -1) {
            format = format_val;
          }
        }

        Reflect.apply(param_obj.handler,undefined,[param_obj.data,format]);
      }else {
          alert("Invalid parameter value !!");
      }
    }else {
      alert("Invalid request !!");
    }
  }

  //window.location.replace(website_homepage);
  function check_list_dict(list_dict, key) {
    for (var i = 0; i < list_dict.length; i++) {
      if(key in list_dict[i]){
        return i;
      }
    }
    return -1;
  }
}



function last_report(data_url,format) {

  $.ajax({
      type: "GET",
      url: data_url,
      dataType: "json",
      async: false,
      success: function(data) {

        var res = null
        var items = data["items"];
        if (items.length > 0) {
          res = items[0]["link"]
        }

        if (res == null) {
          alert("Error !");
        }else {
          Reflect.apply(my_config["format"][format].handler,undefined,[res]);
        }

      }
   });
}

function handle_html(res) {
  window.location.replace(res);
}

function handle_csv(res) {

}

function handle_json(res) {

}
