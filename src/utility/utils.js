export function getImgSrcFrame(product){
    var imgSrc = "./static/img/productframes/"+ replaceAll(product," ","").toLowerCase() + "-medium-frame.jpg";
    //console.log(imgSrc);
    return imgSrc;
} 

export function replaceAll(str, search, replacement){
    var target = str;
    return target.split(search).join(replacement);
}
