const convertToThaiDate = (date: Date | undefined) => {
  if (date !== undefined) {
    let day = date.getDate().toString();
    let month = date.getMonth();
    let monthName = "";
    switch (month) {
      case 0:
        monthName = "มกราคม";
        break;
      case 1:
        monthName = "กุมภาพันธ์";
        break;
      case 2:
        monthName = "มีนาคม";
        break;
      case 3:
        monthName = "เมษายน";
        break;
      case 4:
        monthName = "พฤษภาคม";
        break;
      case 5:
        monthName = "มิถุนายน";
        break;
      case 6:
        monthName = "กรกฎาคม";
        break;
      case 7:
        monthName = "สิงหาคม";
        break;
      case 8:
        monthName = "กันยายน";
        break;
      case 9:
        monthName = "ตุลาคม";
        break;
      case 10:
        monthName = "พฤศจิกายน";
        break;
      case 11:
        monthName = "ธันวาคม";
        break;
    }
    let year = (date.getFullYear() + 543).toString();
    return `${day} ${monthName} ${year}`;
  }else{
    return "วัน เดือน ปี"
  }
};

export default convertToThaiDate;
