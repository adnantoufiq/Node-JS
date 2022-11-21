const getXOffset = (text, document) => {
    const xOffset = (document.internal.pageSize.width / 2) - (document.getStringUnitWidth(text) * document.internal.getFontSize() / 2);

    return xOffset;
}
module.exports={
    getXOffset
}