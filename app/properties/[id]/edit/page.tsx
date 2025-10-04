import React from 'react'
import EditComponent from './_components/EditComponent'

const page = ({params}:{
    params:Promise<{id:string}>
}) => {
    return (
        <div className='container mx-auto w-full min-h-screen py-20'>
            <EditComponent params={params}/>
        </div>
    )
}

export default page