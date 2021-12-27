import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTracking = () => {
   const location = useLocation()

   useEffect(() => {
    console.log(location.pathname)
    gtag('set', 'page_path', location.pathname);
    gtag('event', 'page_view');
   }, [location]);

}

export default useTracking;