function createParentElement() {
    let card = document.createElement("div");
    card.classList.add("card", "mb-4");
  
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
  
    let rootRow = document.createElement("div");
    rootRow.classList.add("row");
    cardBody.appendChild(rootRow);
  
    let colLg10 = document.createElement("div");
    colLg10.classList.add("col-lg-10", "col-md-12");
    rootRow.appendChild(colLg10);
  
    let colLg2 = document.createElement("div");
    colLg2.classList.add("col-lg-2", "col-md-12");
    rootRow.appendChild(colLg2);
  
    let childRow = document.createElement("div");
    childRow.classList.add("row");
    colLg10.appendChild(childRow);
  
    let childColLg3a = document.createElement("div");
    childColLg3a.classList.add("col-lg-3", "col-md-6");
  
    let childColLg3b = document.createElement("div");
    childColLg3b.classList.add("col-lg-3", "col-md-6");
  
    let childColLg3c = document.createElement("div");
    childColLg3c.classList.add("col-lg-3", "col-md-6");
  
    let childColLg3d = document.createElement("div");
    childColLg3d.classList.add("col-lg-3", "col-md-6");
    childRow.append(childColLg3a, childColLg3b, childColLg3c, childColLg3d);
  
    let formGroup1 = document.createElement("div");
    formGroup1.classList.add("form-group");
    formGroup1.id = "form-group1";
    childColLg3a.appendChild(formGroup1);
  
    let formGroup2 = document.createElement("div");
    formGroup2.classList.add("form-group");
    formGroup2.id = "form-group2";
    childColLg3b.appendChild(formGroup2);
  
    let formGroup3 = document.createElement("div");
    formGroup3.classList.add("form-group");
    formGroup3.id = "form-group3";
    childColLg3c.appendChild(formGroup3);
  
    let formGroup4 = document.createElement("div");
    formGroup4.classList.add("form-group");
    formGroup4.id = "form-group4";
    childColLg3d.appendChild(formGroup4);
  
    let formGroup5 = document.createElement("div");
    formGroup5.classList.add("form-group");
    formGroup5.id = "form-group5";
    colLg2.appendChild(formGroup5);
  
    let filterBox = document.getElementById("filter-box");
    filterBox.appendChild(card);
  }
  
  function showBackdrop() {
    document.querySelector(".modal-backdrop").style.display = "block";
    document.body.classList.add("modal-open");
  }
  
  function hideBackdrop(e) {
    document.querySelector(".modal-backdrop").style.display = "none";
    document.body.classList.remove("modal-open");
    e.target.blur();
  }
  
  function onButtonClicked(e) {
    e.preventDefault();
    let driver = document.getElementById("select-driver").value;
    let withDriver = null;
    switch (driver) {
      case "Dengan Sopir":
        withDriver = true;
        break;
      case "Tanpa Sopir":
        withDriver = false;
        break;
    }
  
    let passenger = parseInt(document.getElementById("input-penumpang").value);
    if (isNaN(passenger)) {
      passenger = 0;
    }
    let date = document.getElementById("input-tanggal").value;
    let time = document.getElementById("input-jemput").value;
    let times = [0, 0];
    if (time !== "") {
      times = time.split(":").map((a) => parseInt(a));
    }
    let datetime = null;
    if (date !== "") {
      let dates = date.split("-").map((a) => parseInt(a));
      datetime = new Date(dates[0], dates[1], dates[2], times[0], times[1], 0);
    }
    onSearch({
      withDriver,
      passenger,
      datetime: datetime,
    });
  }
  