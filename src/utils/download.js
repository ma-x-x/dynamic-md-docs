/**
 * 下载文件
 * @param { string } uri 下载内容
 * @param { string } fileName 文件名称
 */
export function downloadFile(uri, fileName) {
  //通过创建a标签实现
  var link = document.createElement("a");
  link.href = uri;
  //对下载的文件命名
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
