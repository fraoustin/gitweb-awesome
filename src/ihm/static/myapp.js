function getTyp(loc) {
    var typ = "";
    if ( loc.indexOf("a=summary") >= 0 ) {
        typ = "summary";
    } else if ( loc.indexOf("a=shortlog") >= 0 ) {
        typ = "shortlog";
    } else if ( loc.indexOf("a=log") >= 0 ) {
        typ = "log";
    } else if ( loc.indexOf("a=commitdiff") >= 0 ) {
        typ = "commitdiff";
    } else if ( loc.indexOf("a=commit") >= 0 ) {
        typ = "commit";
    } else if ( loc.indexOf("a=tree") >= 0 ) {
        typ = "tree";
    } else if ( loc.indexOf("a=tags") >= 0 ) {
        typ = "tags";
    } else if ( loc.indexOf("a=tag") >= 0 ) {
        typ = "tag";
    } else if ( loc.indexOf("a=heads") >= 0 ) {
        typ = "branchs";
    } else if ( loc.indexOf("a=search") >= 0 ) {
        typ = "search";
    } else if ( loc.indexOf("a=blob") >= 0 ) {
        typ = "blob";
    } else if ( loc.indexOf("a=history") >= 0 ) {
        typ = "history";
    } else if ( loc.indexOf("a=blobdiff") >= 0 ) {
        typ = "blobdiff";
    } else {
        var typ = "listproject";
    };
    return typ;
}; 

