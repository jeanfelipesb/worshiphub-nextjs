import { Loader2 } from "lucide-react"

export default function LoagingCustom1() {
    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-bp-4">
            <Loader2 className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4" />
        </div>
    );
}