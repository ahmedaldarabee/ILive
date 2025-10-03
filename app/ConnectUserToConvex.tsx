"use client"

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import React, { useEffect } from 'react'

export const ConnectUserToConvex = () => {

    const {user} = useUser();
    const updateUser = useMutation(api.users.updateUser);

    useEffect(() => {
        if(!user) return;

        const syncUser = async () => {
            try {
                await updateUser({
                    userId:user?.id,
                    name:user?.firstName ?? "", // that mean if null take ""
                    email:user?.primaryEmailAddress?.emailAddress ?? ""
                })
            } catch (error) {
                console.error(error);
            }
        }

        syncUser();
    },[user,updateUser]);

    return null;
}