import React from 'react';
import Panel from "@/Layouts/Admin/Panel";


function Index({success,auth,secteurs}) {
    return (
        <Panel
            auth={auth}
            success={success}
            active={"secteur"}
            sousActive={"listeSecteurs"}
        >


        </Panel>
    );
}

export default Index;
