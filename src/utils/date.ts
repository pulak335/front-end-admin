import dayjs from "dayjs";

// DD-MMM-YY => (e.g. 06-Jun-22)
export function dateFormat(x: any) {
  if (typeof x !== "undefined" && x !== null) {
    return dayjs(x).format("DD-MMM-YY");
  } else {
    return "";
  }
}

export function dateFormatForIntVal({
  day = null,
  month = null,
  year = null,
}: {
  day?: any;
  month: any;
  year: any;
}) {
  const monthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const months = month.toString().replace(/^0+/, "");

  console.log(month, year);

  if (
    typeof day !== "undefined" &&
    day !== null &&
    typeof month !== "undefined" &&
    month !== null &&
    typeof year !== "undefined" &&
    year !== null
  ) {
    return (
      day +
      "-" +
      monthsList[parseInt(months, 10) - 1] +
      "-" +
      year.toString().substr(-2)
    );
  } else if (
    typeof month !== "undefined" &&
    month !== null &&
    typeof year !== "undefined" &&
    year !== null
  ) {
    return (
      monthsList[parseInt(months, 10) - 1] + "-" + year.toString().substr(-2)
    );
  } else {
    return "---";
  }
}
