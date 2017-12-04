// 新建localStorage
const setItem = (key,val)=>{
    val = typeof(val) ==='object'?JSON.stringify(val):val;
    if (localStorage.hasOwnProperty(key)) {
        // console.error(`plese change key,the ${key} is existence`);
        localStorage[key] = val;
    } else {
       localStorage.setItem(key,val);
    }    
}

// 获取localStorage
const getItem = (key)=>{
    if (!localStorage.hasOwnProperty(key)) {
        console.error(`${key} is undefined`);
    } else {
       return localStorage.getItem(key);
    } 
}

//修改localStorage
const removeItem = (key)=>{
    if (!localStorage.hasOwnProperty(key)) {
        console.error(`${key} is undefined`);       
    } else {
       localStorage.removeItem(key)
    }    
}

// 清空localStorage
const clear = ()=>{
    localStorage.clear();
}
export default {setItem,getItem,removeItem,clear}