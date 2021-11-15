import React, {useLayoutEffect, useState} from 'react';

import Panel from "@/Layouts/Admin/Panel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";

import TextField from "@mui/material/TextField"
import {maxWidth, minHeight} from "@mui/system";
import {TextareaAutosize} from "@mui/material";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: "center",
        maxWidth:100
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

function Index({success,auth,criteres}) {

    const [critereSelect,setCritereSelect] =useState(null)
    const [data,setData] =useState({
        "description":""
    })
    const [dataAdd,setDataAdd] =useState({
        "description":""
    })

    useLayoutEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
        setData({"description":""})
    },[success,criteres])

    function handleSubmit(e){
        e.preventDefault();
        Inertia.post(route("admin.critere.store",auth.user.id),dataAdd)
    }
    return (
        <Panel
            auth={auth}
            success={success}
            active={"critere"}
            sousActive={"listeCriteres"}
        >
            <div className="flex flex-col space-y-5">
                <div className={"flex justify-center"}>
                    <form onSubmit={handleSubmit}>
                       <div className="flex space-x-2">
                           <TextareaAutosize onChange={(e)=> setDataAdd({"description":e.target.value})} variant={"standard"} label={"ajouter un critere"}/>
                          <div>
                              <button type={"submit"} className={"text-white rounded bg-indigo-600 p-2 font-bold"}>
                                  Ajouter
                              </button>
                          </div>
                       </div>
                    </form>
                </div>
                <TableContainer  className={"flex justify-center w-full"}>
                    <Table sx={{ maxWidth: 650}} className={"border border-indigo-600 rounded"} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">description</StyledTableCell>
                                <StyledTableCell hidden={!critereSelect} align="right"></StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {criteres.map((s) => (
                                <StyledTableRow
                                    key={s.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {s.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{s.description}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div hidden={s.id!==critereSelect?.id}>
                                            <TextareaAutosize onBlur={()=>setCritereSelect(null)}  style={{ width: 150,minHeight:100 }} value={data.description} onChange={(e)=>setData({"description":e.target.value})} variant="standard"/>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className={"flex space-x-1 w-full justify-center"}>
                                            <button onClick={()=>confirm("Voulez-vous supprimer ce critere") && Inertia.delete(route("admin.critere.destroy",[auth.user.id,s?.id]),{preserveScroll:true})} className={"rounded bg-red-600 p-2"}>
                                                <DeleteIcon className={"text-white"}/>
                                            </button>
                                            <button hidden={critereSelect && s.id===critereSelect?.id} onClick={()=>{
                                                setCritereSelect(s)
                                                setData({"description":s.description})
                                            }}  className={"rounded bg-indigo-600 p-2"}>
                                                <EditIcon className={"text-white"}/>
                                            </button>
                                            <button onClick={()=>{
                                                setCritereSelect(null)
                                                Inertia.patch(route("admin.critere.update",[auth.user.id,s.id]),data,{preserveScroll:true})
                                            }}
                                                    hidden={!critereSelect || s.id!==critereSelect?.id} className={"rounded bg-green-600 p-2"}>
                                                <CheckIcon className={"text-white"}/>
                                            </button>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </Panel>
    );
}

export default Index;
