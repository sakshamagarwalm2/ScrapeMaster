"use client";

import CustomDialoHeader from '@/components/CustomDialoHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow';
import { Layers2Icon, Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  
 } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';

function CreateWorkflowDialog({triggerText}:{triggerText?:string}) {
    const [open, setOpen] = useState(false);

    const form = useForm<createWorkflowSchemaType>({
      resolver: zodResolver(createWorkflowSchema),
      defaultValues:{}
    })

    const {mutate, isPending}=useMutation({
      mutationFn: CreateWorkflow,
      onSuccess: ()=> {
        toast.success('Workflow created successfully', {id:"create-Workflow"});
      },
      onError: ()=> {
        toast.error('Failed to create workflow', {id:"create-workflow"});
      },
      
    });

    const onSubmit = useCallback((values: createWorkflowSchemaType)=>{
      toast.loading("Creating workflow...",{id:"create-workflow"});
      mutate(values);
    },[mutate]);

  return (
    <Dialog open={open} onOpenChange={(open)=>{
      form.reset();
      setOpen(open);
    }}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "create workflow"}</Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
          <CustomDialoHeader 
          icon={Layers2Icon}
          title="Create Workflow"
          subTitle="Start building your workflow"
          />
          <div className="p-6">
            <Form {...form}>
              <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name='name'
                render={({field})=>(
                  <FormItem>
                    <FormLabel className='flex gap-1 item-center'>Name
                      <p className="text-xs text-muted-foreground">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input{...field}/>
                    </FormControl>
                    <FormDescription>
                      Choose a Description and uniqe name
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )} />
                <FormField
                control={form.control}
                name='description'
                render={({field})=>(
                  <FormItem>
                    <FormLabel className='flex gap-1 item-center'>Discription
                      <p className="text-xs text-muted-foreground">(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className='resize-none' {...field}/>
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of your workflow
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )} />
                <Button type='submit' className='w-full' disabled={isPending}>
                  {!isPending && "Proceed"}
                  {isPending && <Loader2 className='animate-spin'/>}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog