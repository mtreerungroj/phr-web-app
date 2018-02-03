const convertDateFormat = inputDate => {
  let date = new Date(inputDate)
  if (!isNaN(date.getTime())) {
    return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear()
  }
}

export { convertDateFormat }
