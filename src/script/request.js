var website_homepage = "https://ivanhb.github.io/website/home.html"
var my_config = {
    //**  /request/
    'request': {
      //** /request/doc
      'doc':[
        {
          'data': "https://ivanhb.github.io/edu/index/diary.json",
          //param and value
          'param': "diary",
          'value': {
              'last': last_diary
          },
          'format': ["html", "text"]
        }
      ]
    }
}



function handle_url(str_url){
  var url = new URL(str_url);
  var fun_parts = {}
  for (var k_main in my_config) {
    if (str_url.includes(k_main)) {
      for (var k_type in my_config[k_main]) {
        if (str_url.includes(k_type)) {
          //is in config
          for (var i = 0; i < my_config[k_main][k_type].length; i++) {
            var param_obj = my_config[k_main][k_type][i]
            var param_value = url.searchParams.get(param_obj.param);
            if (param_value != null) {
              if (param_value in param_obj.value) {
                fun_parts['fun'] = param_obj.value[param_value];
                fun_parts['data'] = param_obj.data;
              }
            }
          }
        }
      }
    }
  }

  var format_value = url.searchParams.get("format");
  if (format_value != null){
    fun_parts['format'] = format_value;
  }

  //final check
  if ("fun" in fun_parts) {
    handle_req(fun_parts);
  }else {
    window.location.replace(website_homepage);
  }
}


function handle_req(fun_parts) {
  $.ajax({
      type: "GET",
      url: fun_parts["data"],
      dataType: "json",
      async: false,
      success: function(data) {
        var result = Reflect.apply(fun_parts["fun"],undefined,[data]);
        if ("format" in fun_parts) {
          result = handle_result(result, fun_parts["format"])
        }
      }
   });
}

function handle_result(result) {
}

function last_diary(diary_obj) {
  var items = diary_obj["items"];
  if (items.length > 0) {
    return items[0]["link"]
  }
  return -1;
}
