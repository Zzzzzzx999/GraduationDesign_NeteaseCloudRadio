const mimeMap = {
    "0.001": "application/x-001",
    "0.323": "text/h323",
    "0.907": "drawing/907",
    ".acp": "audio/x-mei-aac",
    ".aif": "audio/aiff",
    ".aiff": "audio/aiff",
    ".asa": "text/asa",
    ".asp": "text/asp",
    ".au": "audio/basic",
    ".awf": "application/vnd.adobe.workflow",
    ".bmp": "application/x-bmp",
    ".c4t": "application/x-c4t",
    ".cal": "application/x-cals",
    ".cdf": "application/x-netcdf",
    ".cel": "application/x-cel",
    ".cg4": "application/x-g4",
    ".cit": "application/x-cit",
    ".cml": "text/xml",
    ".cmx": "application/x-cmx",
    ".crl": "application/pkix-crl",
    ".csi": "application/x-csi",
    ".cut": "application/x-cut",
    ".dbm": "application/x-dbm",
    ".dcd": "text/xml",
    ".der": "application/x-x509-ca-cert",
    ".dib": "application/x-dib",
    ".doc": "application/msword",
    ".drw": "application/x-drw",
    ".dwf": "Model/vnd.dwf",
    ".dwg": "application/x-dwg",
    ".dxf": "application/x-dxf",
    ".emf": "application/x-emf",
    ".ent": "text/xml",
    ".eps": "application/x-ps",
    ".etd": "application/x-ebx",
    ".fax": "image/fax",
    ".fif": "application/fractals",
    ".frm": "application/x-frm",
    ".gbr": "application/x-gbr",
    ".gif": "image/gif",
    ".gp4": "application/x-gp4",
    ".hmr": "application/x-hmr",
    ".hpl": "application/x-hpl",
    ".hrf": "application/x-hrf",
    ".htc": "text/x-component",
    ".html": "text/html",
    ".htx": "text/html",
    ".ico": "image/x-icon",
    ".iff": "application/x-iff",
    ".igs": "application/x-igs",
    ".img": "application/x-img",
    ".isp": "application/x-internet-signup",
    ".java": "java/*",
    ".jpe": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpg": "application/x-jpg",
    ".jsp": "text/html",
    ".lar": "application/x-laplayer-reg",
    ".lavs": "audio/x-liquid-secure",
    ".lmsff": "audio/x-la-lms",
    ".ltr": "application/x-ltr",
    ".m2v": "video/x-mpeg",
    ".m4e": "video/mpeg4",
    ".man": "application/x-troff-man",
    ".mdb": "application/msaccess",
    ".mfp": "application/x-shockwave-flash",
    ".mhtml": "message/rfc822",
    ".mid": "audio/mid",
    ".mil": "application/x-mil",
    ".mnd": "audio/x-musicnet-download",
    ".mocha": "application/x-javascript",
    ".mp1": "audio/mp1",
    ".mp2v": "video/mpeg",
    ".mp4": "video/mpeg4",
    ".mpd": "application/vnd.ms-project",
    ".mpeg": "video/mpg",
    ".mpga": "audio/rn-mpeg",
    ".mps": "video/x-mpeg",
    ".mpv": "video/mpg",
    ".mpw": "application/vnd.ms-project",
    ".mtx": "text/xml",
    ".net": "image/pnetvue",
    ".nws": "message/rfc822",
    ".out": "application/x-out",
    ".p12": "application/x-pkcs12",
    ".p7c": "application/pkcs7-mime",
    ".p7r": "application/x-pkcs7-certreqresp",
    ".pc5": "application/x-pc5",
    ".pcl": "application/x-pcl",
    ".pdf": "application/pdf",
    ".pdx": "application/vnd.adobe.pdx",
    ".pgl": "application/x-pgl",
    ".pko": "application/vnd.ms-pki.pko",
    ".plg": "text/html",
    ".plt": "application/x-plt",
    ".png": "application/x-png",
    ".ppa": "application/vnd.ms-powerpoint",
    ".pps": "application/vnd.ms-powerpoint",
    ".ppt": "application/x-ppt",
    ".prf": "application/pics-rules",
    ".prt": "application/x-prt",
    ".ps": "application/postscript",
    ".pwz": "application/vnd.ms-powerpoint",
    ".ra": "audio/vnd.rn-realaudio",
    ".ras": "application/x-ras",
    ".rdf": "text/xml",
    ".red": "application/x-red",
    ".rjs": "application/vnd.rn-realsystem-rjs",
    ".rlc": "application/x-rlc",
    ".rm": "application/vnd.rn-realmedia",
    ".rmi": "audio/mid",
    ".rmm": "audio/x-pn-realaudio",
    ".rms": "application/vnd.rn-realmedia-secure",
    ".rmx": "application/vnd.rn-realsystem-rmx",
    ".rp": "image/vnd.rn-realpix",
    ".rsml": "application/vnd.rn-rsml",
    ".rtf": "application/msword",
    ".rv": "video/vnd.rn-realvideo",
    ".sat": "application/x-sat",
    ".sdw": "application/x-sdw",
    ".slb": "application/x-slb",
    ".slk": "drawing/x-slk",
    ".smil": "application/smil",
    ".snd": "audio/basic",
    ".sor": "text/plain",
    ".spl": "application/futuresplash",
    ".ssm": "application/streamingmedia",
    ".stl": "application/vnd.ms-pki.stl",
    ".sty": "application/x-sty",
    ".swf": "application/x-shockwave-flash",
    ".tg4": "application/x-tg4",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".top": "drawing/x-top",
    ".tsd": "text/xml",
    ".uin": "application/x-icq",
    ".vcf": "text/x-vcard",
    ".vdx": "application/vnd.visio",
    ".vpg": "application/x-vpeg005",
    ".vsd": "application/x-vsd",
    ".vst": "application/vnd.visio",
    ".vsw": "application/vnd.visio",
    ".vtx": "application/vnd.visio",
    ".wav": "audio/wav",
    ".wb1": "application/x-wb1",
    ".wb3": "application/x-wb3",
    ".wiz": "application/msword",
    ".wk4": "application/x-wk4",
    ".wks": "application/x-wks",
    ".wma": "audio/x-ms-wma",
    ".wmf": "application/x-wmf",
    ".wmv": "video/x-ms-wmv",
    ".wmz": "application/x-ms-wmz",
    ".wpd": "application/x-wpd",
    ".wpl": "application/vnd.ms-wpl",
    ".wr1": "application/x-wr1",
    ".wrk": "application/x-wrk",
    ".ws2": "application/x-ws",
    ".wsdl": "text/xml",
    ".xdp": "application/vnd.adobe.xdp",
    ".xfd": "application/vnd.adobe.xfd",
    ".xhtml": "text/html",
    ".xls": "application/x-xls",
    ".xml": "text/xml",
    ".xq": "text/xml",
    ".xquery": "text/xml",
    ".xsl": "text/xml",
    ".xwd": "application/x-xwd",
    ".sis": "application/vnd.symbian.install",
    ".x_t": "application/x-x_t",
    ".apk": "application/vnd.android.package-archive",
    "0.301": "application/x-301",
    "0.906": "application/x-906",
    ".a11": "application/x-a11",
    ".ai": "application/postscript",
    ".aifc": "audio/aiff",
    ".anv": "application/x-anv",
    ".asf": "video/x-ms-asf",
    ".asx": "video/x-ms-asf",
    ".avi": "video/avi",
    ".biz": "text/xml",
    ".bot": "application/x-bot",
    ".c90": "application/x-c90",
    ".cat": "application/vnd.ms-pki.seccat",
    ".cdr": "application/x-cdr",
    ".cer": "application/x-x509-ca-cert",
    ".cgm": "application/x-cgm",
    ".class": "java/*",
    ".cmp": "application/x-cmp",
    ".cot": "application/x-cot",
    ".crt": "application/x-x509-ca-cert",
    ".css": "text/css",
    ".dbf": "application/x-dbf",
    ".dbx": "application/x-dbx",
    ".dcx": "application/x-dcx",
    ".dgn": "application/x-dgn",
    ".dll": "application/x-msdownload",
    ".dot": "application/msword",
    ".dtd": "text/xml",
    ".dwf": "application/x-dwf",
    ".dxb": "application/x-dxb",
    ".edn": "application/vnd.adobe.edn",
    ".eml": "message/rfc822",
    ".epi": "application/x-epi",
    ".eps": "application/postscript",
    ".exe": "application/x-msdownload",
    ".fdf": "application/vnd.fdf",
    ".fo": "text/xml",
    ".g4": "application/x-g4",
    ".tif": "image/tiff",
    ".gl2": "application/x-gl2",
    ".hgl": "application/x-hgl",
    ".hpg": "application/x-hpgl",
    ".hqx": "application/mac-binhex40",
    ".hta": "application/hta",
    ".htm": "text/html",
    ".htt": "text/webviewhtml",
    ".icb": "application/x-icb",
    ".ico": "application/x-ico",
    ".ig4": "application/x-g4",
    ".iii": "application/x-iphone",
    ".ins": "application/x-internet-signup",
    ".IVF": "video/x-ivf",
    ".jfif": "image/jpeg",
    ".jpe": "application/x-jpe",
    ".jpg": "image/jpeg",
    ".js": "application/x-javascript",
    ".la1": "audio/x-liquid-file",
    ".latex": "application/x-latex",
    ".lbm": "application/x-lbm",
    ".ls": "application/x-javascript",
    ".m1v": "video/x-mpeg",
    ".m3u": "audio/mpegurl",
    ".mac": "application/x-mac",
    ".math": "text/xml",
    ".mdb": "application/x-mdb",
    ".mht": "message/rfc822",
    ".mi": "application/x-mi",
    ".midi": "audio/mid",
    ".mml": "text/xml",
    ".mns": "audio/x-musicnet-stream",
    ".movie": "video/x-sgi-movie",
    ".mp2": "audio/mp2",
    ".mp3": "audio/mp3",
    ".mpa": "video/x-mpg",
    ".mpe": "video/x-mpeg",
    ".mpg": "video/mpg",
    ".mpp": "application/vnd.ms-project",
    ".mpt": "application/vnd.ms-project",
    ".mpv2": "video/mpeg",
    ".mpx": "application/vnd.ms-project",
    ".mxp": "application/x-mmxp",
    ".nrf": "application/x-nrf",
    ".odc": "text/x-ms-odc",
    ".p10": "application/pkcs10",
    ".p7b": "application/x-pkcs7-certificates",
    ".p7m": "application/pkcs7-mime",
    ".p7s": "application/pkcs7-signature",
    ".pci": "application/x-pci",
    ".pcx": "application/x-pcx",
    ".pdf": "application/pdf",
    ".pfx": "application/x-pkcs12",
    ".pic": "application/x-pic",
    ".pl": "application/x-perl",
    ".pls": "audio/scpls",
    ".png": "image/png",
    ".pot": "application/vnd.ms-powerpoint",
    ".ppm": "application/x-ppm",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pr": "application/x-pr",
    ".prn": "application/x-prn",
    ".ps": "application/x-ps",
    ".ptn": "application/x-ptn",
    ".r3t": "text/vnd.rn-realtext3d",
    ".ram": "audio/x-pn-realaudio",
    ".rat": "application/rat-file",
    ".rec": "application/vnd.rn-recording",
    ".rgb": "application/x-rgb",
    ".rjt": "application/vnd.rn-realsystem-rjt",
    ".rle": "application/x-rle",
    ".rmf": "application/vnd.adobe.rmf",
    ".rmj": "application/vnd.rn-realsystem-rmj",
    ".rmp": "application/vnd.rn-rn_music_package",
    ".rmvb": "application/vnd.rn-realmedia-vbr",
    ".rnx": "application/vnd.rn-realplayer",
    ".rpm": "audio/x-pn-realaudio-plugin",
    ".rt": "text/vnd.rn-realtext",
    ".rtf": "application/x-rtf",
    ".sam": "application/x-sam",
    ".sdp": "application/sdp",
    ".sit": "application/x-stuffit",
    ".sld": "application/x-sld",
    ".smi": "application/smil",
    ".smk": "application/x-smk",
    ".sol": "text/plain",
    ".spc": "application/x-pkcs7-certificates",
    ".spp": "text/xml",
    ".sst": "application/vnd.ms-pki.certstore",
    ".stm": "text/html",
    ".svg": "text/xml",
    ".tdf": "application/x-tdf",
    ".tga": "application/x-tga",
    ".tif": "application/x-tif",
    ".tld": "text/xml",
    ".torrent": "application/x-bittorrent",
    ".txt": "text/plain",
    ".uls": "text/iuls",
    ".vda": "application/x-vda",
    ".vml": "text/xml",
    ".vsd": "application/vnd.visio",
    ".vss": "application/vnd.visio",
    ".vst": "application/x-vst",
    ".vsx": "application/vnd.visio",
    ".vxml": "text/xml",
    ".wax": "audio/x-ms-wax",
    ".wb2": "application/x-wb2",
    ".wbmp": "image/vnd.wap.wbmp",
    ".wk3": "application/x-wk3",
    ".wkq": "application/x-wkq",
    ".wm": "video/x-ms-wm",
    ".wmd": "application/x-ms-wmd",
    ".wml": "text/vnd.wap.wml",
    ".wmx": "video/x-ms-wmx",
    ".wp6": "application/x-wp6",
    ".wpg": "application/x-wpg",
    ".wq1": "application/x-wq1",
    ".wri": "application/x-wri",
    ".ws": "application/x-ws",
    ".wsc": "text/scriptlet",
    ".wvx": "video/x-ms-wvx",
    ".xdr": "text/xml",
    ".xfdf": "application/vnd.adobe.xfdf",
    ".xls": "application/vnd.ms-excel",
    ".xlw": "application/x-xlw",
    ".xpl": "audio/scpls",
    ".xql": "text/xml",
    ".xsd": "text/xml",
    ".xslt": "text/xml",
    ".x_b": "application/x-x_b",
    ".sisx": "application/vnd.symbian.install",
    ".ipa": "application/vnd.iphone",
    ".xap": "application/x-silverlight-app",
    ".zip": "application/x-zip-compressed",
  }
  

