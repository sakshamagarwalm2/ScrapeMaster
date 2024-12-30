"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react'

function CreateWorkflowDialog({triggerText}:{triggerText?:string}) {
    const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "create workflow"}</Button>
        </DialogTrigger>
    </Dialog>
  )
}

export default CreateWorkflowDialog