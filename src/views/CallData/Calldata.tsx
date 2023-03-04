import React from 'react';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import navigation from "menu-items";
import { IconChevronRight } from "@tabler/icons";
import Index from "./index"

 


const Calldata = ():JSX.Element => {

    return (
        <div>
            <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
            
            <Index />
        </div>
    );
};

export default Calldata;