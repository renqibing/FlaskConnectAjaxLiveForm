$(document).ready(function(){

    $("#submit").click(function(){
        var countryname = $("#country").val();
        var seriesname = $("#series").val();
        var d2010 = $("#2010").val();
        var d2011 = $("#2011").val();
        var d2012 = $("#2012").val();
        var d2013 = $("#2013").val();
        var d2014 = $("#2014").val();

        $.post("/name", {"countryname": countryname, 'seriesname': seriesname, 'd2010': d2010,'d2011': d2011,'d2012': d2012,'d2013': d2013,'d2014': d2014}, function(data, status){
			// alert("countryname : " + data.countryname +  'seriesname : '+ data.seriesname );
        });

    });


    $("#jumpleft").click(function () {
        var first_page = document.getElementById("firstBtn");
        var first_id = first_page.innerHTML;
        first_id = parseInt(first_id,10);
        if (first_id == 1)
        {
            alert("Already reach the leftmost end!");
        }
        else
        {
            var start = first_id - 4;
            var btn_first = document.getElementById("firstBtn");
            btn_first.innerHTML = start;
            var btn_list = document.getElementsByName("mediumBtn");
            for (var i = 0; i < btn_list.length; i ++)
            {
                btn_list[i].innerHTML = start + i + 1;
            }
        }
    })

    $("#jumpright").click(function () {
        var first_page = document.getElementById("firstBtn");
        var first_id = first_page.innerHTML;
        first_id = parseInt(first_id,10);
        var end_page = document.getElementById("lastBtn");
        var end_id = end_page.innerHTML;
        end_id = parseInt(end_id,10);
        if(first_id + 4 > end_id)
        {
            alert("Already reach the rightmost end!");
        }
        else {
            var start = first_id + 4;
            var btn_first = document.getElementById("firstBtn");
            btn_first.innerHTML = start;
            var btn_list = document.getElementsByName("mediumBtn");
            for (var i = 0; i < btn_list.length; i ++)
            {
                btn_list[i].innerHTML = start + i + 1;
            }
        }
    })

    $(".btn.btn-default").click(function () {
        // var page_id = $(this).innerHTML;
        var page_id = this.innerHTML;
        page_id = parseInt(page_id,10);
        getPage(page_id);
    })

    function getPage(page_id){

        $.getJSON("/getpage/"+page_id,function(data){
            if(data.length > 0)
            {
                $("#createtable").empty();
                var table=$("<table class='table table-bordered table-hover' border='1' cellspacing='0'> </table>");
                table.appendTo($("#createtable"));
                // add table head into the table ; data is the dictionary
                var trh=$("<tr></tr>");
                trh.appendTo(table);
                console.log(data);
                for(var h=0; h<data[0].length; h++)
                {
                    var th = $("<th>" +data[0][h]+"</th>");
                    th.appendTo(trh);
                }

                for(var r=1; r<data.length; r++)
                {
                    var tr=$("<tr></tr>");
                    tr.appendTo(table);

                    for(var j=0;j<data[r].length;j++)
                    {
                        var td=$("<td>"+data[r][j]+"</td>");
                        td.appendTo(tr);
                    }
                }
            }
        });
        $.getJSON("/getlength",function (data) {
            var last_page = document.getElementById("lastBtn");
            console.log(data);
            var len = JSON.parse(data);
            var end = Math.ceil(len.length/5.0);
            last_page.innerHTML = end;
        });
    }
    getPage(1);
});
