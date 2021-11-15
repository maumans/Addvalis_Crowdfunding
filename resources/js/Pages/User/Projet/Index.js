import React, {useState,useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import {Link, useForm} from "@inertiajs/inertia-react";
 import Swal from 'sweetalert2'

export default function Index({auth,errors,projets,success}) {

    useEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success])

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            active={"projets"}
        >

           <div className={"mb-64"}>
              <div className="md:ml-10 md:justify-start ml-0 flex justify-center">
                  <div data-aos={"zoom-in"} className={"my-8 md:text-3xl text-2xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                      <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                          Mes projets
                      </div>
                  </div>
              </div>
               <div className={"projetfont grid md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-2 mx-10 mb-10"}>
                       {
                           projets.map((p)=>(
                                   <div key={p.id} className={"my-10 bg-black min-w-full min-h-full overflow-hidden"} style={{maxHeight:400}}>
                                       <div className={"absolute z-10 text-white bg-black p-2"}>
                                           {
                                               p.etat==="valide"?"validé":"en attente"
                                           }
                                       </div>
                                       <Link href={route("user.projet.show",[auth.user.id,p?.id])}>
                                           <div className={"text-center relative h-full"}>

                                               <img src={p?.image} alt="" style={{objectFit:"cover"}} className={"h-full w-full transform hover:scale-110 transition duration-300"}/>
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