$(document).ready(function(){
    var typ = getTyp($(location).attr("href"));
    console.log(typ);
    
    // change format header
    $("div.page_header a")[0].remove();
    $("div.page_header").contents().each(function(){ if ( $(this)[0].nodeType == 3 ) { $(this).replaceWith(''); }; });
    if ( $("div.page_header a").length > 1 ) {
        $("div.page_header a")[0].remove();
    };
    $("div.page_header a").addClass('title-header');
    $("div.page_header a").addClass('orange');
    $("div.page_header").prepend('<i class="fa fa-search orange right"></i>');
    $("div.page_header").prepend('<a href="' + $(location).attr("protocol") + '//' + $(location).attr("hostname") + $(location).attr("pathname") + '"><i class="fa fa-git-square fa-lg orange"></i></a>');
    
    // change format of link rss
    $("a.rss_logo").prepend('<i class="fa fa-rss fa-lg orange"></i>');
    $("a.rss_logo").addClass('orange');
    
    // change format of branch and tag
    $("span.head").prepend('<i class="fa fa-code-fork fa-lg green"></i>');
    $("span.head a").addClass("green");
    $("span.tag").prepend('<i class="fa fa-tag fa-lg purple"></i>');
    $("span.tag a").addClass("purple");

    // hide form search
    $(".projsearch").addClass("hide");
    $(".search").addClass("hide");

    if ( typ == 'listproject' ) {
        $("table.project_list tr")[0].remove();
        $("table.project_list tr").each(function() {
            while ( $(this)[0].children.length > 2) {
                $(this)[0].children[2].remove();
            };
        });
    };

    if ( typ == 'summary' ) {
        // create tab nav
        $("div.page_nav").empty();
        $("div.title").remove();
        $("div.page_nav").append(document.createElement("table"));
        $("div.page_nav table").append("<tr></tr>");
        $("div.page_nav table tr").append('<td><a id="navtag" class="purple" href=""><i class="fa fa-tags fa-lg purple"></i>tag</a></td>');
        $("div.page_nav table tr").append('<td><a id="navbranch" class="green" href=""><i class="fa fa-code-fork fa-lg green"></i>branch</a></td>');
        $("div.page_nav table tr").append('<td><a id="navlog" class="blue" href=""><i class="fa fa-clock-o fa-lg blue"></i>log</a></td>');
        $("#navtag").attr("href", $(location).attr("href").replace("summary","tags"));
        $("#navbranch").attr("href", $(location).attr("href").replace("summary","heads"));
        $("#navlog").attr("href", $(location).attr("href").replace("summary","shortlog"));
        $("div.header").remove();
        $("table.tags").remove();
        $("table.heads").remove();

        // format metadata
        $("#metadata_desc td:first").empty();
        $("#metadata_desc td:first").append('<i class="fa fa-comments fa-lg"></i>');
        $("#metadata_owner td:first").empty();
        $("#metadata_owner td:first").append('<i class="fa fa-user fa-lg"></i>');
        $("#metadata_lchange td:first").empty();
        $("#metadata_lchange td:first").append('<i class="fa fa-calendar fa-lg"></i>');

        // add url git
        $(".projects_list").append('<tr><td><i class="fa fa-globe fa-lg"></i></td><td>'+ $(location).attr('protocol') + '//' + $(location).attr("host") + $(location).attr("pathname") + $(".title-header").text() +'</td></tr>')


    };

    if ( typ == 'shortlog' ) {
         $("div.page_nav").remove();
    };

    if ( typ in {'shortlog':'', 'summary':''} ) {
        // format table
        $(".shortlog tr").each( function() {
            if ( $(this).find("td").length > 1) {
                $(this).find("td:eq(2)").append('<br/><span class="comment"></span>');
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(0) i")[0]);
                $(this).find("td:eq(2) span:last").append(" by ");
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(1) a")[0]);
                $(this).append('<td id="download"><a href="' + $(this).find("td.link a:eq(3)").attr("href") + '"><i class="fa fa-download"></i></a></td>')
                $(this).append('<td id="code"><a href="' + $(this).find("td.link a:eq(2)").attr("href") + '"><i class="fa fa-code"></i></a></td>')
                $(this).find("td:eq(0)").remove();
                $(this).find("td:eq(0)").remove();
                $(this).find("td:eq(1)").remove();
            } else {
                $(this).remove();
            };
        });
        $("div.header").remove();
    };

    if ( typ == "tags" ) {
        $("div.header").remove();
        $("div.page_nav").remove();
        $(".tags tr").each( function() {
            $(this).find("td:eq(2)").append('<br/><span class="comment"></span>');
            $(this).find("td:eq(2) span:last").append($(this).find("td:eq(0) i")[0]);
            $(this).find("td:eq(1)").prepend('<i class="fa fa-tag fa-lg purple"></i>');
            $(this).find("td:eq(4)").remove();
            $(this).find("td:eq(3)").remove();
            $(this).find("td:eq(0)").remove();
            $(this).find("td:eq(1)").addClass("hundred");
            $(this).find("td:eq(0)").addClass("nowrap");
        }); 
    };

    if ( typ == "branchs" ) {
        $("div.page_nav").remove();
        $("div.header").remove();
        $(".heads tr").each( function() {
            $(this).find("td:eq(1)").append('<br/><span class="comment"></span>');
            $(this).find("td:eq(1) span:last").append($(this).find("td:eq(0) i")[0]);
            $(this).find("td:eq(1)").prepend('<i class="fa fa-code-fork fa-lg green"></i>');
            $(this).find("td:eq(0)").remove();
            $(this).find("td:eq(1)").remove();
        }); 
    };

    

    if ( typ in {"commit":"", "commitdiff":""} ) {
        $("div.page_nav").remove();
        $("table.object_header td:contains('author')").empty().append('<i class="fa fa-user fa-lg"></i>');
        $("table.object_header td:contains('committer')").empty().append('<i class="fa fa-user-o fa-lg"></i>');
        $("table.object_header td:contains('commit'):eq(0)").empty().append('<i class="fa fa-clock-o fa-lg"></i>');
        $("div.header a:eq(0)").append('<a id="tree" href="" class="right"><i class="fa fa-code fa-lg"></i></a>');
        $("div.header a:eq(0)").append('<a id="download" href="" class="right"><i class="fa fa-download fa-lg"></i></a>');
        $("#tree").attr('href',$("table.object_header a:contains('tree')").attr('href'));
        $("#download").attr('href',$("table.object_header a:contains('snapshot')").attr('href'));
        $("table.object_header td:contains('tree')").parent().remove();
        $("table.object_header td.link").contents().each(function(){ if ( $(this)[0].nodeType == 3 ) { $(this).replaceWith(''); }; });
        $("table.object_header td.link a:contains('commit')").remove();
        $("a:contains('diff')").empty().append('<i class="fa fa-copy fa-lg"></i>').addClass("right");
        $("a:contains('blob')").empty().append('<i class="fa fa-file-text fa-lg"></i>').addClass("right");
        $("a:contains('history')").empty().append('<i class="fa fa-history fa-lg"></i>').addClass("right");
        $("a:contains('patch')").empty().append('<i class="fa fa-cubes fa-lg"></i>').addClass("right");
        $("table.diff_tree").addClass("hundred");
        $("table.diff_tree td.link").contents().each(function(){ if ( $(this)[0].nodeType == 3 ) { $(this).replaceWith(''); }; });
        $("table.object_header").addClass("hundred");
    };

    if ( typ == "history" ) {
        $("div.page_nav").remove();
        $("table.history").addClass("hundred");
        $("table.history tr").each( function() {
            if ( $(this).find("td").length > 1) {
                $(this).find("td:eq(2)").append('<br/><span class="comment"></span>');
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(0) i")[0]);
                $(this).find("td:eq(2) span:last").append(" by ");
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(1) a")[0]);
                $(this).find("td:eq(0)").remove();
                $(this).find("td:eq(0)").remove();
                $("a:contains('blob')").empty().append('<i class="fa fa-file-text"></i>').addClass("right");
                $("a:contains('commitdiff')").empty().append('<i class="fa fa-copy"></i>').addClass("right");
                $("a:contains('diff to current')").empty().append('<i class="fa fa-clone"></i>').addClass("right");
                $(this).find("td:eq(0)").append($(this).find("td:eq(1) a"));
                $(this).find("td:eq(1)").remove();
            } else {
                $(this).remove();
            };
        });
    };


    if ( typ == "commitdiff" ) {
        if ( $(location).attr('href').indexOf('ds=sidebyside') == -1 ) {
            console.log($(location).attr('href') + ";ds=sidebyside")
            $(location).attr('href', $(location).attr('href') + ";ds=sidebyside");
        };
    };

    if ( typ == "blobdiff" ) {
        $("div.page_nav").remove();
        if ( $(location).attr('href').indexOf('ds=sidebyside') == -1 ) {
            $(location).attr('href', $(location).attr('href') + ";ds=sidebyside");
        };
    };

    if ( typ == "blob" ) {
        $("div.page_nav").remove();
    };

    if ( typ == "tree" ) {
        $("div.header a.title").append('<a id="snapshot" class="right" href=""><i class="fa fa-download fa-lg"></i></a>');
        $("#snapshot").attr('href', $("a:contains('snapshot')").attr('href'));
        $("div.page_nav").remove();
        $("td.link").contents().each(function(){ if ( $(this)[0].nodeType == 3 ) { $(this).replaceWith(''); }; });
        $("a:contains('blob')").empty().append('<i class="fa fa-file-text fa-lg"></i>').addClass("right");
        $("a:contains('history')").empty().append('<i class="fa fa-history fa-lg"></i>').addClass("right");
        $("a:contains('raw')").empty().append('<i class="fa fa-file fa-lg"></i>').addClass("right");
        $("a:contains('tree')").empty().append('<i class="fa fa-code-o fa-lg"></i>').addClass("right");
        
        $("table.tree").addClass("hundred");
        $("td.size").each( function() {
            if ( $(this).text() == '-' ) {
                $(this).empty();
                $(this).append('<i class="fa fa-folder-o fa-lg blue"></i>');
            } else if ($(this).parent().find("td:contains('..')").length == 1 ) {
                $(this).empty();
                $(this).append('<i class="fa fa-folder-o fa-lg"></i>');
            } else {
                $(this).empty();
                $(this).append('<i class="fa fa-file-o fa-lg green"></i>');
            };
        });
        $("table.tree tr").each( function() {
            $(this).find("td:eq(2) a").prepend($(this).find("td:eq(1) i"));
            $(this).find("td:eq(0)").remove();
            $(this).find("td:eq(0)").remove();
        });



    };

    $(".fa-search").click( function() {
         $(".projsearch").removeClass("hide");
         $(".search").removeClass("hide");
    });

    if ( typ == "search" ) {
        $("div.page_nav").remove();
        $("table.commit_search").addClass("hundred");
        $("table.commit_search tr").each( function() {
            if ( $(this).find("td").length > 1) {
                $(this).find("td:eq(2)").append('<br/><span class="comment"></span>');
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(0) i")[0]);
                $(this).find("td:eq(2) span:last").append(" by ");
                $(this).find("td:eq(2) span:last").append($(this).find("td:eq(1) a")[0]);
                $(this).find("td:eq(0)").remove();
                $(this).find("td:eq(0)").remove();
                $("a:contains('blob')").empty().append('<i class="fa fa-file-text"></i>').addClass("right");
                $("a:contains('commitdiff')").empty().append('<i class="fa fa-copy"></i>').addClass("right");
                $("a:contains('diff to current')").empty().append('<i class="fa fa-clone"></i>').addClass("right");
                $("a:contains('commit')").empty().append('<i class="fa fa-clock-o"></i>').addClass("right");
                $("a:contains('tree')").empty().append('<i class="fa fa-code"></i>').addClass("right");
                $(this).find("td:eq(0)").append($(this).find("td:eq(1) a"));
                $(this).find("td:eq(1)").remove();
                $(this).find("br").remove();
            } else {
                $(this).remove();
            };
        });
    };



});
