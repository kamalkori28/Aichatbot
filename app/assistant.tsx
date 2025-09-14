"use client";

import React, { useState, useEffect } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sparkles, Moon, Sun } from "lucide-react";

export const Assistant = () => {
  const runtime = useChatRuntime();

  // Dark mode state: default true (dark on)
  const [darkMode, setDarkMode] = useState(true);

  // Load dark mode preference from localStorage (if any)
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(saved === "true");
    }
  }, []);

  // Apply/remove dark mode class on html element and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full pr-0.5 bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Area */}
          <SidebarInset>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white dark:bg-gray-800 px-4 shadow-sm">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Sparkles className="h-5 w-5 text-blue-500" />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage></BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Push toggle to right */}
              <div className="flex-grow" />

              {/* Dark Mode Toggle Button */}
              <Button
                variant="ghost"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle Dark Mode"
                className={`w-10 h-10 rounded-full transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {darkMode ? (
                  <Sun className="h-6 w-6 text-yellow-400" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-700" />
                )}
              </Button>
            </header>

            {/* Chat Thread */}
            <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
              <Thread />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
