"use client";

import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react';
import React from 'react'
import Logo from './Logo';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const routes = [
    {
        href: "",
        lable: "Home",
        icon: HomeIcon,
    },
    {
        href: "workflows",
        lable: "Workflows",
        icon: Layers2Icon,
    },
    {
        href: "crendentials",
        lable: "Credentials",
        icon: ShieldCheckIcon,
    },
    {
        href: "billing",
        lable: "Billing",
        icon: CoinsIcon,
    },
]

function DesktopSidebar() {
    const pathname = usePathname();
    const activeRoute = routes.find(
        (route)=> route.href.length>0 && pathname.includes(route.href) )|| routes[0];

  return (
    <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separete'>
        <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
            <Logo/>
        </div>
        <div className="">TODO Credits</div>
        <div className="flex flex-col p-2">
            {routes.map((routes) => (
                <Link
                key={routes.href}
                href={routes.href}
                className={buttonVariants({
                    variant: activeRoute.href === routes.href ? "sidebarActiveItem" : "sidebarItem",
                })}>
                    <routes.icon size={20}/>
                    {routes.lable}
                </Link>
            ))}
        </div>
    </div>
  )
}

export function MobileSidebar() {
    const [isOpen, setOpen] = React.useState(false);
    const pathname = usePathname();
    const activeRoute = routes.find(
        (route)=> route.href.length>0 && pathname.includes(route.href) )|| routes[0];

    return <div className='block border-separate bg-background md:hidden '>
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <MenuIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent className='w-[400px] sm:w-[540px] space-y-4'
            side={"left"}>
                <Logo/>
                <div className="flex flex-col gap-1">{routes.map((routes) => (
                <Link
                key={routes.href}
                href={routes.href}
                className={buttonVariants({
                    variant: activeRoute.href === routes.href ? "sidebarActiveItem" : "sidebarItem",
                })}
                onClick={()=>setOpen((prev)=>!prev)}
                >
                    <routes.icon size={20}/>
                    {routes.lable}
                </Link>
            ))}</div>
            </SheetContent>
        </Sheet>
    </div>;
}

export default DesktopSidebar