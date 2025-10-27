import React from "react";
import { AppSidebar } from "@/Components/app-sidebar";
import ThemeToggle from "@/Components/ThemeToggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { Separator } from "@/Components/ui/separator";

export default function DashboardLayout({ children, breadcrumb = [] }) {
    const { user } = usePage().props;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumb.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                                        <BreadcrumbItem className="hidden md:block">
                                            {item.url ? (
                                                <BreadcrumbLink href={item.url}>
                                                    {item.title}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="ml-auto px-4">
                        <ThemeToggle />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
