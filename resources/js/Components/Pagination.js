import React, {Component, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';

function Paginations({list,perPage,content,lv}) {

    const [st,setSt]=useState({
        page: 0,
    });


    function handlePageClick(e){
        let page = e.selected;
        setSt((st)=>({
            ...st,
            page
        }))
    }
    const {page} = st;
    let items = list.slice(page * perPage, (page + 1) * perPage);

    let pagesCount=Math.ceil(list.length/perPage)

    return (
        list.length!==0?
            <div className={"justify-center"}>
                {
                    items.length>0
                        ?content(items)
                        :setSt({page:page-1})
                }
                {
                    list.length>perPage?
                        <div className={"relative"} style={{bottom:10}}>
                            <ReactPaginate
                                previousLabel={'precedant'}
                                nextLabel={'suivant'}
                                pageCount={pagesCount}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                forcePage={page}
                            />
                        </div>
                        :""
                }
            </div>
            :
            <div className={"text-center"} style={{marginTop:300}}>{lv&&lv}</div>

    );
}

export default Paginations;
