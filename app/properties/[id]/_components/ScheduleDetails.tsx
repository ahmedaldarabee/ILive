import React, { useState } from 'react'
import {Dialog, DialogContent,DialogHeader,DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar"
import { CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';
import { format } from "date-fns";

interface IScheduleDetailsProps {
    property:{
        _id:string,
        title:string,
    } | any;
}

const ScheduleDetails = ({property}:IScheduleDetailsProps) => {
    
    const createViewing = useMutation(api.propertyViewings.createViewing);
    const {user} = useUser();
    
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    
    const [selectedTime,setSelectedTime] = useState("");

    const [availableTimes,setAvailableTimes] = useState([
        '09:00am', '09:30am', '10:00am', '10:30am', '11:00am', '11:30am',
        '12:00pm', '12:30pm', '13:00pm', '13:30pm', '14:00pm', '14:30pm',
        '15:00pm', '15:30pm', '16:00pm', '16:30pm', '17:00pm', '17:30pm'
    ]);

    const [isSubmitting,setIsSubmitting] = useState(false);

    const [message,setMessage] = useState("");

    const isDataDisabled = (date:Date) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        return date < today
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        if(!selectedDate || !selectedTime){
            toast.warning('Please complete schedule selection process!');
            return;
        }
        
        if(!user){
            toast.warning('Please signin for completion!');
            return;
        }

        setIsSubmitting(true);

        try {
            await createViewing({
                propertyId:property?._id,
                propertyTitle:property?.title,
                userEmail:user?.emailAddresses?.[0].emailAddress,
                userName:user?.fullName ?? undefined,
                userId:user?.id,
                viewingDate:format(selectedDate,"yyyy-MM-dd"),
                message:message,
                viewingTime: selectedTime,
            })
            toast.success('schedule meeting Soon...');
        } catch (error) {
            console.error(error);
        }finally{
            setIsSubmitting(false);
        }
    }

    if(isSubmitting){
        return (
            <div
                className='w-full h-screen flex items-center justify-center'
            > loading....</div>
        )
    }
    
    return (
        <div className=''>
            <Dialog>
                <DialogTrigger>
                    <div>
                        <Button className='contactDetailBtn'>schedule meeting</Button> 
                    </div>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Book view about {property?.title}?</DialogTitle>
                    </DialogHeader>
                    
                    <div className='w-full h-full'>
                        <div className=' my-6 w-full h-full'>
                            <form 
                            onSubmit={handleFormSubmit}
                            className=' space-y-4 justify-center flex-col flex items-center md:justify-between '
                            >
                                <div className='flex max-sm:flex-wrap justify-center items-center gap-4 md:gap-2'>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={isDataDisabled}
                                        className="rounded-lg border border-sky-600 cursor-pointer"
                                    />
                                    
                                    {/* Time selection */}
                                    <div className='space-y-2'>
                                        <div
                                            className='grid grid-cols-3 gap-4'
                                        >
                                            {
                                                availableTimes.map((time,idx) => (
                                                    <div key={idx}>
                                                        <Button
                                                            type='button'
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`${selectedTime == time ? "bg-black text-white":"bg-sky-600"} p-2 text-sm border  rounded-md transition-all duration-300 cursor-pointer hover:bg-sky-900`}
                                                        > {time} </Button>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>

                                {/* message */}
                                <div className='w-full space-y-4'>
                                    <label 
                                    className='block w-full text-xl font-medium capitalize '
                                    htmlFor="message">your message</label>
                                    <textarea
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target?.value)}
                                        className='focus:outline-sky-700 px-2 py-1 block w-full rounded-md border border-sky-600 cursor-pointer resize-none'
                                        name="message" id="message"></textarea>
                                </div>

                                {/* submit button */}
                                <div className=' w-full flex items-center justify-center'>
                                    <Button
                                        disabled={!selectedDate || !selectedTime}
                                        type='submit'
                                        className='contactDetailBtn'>
                                        {isSubmitting?"Sending...":"Schedule"}
                                        <CalendarCheck className='w-4 h-4' /> </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}                   

export default ScheduleDetails