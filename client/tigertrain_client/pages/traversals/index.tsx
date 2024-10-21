import { useEffect } from "react";
import { useRouter } from "next/router";

const TraversalsIndex = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, [router]);
};

export default TraversalsIndex;