import { React, useEffect, useState } from "react";
import Head from 'next/head'
import { getToken } from '../lib/auth'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const [token, setToken] = useState("")
    
    useEffect(()=>{
        if(!router.isReady) return;
        const token =  getToken(router.query.code).then(token=>setToken(token))
    }, [router.isReady]);

    useEffect(()=>{
        const query = window.location.search
        console.log(query)
    }, [])

    return (
        <div className="container">
            <Head>
                <title>Create batao App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                {JSON.stringify(token)}
            </main>

        </div>
    )
}
