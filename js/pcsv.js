function populate_activity_container(fcsv, page, container, baseurl) {  
  $.ajax({
      url : fcsv,
      dataType: "text",
      success : function (fdata) {
        var json_data = $.csv.toObjects(fdata);
        var body_html = ``;
        var all_html_elems = ``;
        var gr_html_elem = "";
        var elem_html_elem = "";
        var prev_date_group = "";
        var count_gr_items = -1;
        
        $("#"+container).html("");
        $("#"+container).append(`<div id="allactivity"><div class="card"></div></div>`);
        json_data.forEach(function(entry) {
          //date_from,date_to,type,venue,place,role,venue_page,material
          
          function create_date(date_str) {
            //get date
            const index_months = {  "01": "January",  "02": "February",  "03": "March",  "04": "April",  "05": "May",  "06": "June",  "07": "July",  "08": "August",  "09": "September",  "10": "October",  "11": "November",  "12": "December"};
            var parts_date = date_str.split("/");
            const year = "";
            const month = "";
            const day = "";
            var res = []; 
            if (parts_date.length >= 1) {
              res.push(parts_date[0]);
            }
            if (parts_date.length >= 2) {
              res.push(index_months[parts_date[1]]);
            }
            if (parts_date.length >= 3) {
              res.push(parseInt(parts_date[2]));
            }
            return res;
          }
          
          
          var date_from = entry["date_from"];
          var date_to = entry["date_to"];
          var type = entry["type"].trim();
          var venue = entry["venue"].trim();
          var place = entry["place"].trim();
          var role = entry["role"].trim();
          var venue_page = entry["venue_page"];
          var material = entry["material"];
          
          //html of material
          var html_material = "";
          if (material != "") {
            var m_parts = material.split("_;;_");
            for (var i = 0; i < m_parts.length; i++) {
              var m_vals = m_parts[i].split("::");
              if (m_vals[1].startsWith("http")){
                m_vals[1] = "<a href='"+m_vals[1]+"'>"+m_vals[1]+"</a>";
              }
              html_material += "<div class='a-prop'><strong>"+m_vals[0]+"</strong>: "+m_vals[1]+"</div>";
            }
          }
          
          // date
          var g_date_from = create_date(date_from);
          var g_date_to = create_date(date_to);
          var g_date_id = g_date_to[0];
          // if the date is the same
          if (g_date_from.join("-") == g_date_to.join("-")) {
            g_date_html = g_date_to.reverse().join(" ");
          }else {
            // if the month is same
            if (((g_date_from.length >= 3)  && (g_date_to.length >= 3)) && ((g_date_from.slice(0,1).join(" ") == g_date_to.slice(0,1).join(" ")))) {
                g_date_html = g_date_from[2]+" - "+g_date_to[2]+", "+g_date_to.reverse().slice(-2).join(" ");
            }else {
                g_date_html = g_date_from.reverse().join(" ")+" - "+ g_date_to.reverse().join(" ");
            }  
          }
          
          if (g_date_id != prev_date_group) {
              if (count_gr_items != -1) {
                document.getElementById("heading_"+prev_date_group+"_count").innerHTML = " ("+count_gr_items+")";
              }
              count_gr_items = 0;
              gr_html_elem = `<div class="card-header" id="heading_`+g_date_id+`">`
                + `<button class="btn" data-toggle="collapse" data-target="#collapse_`+g_date_id+`" aria-expanded="true" aria-controls="collapse_`+g_date_id+`">`
                + `<h5><i class="bi bi-chevron-down" style="vertical-align: middle;"></i> <i>`+g_date_id+`</i> <span id="heading_`+g_date_id+`_count"></span></h5>`
                + `</button>`
                + `</div>` 
                + `<div id="collapse_`+g_date_id+`" class="collapse show" aria-labelledby="heading_`+g_date_id+`" data-parent="#allactivity">`
                + `<div class="card-body">`;
                + `</div>`;
                + `</div>`;
              prev_date_group = g_date_id;
              
              $("#allactivity .card").append(gr_html_elem);
          } 
          
          count_gr_items += 1;
          elem_html_elem = `<div class="an-entity">`
                    + `<div class="a-prop prop-date"><strong>`+ g_date_html + `</strong></div>` 
                    + `<div class="a-prop prop-venue"><i><span>`+ venue + `</span><span>, `+place+`</span></i></div>`
                    + `<div class="a-prop prop-role"><span><strong>Role: </strong></span><span>`+role+`</span></div>`
                    + `<div class="a-prop"><span><strong>Venue page: </strong></span><span><a href="`+venue_page+`">`+venue_page+`</a></span></div>`
                    + html_material
                    +`</div>`;
          
          $("#allactivity .card #collapse_"+g_date_id+" .card-body").append(elem_html_elem);          
        });
        // update last entry also
        document.getElementById("heading_"+prev_date_group+"_count").innerHTML = " ("+count_gr_items+")";
      }
    });
}


function build_from_csv(conf, target, isindex){
  if (target == "activity_org") {
    populate_activity_container(conf["baseurl"]+"content/activity_org.csv","activity","activity_list",conf["baseurl"]);
  }
  if (target == "activity_pre") {
    populate_activity_container(conf["baseurl"]+"content/activity_pre.csv","activity","activity_list",conf["baseurl"]);
  }
}
