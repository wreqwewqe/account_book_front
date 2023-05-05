const timestampToDate=(ts)=>{
    if(ts){
        const timestamp = ts*1000; // 时间戳，单位为毫秒

        const date = new Date(timestamp); // 创建日期对象

        const year = date.getFullYear(); // 获取年份
        const month = date.getMonth() + 1; // 获取月份（注意要加 1，因为月份是从 0 开始计算的）
        const day = date.getDate(); // 获取日期
        const hour = date.getHours(); // 获取小时数
        const minute = date.getMinutes(); // 获取分钟数
        const second = date.getSeconds(); // 获取秒数

        const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        return dateString
    }
}

export {timestampToDate}