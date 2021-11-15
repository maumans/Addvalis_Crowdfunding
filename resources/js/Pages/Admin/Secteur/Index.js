import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: "center"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center"
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

function Index({success,auth,secteurs}) {

    useLayoutEffect(()=>{
            success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
        setData({"libelle":""})
    },[success,secteurs])

    const [secteurSelect,setSecteurSelect] =useState(null)
    const [data,setData] =useState({
        "libelle":""
    })
    const [dataAdd,setDataAdd] =useState({
        "libelle":""
    })

    const textFieldEl=useRef(null)

    function handleSubmit(e){
        e.preventDefault();
        Inertia.post(route("admin.secteur.store",auth.user.id),dataAdd)
    }

    useEffect(()=>{
        secteurSelect && console.log(textFieldEl.current)
    },[secteurSelect])

    return (
        <Panel
            auth={auth}
            success={success}
            active={"secteur"}
            sousActive={"listeSecteurs"}

        >
            <div className="flex flex-col space-y-5">
                <div className={"flex justify-center"}>
                    <form onSubmit={handleSubmit}>
                        <TextField onChange={(e)=> setDataAdd({"libelle":e.target.value})} variant={"standard"} label={"ajouter un secteur"}/>
                        <button type={"submit"} className={"text-white rounded bg-indigo-600 p-2 font-bold"}>
                            Ajouter
                        </button>
                    </form>
                </div>
                <TableContainer  className={"flex justify-center w-full"}>
                    <Table sx={{ maxWidth: 650}} className={"border border-indigo-600 rounded"} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Libelle</StyledTableCell>
                                <StyledTableCell hidden={!secteurSelect} align="right"></StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {secteurs.map((s) => (
                                <StyledTableRow
                                    key={s.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {s.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{s.libelle}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div hidden={s.id!==secteurSelect?.id}>
                                            <TextField inputRef={textFieldEl} value={data.libelle} onChange={(e)=>setData({"libelle":e.target.value})} variant="standard"/>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className={"flex space-x-1 w-full justify-center"}>
                                            <button onClick={()=>confirm("Voulez-vous supprimer ce secteur") && Inertia.delete(route("admin.secteur.destroy",[auth.user.id,s?.id]),{preserveScroll:true})} className={"rounded bg-red-600 p-2"}>
                                                <DeleteIcon className={"text-white"}/>
                                            </button>
                                            <button hidden={secteurSelect && s.id===secteurSelect?.id} onClick={()=>{
                                                setSecteurSelect(s)
                                                setData({"libelle":s.libelle})

                                            }}  className={"rounded bg-indigo-600 p-2"}>
                                                <EditIcon className={"text-white"}/>
                                            </button>
                                            <button onClick={()=>{
                                                setSecteurSelect(null)
                                                Inertia.patch(route("admin.secteur.update",[auth.user.id,s.id]),data,{preserveScroll:true})
                                            }}
                                                    hidden={!secteurSelect || s.id!==secteurSelect?.id} className={"rounded bg-green-600 p-2"}>
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
