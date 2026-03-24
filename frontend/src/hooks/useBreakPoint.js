import { useState, useEffect } from "react";

function useBreakPoint(minWidth) {
    const [matches, setMatches] = useState(
        () => window.matchMedia(`(min-width: ${minWidth}px)`).matches
    )

    useEffect(() => {
         const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
         const handleChange = (e) => setMatches(e.matches); 

         mediaQuery.addEventListener("change", handleChange); 
         return () => mediaQuery.removeEventListener("change", handleChange)
        
    }, [minWidth])

    return matches
    
}

export default useBreakPoint