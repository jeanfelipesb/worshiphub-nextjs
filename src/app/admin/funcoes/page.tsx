'use client'
import LoagingCustom1 from "@/components/ui/loading";
import { useState, useEffect } from 'react';

export default function Page() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <LoagingCustom1 />
    }

    return (
        <div>Funções</div>
    );
}