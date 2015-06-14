// ==UserScript==
// @name         Cleans up torbox.net torrentlisting page
// @namespace    http://pradyumnacster.wordpress.com/
// @version      0.1
// @description  A new rearranged  torbox.net
// @author       Pradyumna
// @match        http://torbox.net/*
// @grant        none
// ==/UserScript==


function filterTags(name){
   //separates tags from names
   //return format  : {name:<filtered_text>,tags:[tags]}
    
    var tags = [];
    var year = /[1-90]{4}/;
    var brackettags = /(\(|\[)[a-zA-Z1-90\s\-\+]+(\)|\])/g;
    var langtags = ["English","Hindi"];
    var formattags = ["1080p","pdvdrip","dvdrip","720p","480p","x264","hdrip","hdts","mp4","bluray","aac","dvdscrrip","avi","mp3","1cdrip","cdrip","xvid"];
    
    var tmatch = name.match(brackettags);
    name = name.replace(brackettags,"");
    
    tags = tags.concat(tmatch);
    
    ///*
    for (j in formattags){
        var re = new RegExp(formattags[j],"gi");
        if(name.match(re)){
              tags.push(name.match(re)[0]);
              name = name.replace(re,"");
        }
    };
    //*/
    
    //console.log(tags)
    
    
    var ret = {}
    ret.name = name;
    ret.tags = tags;
    return ret;
}

function cleanTorrentRows(){
    //get all torrent rows
    $(".newRow").each(function(i){
        var elm = $($(".newRow")[i]);
        category = elm.find("td.category").attr("title")
        name = elm.find("td.name a").text()
        inpeering = elm.find("td.inpeering span").attr("title")
        size = elm.find("td.size").text()
        seeders = elm.find("td.seeders").text()
        //action = $(i).find("td.action").text()
        
        fl = filterTags(name);
        console.log(name)
        elm.find("td.name a").text(fl.name)
    });
}

$(document).ready(function() {
    cont_width = $(".content").width();
    $(".left_col").hide();
    $(".right_col").hide();
    $(".footer").hide();
    $(".center_col").width(cont_width);
    
    //$("#more").click();
    $("table#results th:nth-child(1)").width("5%");
    $("table#results th:nth-child(2)").width("60%");
    $("table#results th:nth-child(3)").width("10%");
    $("table#results th:nth-child(4)").width("10%");
    $("table#results th:nth-child(5)").width("10%");
    $("table#results th:nth-child(6)").width("5%");
    
    
    setTimeout(cleanTorrentRows,2000); 
    
    
});

$("#more").click(function(e){
   setTimeout(cleanTorrentRows,2000); 
});