function FormData(){
  let fileManager = wx.getFileSystemManager();
  let data = {};
  let files = [];

  this.append = (name, value)=>{
    data[name] = value;
    return true;
  }

  this.appendFile = (name, path)=>{
    let buffer = fileManager.readFileSync(path);
    if(Object.prototype.toString.call(buffer).indexOf("ArrayBuffer") < 0){
      return false;
    }
    files.push({
      name: name,
      buffer: buffer,
      fileName: getFileNameFromPath(path)
    });
    return true;
  }

  this.getData = ()=>convert(data, files)
}

function getFileNameFromPath(path){
  let idx=path.lastIndexOf("/");
  return path.substr(idx+1);
}

function convert(data, files){
  let boundaryKey = 'wxmpFormBoundary' + randString(); // 数据分割符，一般是随机的字符串
  let boundary = '--' + boundaryKey;
  let endBoundary = boundary + '--';

  let postArray = [];
  //拼接参数
  if(data && Object.prototype.toString.call(data) == "[object Object]"){
    for(let key in data){
      postArray = postArray.concat(formDataArray(boundary, key, data[key]));
    }
  }
  //拼接文件
  if(files && Object.prototype.toString.call(files) == "[object Array]"){
    for(let i in files){
      let file = files[i];
      postArray = postArray.concat(formDataArray(boundary, file.name, file.buffer, file.fileName));
    }
  }
  //结尾
  let endBoundaryArray = [];
  for (var i = 0; i < endBoundary.length; i++) { // 最后取出结束boundary的charCode
    endBoundaryArray.push(...endBoundary.utf8CodeAt(i));
  }
  postArray = postArray.concat(endBoundaryArray);
  return {
    contentType: 'multipart/form-data; boundary=' + boundaryKey,
    buffer: new Uint8Array(postArray).buffer
  }
}

