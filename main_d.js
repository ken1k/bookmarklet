function getPointData(dom) {
    const result = [];

    const tbody = dom.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    for (const row of rows) {
        const dateTag = row.querySelectorAll("td")[0]
//        const nameTag = row.querySelector(".list__one__contents--name");
//       const pointTag = row.querySelector(".list__one__contents--info");
//        let pointIT = pointTag.innerText;
//        let action = "";
//        if(pointIT.match("期間限定") != null) {
//            action = "期間限定";
//        } else if(pointIT.match("ストア限定") != null) {
//            action = "ストア限定";
//        }
//        let point = pointIT.substr(0, pointIT.indexOf(' '));
        
        result.push(dateTag.innerText);
    }

    return result;
}

// ダウンロードするファイル情報
const fileName = 'pointDatad.csv';  // ダウンロードするファイル名
const delimiter = ',';  // 区切り文字
const header = ['日付'];  // CSVヘッダー
dataArray = getPointData(document);
alert(dataArray[0]);

    // CSVダウンロード
    dataArray.unshift(header);
    // "文字列"は引用符で囲う
    const dataStr = dataArray.map(arr => arr.map(s => (typeof s === "string") ? `"${s}"` : s).join(delimiter)).join('\n');
    // const dataStr = dataArray.map(arr => arr.map(s => (typeof s === "string") ? s.replaceAll("\n", "  ") : s).join(delimiter)).join('\n');  // 改行コードを含めない場合
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, dataStr], {type: "text/csv"});

    const downloadTag = document.createElement('a');
    downloadTag.download = fileName;
    downloadTag.href = URL.createObjectURL(blob);
    downloadTag.click();
    URL.revokeObjectURL(downloadTag.href);
