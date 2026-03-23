setInterval(() => {
  document.getElementById("currentTime").innerText = Math.floor(
    Date.now() / 1000
  );
  document.getElementById("currentTimeDisplay").innerText = Date();
}, 200);

const parseDay = (i) => {
  if (i === 1) return "Mon";
  else if (i === 2) return "Tue";
  else if (i === 3) return "Wen";
  else if (i === 4) return "Thu";
  else if (i === 5) return "Fri";
  else if (i === 6) return "Sat";
  else return "Sun";
};

const parseMonth = (i) => {
  if (i === 0) return "Jan";
  else if (i === 1) return "Feb";
  else if (i === 2) return "Mar";
  else if (i === 3) return "Apr";
  else if (i === 4) return "May";
  else if (i === 5) return "Jun";
  else if (i === 6) return "Jul";
  else if (i === 7) return "Aug";
  else if (i === 8) return "Sep";
  else if (i === 9) return "Oct";
  else if (i === 10) return "Nov";
  else return "Dec";
};

document.getElementById("loadTime").onclick = () => {
  const time = document.getElementById("customTime").value;
  const dt = new Date(time * 1000);

  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const seconds = dt.getSeconds();
  const month = dt.getMonth();
  const day = dt.getDay();
  const mDay = dt.getDate();
  const year = dt.getFullYear();

  const formattedTime = `${parseDay(parseInt(day))} ${parseMonth(
    parseInt(month)
  )} ${mDay} ${year} ${hours}:${minutes}:${seconds}`;

  document.getElementById("timeDisplay").innerText = formattedTime;
};
