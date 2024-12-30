"use client";

import CustomDialoHeader from '@/components/CustomDialoHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Layers2Icon } from 'lucide-react';
import React, { useState } from 'react'

function CreateWorkflowDialog({triggerText}:{triggerText?:string}) {
    const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "create workflow"}</Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialoHeader 
          icon={Layers2Icon}
          title="Create Workflow"
          subTitle="Start building your workflow"
          />
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog