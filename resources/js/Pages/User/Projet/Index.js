import React, {useState,useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Link, useForm} from "@inertiajs/inertia-react";

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export default function Index({auth,errors,projets}) {



    return (
        <Authenticated
            auth={auth}
            errors={errors}>

           <div className={"mb-60"}>
              <div data-aos={"zoom-in"} className={"self-start my-8 ml-10 md:text-3xl text-xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                  <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                      MES PROJETS
                  </div>
              </div>
               <div className={"projetfont grid md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-2 mx-10 mb-10"}>
                       {
                           projets.map((p)=>(
                                   <div key={p.id} className={"my-10 bg-black min-w-full min-h-full overflow-hidden"}>
                                       <Link href={route("user.projet.show",[auth.user.id,p?.id])}>
                                           <div className={"text-center relative h-full"}>

                                               <img src={p?.image} alt="" style={{objectFit:"cover"}} className={"h-full transform hover:scale-110 transition duration-300"}/>
                                               <div className={"absolute bottom-0 w-full bg-gradient-to-t from-black pb-5"}>
                                                   <div className={"bg-transparent"}>
                                                       <p data-aos="fade-up" data-aos-duration="1000">
                                                         <span className={" text-lg sm:text-xl md:text-2xl text-white border-2 border-indigo-600 p-2 "} >
                                                             <span className={"p-1 bg-transparent bg-indigo-600"}>
                                                                 {p?.titre}
                                                             </span>
                                                         </span>
                                                       </p>
                                                       <p className={"text-sm sm:text-sm md:text-lg text-white mt-5"} data-aos="flip-up" data-aos-delay="500" data-aos-duration="1000">{p?.description}</p>
                                                   </div>
                                               </div>
                                           </div>
                                           <div hidden={true}>
                                               {ReactHtmlParser(p.details)}
                                           </div>
                                       </Link>
                                   </div>
                               )
                           )
                       }
                   </div>

           </div>
        </Authenticated>
    );
}
