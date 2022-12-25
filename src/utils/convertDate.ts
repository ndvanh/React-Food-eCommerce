export const convertDate = (time : string) => {
    const createdTime = new Date(time)
    const day = createdTime.getDate()
    const month = createdTime.getMonth() + 1
    const year = createdTime.getFullYear()
    return `${day}/${month}/${year}`
  }