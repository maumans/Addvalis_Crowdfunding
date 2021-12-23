import React, {useLayoutEffect} from 'react';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Inertia} from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Panel from "@/Layouts/Admin/Panel";
import { styled } from '@mui/material/styles';
import {tableCellClasses} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import LockOpenIcon from '@mui/icons-material/LockOpen';



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

function Index({success,utilisateurs,auth}) {
    useLayoutEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success,utilisateurs])
    return (
        <Panel
            auth={auth}
            success={success}
            active={"utilisateur"}
            sousActive={"listeUtilisateurs"}

        >

            <TableContainer  className={"flex justify-center w-full p-5"}>
                <Table sx={{ maxWidth: 650}} className={"border border-indigo-600 rounded"} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Nom complet</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            utilisateurs && utilisateurs.map((u) => (
                                <StyledTableRow
                                    key={u.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="right">{u.id}</StyledTableCell>
                                    <StyledTableCell align="right">{u.name}</StyledTableCell>
                                    <StyledTableCell align="right">{u.email}</StyledTableCell>
                                    <StyledTableCell align="right">{u.status}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className={"flex space-x-1 w-full justify-center"}>
                                            <button onClick={()=>confirm(`Voulez-vous ${u.status==="actif"? "bloquer":"debloquer"} ce utilisateur`) && Inertia.delete(route("admin.utilisateur.destroy",[auth.user.id,u?.id]))} className={`rounded text-white ${u.status==="actif"?" bg-red-600":"bg-green-600"}  p-2`}>
                                                {u.status==="actif"? <>
                                                    <DoNotDisturbIcon/> bloquer
                                                </> : <>
                                                    <LockOpenIcon/> debloquer
                                                </> }
                                            </button>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </Panel>
    );
}

export default Index;
