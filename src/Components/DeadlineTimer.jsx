import { useEffect, useState } from "react";

export default function DeadlineTimer(prop){
    const deadline = prop.Deadline;
    const calculateTimeLeft = () => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const difference = deadlineDate - now;

        // Calculate days, hours, minutes, seconds left
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, difference };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {timeLeft.difference > 0 ? (
                <>
                    {timeLeft.days} Days : {timeLeft.hours} Hours : {timeLeft.minutes} Minutes : {timeLeft.seconds} Sec
                </>
            ) : (
                <h2>The deadline has passed!</h2>
            )}
        </>
    );
}