function randString() {
  let res = "";
  for (let i = 0; i < 17; i++) {
    let n = parseInt(Math.random() * 62);
    if (n <= 9) {
      res += n;
    }
    else if (n <= 35) {
      res += String.fromCharCode(n + 55);
    }
    else {
      res += String.fromCharCode(n + 61);
    }
  }
  return res;
}

function formDataArray(boundary, name, value, fileName){
  let dataString = '';
  let isFile = !!fileName;

  dataString += boundary + '\r\n';
  dataString += 'Content-Disposition: form-data; name="' + name + '"';
  if (isFile){
    dataString += '; filename="' + fileName + '"' + '\r\n';
    dataString += 'Content-Type: ' + getFileMime(fileName) + '\r\n\r\n';
  }
  else{
    dataString += '\r\n\r\n';
    dataString += value;
  }

  var dataArray = [];
  for (var i = 0; i < dataString.length; i++) { // 取出文本的charCode（10进制）
    dataArray.push(...dataString.utf8CodeAt(i));
  }

  if (isFile) {
    let fileArray = new Uint8Array(value);
    dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
  }
  dataArray.push(..."\r".utf8CodeAt());
  dataArray.push(..."\n".utf8CodeAt());

  return dataArray;
}

function getFileMime(fileName){
  let idx = fileName.lastIndexOf(".");
  let mime = mimeMap[fileName.substr(idx)];
  return mime?mime:"application/octet-stream"
}

String.prototype.utf8CodeAt = function(i) {
  var str = this;
  var out = [], p = 0;
  var c = str.charCodeAt(i);
  if (c < 128) {
    out[p++] = c;
  } else if (c < 2048) {
    out[p++] = (c >> 6) | 192;
    out[p++] = (c & 63) | 128;
  } else if (
      ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
      ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
    // Surrogate Pair
    c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
    out[p++] = (c >> 18) | 240;
    out[p++] = ((c >> 12) & 63) | 128;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  } else {
    out[p++] = (c >> 12) | 224;
    out[p++] = ((c >> 6) & 63) | 128;
    out[p++] = (c & 63) | 128;
  }
  return out;
};


export default FormData;


