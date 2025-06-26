const useLocalStorage = (keyName:string)=>{
    const getData = ()=> localStorage.getItem(keyName);
    const setData = (data: string | number)=> localStorage.setItem(keyName,data + '');
    return {getData, setData};
}

export default useLocalStorage;