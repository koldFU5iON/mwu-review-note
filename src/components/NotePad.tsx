import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const NotePad = () => {
    return (
    <div className='flex flex-col w-lg space-y-2 m-2'>
        <Label htmlFor="note">Notes:</Label>
        <Input name="note" placeholder='tell us about the game'/>
        <div className="flex flex-row w-full justify-end">
        <Button>Submit</Button>

        </div>
      </div>)
}