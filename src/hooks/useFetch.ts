
import {useState,useEffect} from "react";

const useFetch=<T>(url:string)=>{
const [data, setData] = useState<T|null>(null);
const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(()=>{
 if (!url) return;
    const controller = new AbortController();
    setData(null);
    setError(null);
    setIsLoading(true);
  async function fetchData(){
try{
    setIsLoading(true);
const response=await fetch(url,{ signal: controller.signal,});

 if (!response.ok) {
          throw new Error("Network Response was not OK!!");
        }
        const result = await response.json();
        setData(result);
} catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err);
          }
        } else {
          setError(new Error("Unknown error"));
        }
      } 
finally{
setIsLoading(false);
}
  }

 if (url) {
      fetchData();
    }
      return () => {
      controller.abort();
    };
 },[url])
return{data,error,isLoading};
}
export default useFetch;