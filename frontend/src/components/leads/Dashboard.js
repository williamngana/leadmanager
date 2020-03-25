import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';


export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <div className="card card-body mt-4 mb-4">
                <h1>Leads</h1>
                 <Leads />
            </div>
        </Fragment>
        )
}