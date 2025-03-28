"use client"

import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <div className="rounded-lg border shadow-md p-4 bg-white dark:bg-gray-900">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-between items-center pb-2 border-b dark:border-gray-700",
          caption_label: "text-lg font-semibold text-gray-900 dark:text-gray-100",
          nav: "flex items-center gap-2",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          ),
          nav_button_previous: "ml-2",
          nav_button_next: "mr-2",
          table: "w-full border-collapse",
          head_row: "flex text-gray-700 dark:text-gray-300",
          head_cell: "w-10 h-10 flex items-center justify-center text-sm font-medium",
          row: "flex",
          cell: "w-10 h-10 flex items-center justify-center text-sm relative",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "w-10 h-10 p-0 font-medium text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          ),
          day_selected:
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
          day_today: "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
          day_outside: "text-gray-400 dark:text-gray-500",
          day_disabled: "text-gray-300 dark:text-gray-600 cursor-not-allowed",
          day_range_middle: "bg-blue-200 dark:bg-blue-800 text-gray-900 dark:text-gray-100",
          ...classNames,
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-5 w-5" />,
          IconRight: () => <ChevronRight className="h-5 w-5" />,
        }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
