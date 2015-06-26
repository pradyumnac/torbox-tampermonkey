// ==UserScript==
// @name         Cleans up torbox
// @namespace    http://pradyumnacster.wordpress.com/
// @version      0.1
// @description  A new rearranged  torbox.net
// @author       Pradyumna
// @match        http://torbox.net/*
// @grant        none
// ==/UserScript==

function rowClick(i){
    //console.log(i);
    
    after = $("#afterdiv");
    if(after.attr("elemid")==i){
        //if already open just close it and return
        after.remove();
        $("#afterdivpic").remove();
        return
    }
    else {
        after.remove();
        $("#afterdivpic").remove();
        
        elem = $(".newRow#"+i);
        name = elem.find("td.name a").text();
        type = elem.find("td.category span").attr("title");

        //console.log(name);
        //console.log(type);

        if(type=="Video"){
            d  = getMovieDetails(name,"",elem,i);
            console.log("Movie details logic invoked");

        }
        
    }
}
function getMovieDetails(name,year,elem,i){
    //http://www.omdbapi.com/?t=The+ugly+truth&y=2009&plot=full&r=json
    //relies on open moview database api
    en_name = encodeURI(name);
    url = "http://www.omdbapi.com/?t="+en_name+"&y="+year+"&plot=full&r=json"
    
    $.get(url,function(data){
        console.log(data);
        if(data.Response=="True"){
            html ="<td colspan=3 id=\"afterdiv\" elemid="+i+"  > "+
                "<p class=\"movie_name movie_elem\"><b>Name:</b>"+data.Title+"("+data.Year+")</p>"+ 
                "<p class=\"release movie_elem\"><b>Released on:</b>"+data.Released+"("+data.Country+");</p><p class=\"genre movie_elem\"> <b >Genre:</b>"+data.Genre+"</p>"+
                "<p class=\"cast movie_elem\"><b>Actors:</b>"+data.Actors+"; </p><p class=\"director movie_elem\"><b>Director:</b>"+data.Director+"</p><p class=\"writer movie_elem\"><b>Writer:</b>"+data.Writer+"</p>"+
                "<p class=\"runtime movie_elem\"><b>Runtime:</b>"+data.Runtime+"</p>"+
                "<p class=\"imdb_rating movie_elem\"><b>IMDB rating:</b>"+data.imdbRating+" based out of <b>"+data.imdbVotes+"</b> votes</p>"+
                "<p class=\"Plot movie_elem\"><b>Plot:</b>"+data.Plot+"</p>"+
                "<p class=\"image_link  movie_elem\"><b>Image Link:</b><a href=\""+data.Poster+"\" target=\"_blank\">Click here</a></p>"+
                "</td>";
            elem.attr("vname",data.Title);
       
