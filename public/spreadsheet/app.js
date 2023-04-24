const example = {
  name: "Example Sheet",
  description: "This spreadsheet is an example!",
  spreadsheet: [
    ["ID", "A", "B"],
    ["Value", "10", "4"],
    ["Color", "Red", "Blue"],
  ],
};

// {"spreadsheet": [["A", "B"], ["1", "2"]]}

const createCell = () => {
  const newItem = document.createElement("td");
  const input = document.createElement("textarea");
  input.cols = 5;
  input.rows = 1;
  newItem.appendChild(input);
  return newItem;
};

const importSheet = (sheetData) => {
  const data = JSON.parse(sheetData);
  const out = document.createElement("div");
  out.id = "sheet";

  document.getElementById("name").value = data.name;
  document.getElementById("description").value = data.description;

  if (!data.spreadsheet) {
    alert("Error: This is not a spreadsheet!");
    return;
  }

  data.spreadsheet.forEach((r) => {
    const row = document.createElement("tr");

    r.forEach((c) => {
      const col = createCell();
      col.children[0].value = c;

      row.appendChild(col);
    });

    out.appendChild(row);
  });

  return out;
};

const exportSheet = () => {
  const sheet = document.getElementById("sheet");
  const data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    spreadsheet: [],
  };

  for (let i = 0; i < sheet.children.length; i++) {
    const c = sheet.children[i];
    const newLine = [];
    for (let i = 0; i < c.children.length; i++)
      newLine.push(c.children[i].children[0].value);

    data.spreadsheet.push(newLine);
  }

  return data;
};

const addRow = () => {
  const newRow = document.createElement("tr");

  for (
    let i = 0;
    i < document.getElementById("sheet").children[0].children.length;
    i++
  )
    newRow.appendChild(createCell());

  document.getElementById("sheet").appendChild(newRow);
};

const addCol = () => {
  for (let i = 0; i < sheet.children.length; i++) {
    const col = sheet.children[i];

    col.appendChild(createCell());
  }
};

const removeRow = () => {
  rows = document.getElementById("sheet").children;
  rows[rows.length - 1].remove();
};

const removeCol = () => {
  for (let i = 0; i < sheet.children.length; i++) {
    const col = sheet.children[i];

    col.children[col.children.length - 1].remove();
  }
};

const importData = (data = undefined) => {
  if (!data) data = importSheet(prompt("Enter Spreadsheet Data:"));
  document.getElementById("sheet").remove();
  document.getElementById("sheetArea").prepend(data);
};

const exportData = () => {
  data = document.getElementById("data");
  data.value = JSON.stringify(exportSheet());

  data.select();
  data.setSelectionRange(0, 9999999);

  navigator.clipboard.writeText(data.value);

  alert("Exported To Clipboard!");
};

importData(importSheet(JSON.stringify(example)));
