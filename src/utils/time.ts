// 封装一个时间函数：获取一个结果：上午|下午|晚上
export const getTime = () => {
  const currentHour = new Date().getHours()
  return currentHour < 12 ? '上午' : currentHour < 18 ? '下午' : '晚上'
}
