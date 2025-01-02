import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
export const PaginationSection = ({...props}) => {
    return <div className="flex justify-end mt-5 items-center" {...props}>
        <div className="flex items-center">
            <div className="flex w-1/2 gap-2 items-center">
                <p className="text-[.9rem] w-[6.5rem] font-light">Rows per page</p>
                <Button variant="outline" className="">
                    <span>10</span>
                    <ChevronDown className="ml-1" />
                </Button>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
}