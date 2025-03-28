import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-3 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-2 md:h-12 md:flex-row">
        <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Clockdown. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/terms" className="text-xs font-medium underline underline-offset-4 hover:text-primary">
            Terms
          </Link>
          <Link href="/about" className="text-xs font-medium underline underline-offset-4 hover:text-primary">
            About
          </Link>
          <Link href="/help" className="text-xs font-medium underline underline-offset-4 hover:text-primary">
            Help
          </Link>
        </div>
      </div>
    </footer>
  )
}

