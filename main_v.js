function getPointData(dom) {
    const result = [];

    const tbody = dom.querySelector("ul.list");
    const rows = tbody.querySelectorAll(".list__one");

    for (const row of rows) {
        const dateTag = row.querySelector(".list__one__date");
        const point = row.querySelector(".list__one__contents--info");
    
        result.push([dateTag.innerText, point.innerText]);
    }

    return result;
}

// ダウンロードするファイル情報
const fileName = 'pointDataV.csv';  // ダウンロードするファイル名
const delimiter = ',';  // 区切り文字
const header = ['日付', 'ポイント'];  // CSVヘッダー
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

