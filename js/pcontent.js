function update_nav(val, isindex) {
  var header_tag = document.getElementById('nav-placeholder');
  header_tag.innerHTML = header_tag.innerHTML.replace(/__baseurl__/g,val["baseurl"]);
}

function update_fixed_section(val, isindex) {
  var header_tag = document.getElementById('fixed_section');
  header_tag.innerHTML = header_tag.innerHTML.replace(/__baseurl__/g,val["baseurl"]);
}

function update_footer(val, isindex) {
  var footer_tag = document.getElementsByTagName('footer')[0];
  footer_tag.innerHTML = footer_tag.innerHTML.replace(/__baseurl__/g,val["baseurl"]);
  
  var class_var = "gen-page";
  if (isindex) {
    class_var = "home-page";
  }
  footer_tag.innerHTML = footer_tag.innerHTML.replace(/__class__/g,class_var);
}