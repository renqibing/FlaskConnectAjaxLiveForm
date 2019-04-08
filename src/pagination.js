window.onload = function ( ) {


var pageOptions = {pageTotal:10,curPage:7,paginationId:''};
dynamicPagingFunc(pageOptions);

function dynamicPagingFunc(pageOptions){
    var pageTotal = pageOptions.pageTotal || 1;
    var curPage = pageOptions.curPage||1;
    var doc = document;
    var paginationId = doc.getElementById(''+pageOptions.paginationId+'') || doc.getElementById('pagination');
    var html = '';
    var test = document.getElementById('pagination');

    if(curPage>pageTotal){
        curPage =1;
    }
    /*总页数小于5，全部显示*/
    if(pageTotal<=5){
        html = appendItem(pageTotal,curPage,html);
        paginationId.innerHTML = html;
    }
    /*总页数大于5时，要分析当前页*/
    if(pageTotal>5){
        if(curPage<=4){
            html = appendItem(pageTotal,curPage,html);
            paginationId.innerHTML = html;
        }else if(curPage>4){
            html = appendItem(pageTotal,curPage,html);
            paginationId.innerHTML = html;
        }
    }
}

function appendItem(pageTotal,curPage,html){
    var starPage = 0;
    var endPage = 0;

    html+='<a class="pageItem" id="prevBtn">&lt;</a>';

    if(pageTotal<=5){
        starPage = 1;
        endPage = pageTotal;
    }else if(pageTotal>5 && curPage<=4){
        starPage = 1;
        endPage = 4;
        if(curPage==4){
            endPage = 5;
        }
    }else{
        if(pageTotal==curPage){
            starPage = curPage-3;
            endPage = curPage;
        }else{
            starPage = curPage-2;
            endPage = curPage+1;
        }
        html += '<a class="pageItem" id="first">1</a><span class="over">...</span>';
    }

    for(let i = starPage;i <= endPage;i++){
        if(i==curPage){
            html += '<a class="active pageItem" id="first">'+i+'</a>';
        }else{
            html += '<a href="#" class="pageItem">'+i+'</a>';
        }
    }

    if(pageTotal<=5){
        html+='<a href="#" class="pageItem" id="nextBtn">&gt;</a>';
    }else{
        if(curPage<pageTotal-2){
            html += '<span class="over">...</span>';
        }
        if(curPage<=pageTotal-2){
            html += '<a href="#" class="pageItem">'+pageTotal+'</a>';
        }
        html+='<a href="#" class="pageItem" id="nextBtn">&gt;</a>';
    }
    return html;
}

}