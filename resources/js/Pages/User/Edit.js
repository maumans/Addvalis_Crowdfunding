import React, {useEffect, useLayoutEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {Link, useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {TextareaAutosize, TextField} from "@mui/material";
import Swal from "sweetalert2";
import {maxWidth} from "@mui/system";

function Edit({auth,errors,biographie,success}) {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        biographie&&setValue('2')
    },[])

    const {data,setData} = useForm({
        "name":auth.user.name,
        "email":auth.user.email,
        "biographie":auth.user.biographie,
        "photoProfil":"",
        "prevPhotoProfil":auth.user.photoProfil
    })

    useLayoutEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[auth])

    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }



    useEffect(()=>{
        console.log(data.photoProfil,auth.user)
    })

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route("user.update",auth.user.id),{
            _method:"put",
            user:data
        });
    }

    return (
       <Authenticated
       auth={auth}
       >
           <div className={"flex justify-center"}>
               <div className={"flex flex-col font space-y-10 p-5"} style={{minWidth:200,width:1000}}>
                   <div data-aos={"zoom-in"} className={"my-8 md:col-span-3 sm:col-span-2 xs:col-span-1 font md:text-3xl text-2xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                       <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                           Paramètres
                       </div>
                   </div>
                       <div className="flex w-full mt-10">

                            <Box sx={{typography: 'body1',width:"100%" }}>
                                <TabContext value={value}>
                                   <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                                       <TabList onChange={handleChange} aria-label="lab API tabs example">
                                           <Tab label="Mon compte" value="1" />
                                           <Tab label="Modifier mon profil" value="2" />
                                       </TabList>
                                   </Box>
                                    <TabPanel value="1">
                                        <div>
                                            <div className={"mt-10"}>
                                                <div className={"font-bold"}>
                                                    Supprimer mon compte
                                                </div>
                                                <button onClick={()=> confirm("Voulez-vous vraiment supprimer votre compte?")&&Inertia.delete(route("user.destroy",auth.user.id))}className={"text-indigo-600"}>
                                                    Supprimer mon compte Addvalis Crowdfunding
                                                </button>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <form onSubmit={handleSubmit}>
                                        <TabPanel value="2">
                                            <div className={"flex flex-col items-center w-full space-y-5 mt-10"}>
                                               <div className={"w-full"}>
                                                   <TextField value={data.name} onChange={(e)=>setData("name",e.target.value)} className={"w-6/12 xs:w-full"} variant={"standard"} label="Nom complet" />
                                                   <div className={"text-red-600"}>
                                                       {errors["user.name"]}
                                                   </div>
                                               </div>
                                               <div className={"w-full"}>
                                                   <TextField value={data.email} onChange={(e)=>setData("email",e.target.value)} className={"w-6/12 xs:w-full"} variant={"standard"} label="Adresse mail" />
                                                   <div className={"text-red-600"}>
                                                       {errors["user.email"]}
                                                   </div>
                                               </div>

                                               <div className={"w-full"}>
                                                   <div className={"font-bold text-gray-600"} >
                                                       Photo de profil
                                                   </div>
                                                  <div className={"flex gap-5"}>
                                                      {
                                                          data.photoProfil?
                                                              <div className={"mt-2"}>
                                                                  {
                                                                      <img src={URL.createObjectURL(data.photoProfil)}  style={{maxHeight:200}} alt=""/>
                                                                  }
                                                              </div>
                                                              :
                                                              <div>
                                                                  <img  style={{maxHeight:200}} src={data.prevPhotoProfil} alt=""/>
                                                              </div>
                                                      }
                                                  </div>
                                                   <TextField
                                                       className={"w-full"}
                                                       type={"file"} onChange={e=>setData("photoProfil",e.target.files[0])}
                                                   />
                                                   <div className={"text-red-600"}>{errors["user.photoProfil"]}</div>
                                               </div>

                                               <div className={"w-full"}>
                                                   <div className={"font-bold text-gray-600"}>
                                                       Biographie
                                                   </div>
                                                   <TextareaAutosize autoFocus={biographie} value={data.biographie} className={"w-6/12 xs:w-full"} style={{height:100}} variant={"standard"} onChange={(e)=>setData("biographie",e.target.value)} placeholder="presentez-vous"/>
                                                   <div className={"text-red-600"}>
                                                       {errors?.biographie}
                                                   </div>
                                                   {
                                                       !errors.biographie &&
                                                       <div>
                                                           Faites court. Un texte de 300 caractères suffit pour votre profil !
                                                       </div>
                                                   }
                                               </div>
                                       </div>
                                        <button type={"submit"} className={"mt-10 text-white bg-indigo-600 hover:text-indigo-600 hover:bg-white border border-0 hover:border-indigo-600 p-2 transition duration-500"}>
                                            Enregistrer
                                        </button>
                                        </TabPanel>
                                    </form>

                                </TabContext>
                            </Box>
                        </div>

               </div>
          </div>
       </Authenticated>
    );
}

export default Edit;
