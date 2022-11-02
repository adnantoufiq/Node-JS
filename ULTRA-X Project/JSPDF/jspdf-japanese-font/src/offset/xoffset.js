const getXOffset = (text, doc) => {
  const xOffset =
    doc.internal.pageSize.width / 2 -
    (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / 2;

  return xOffset;
};

module.exports = {
  getXOffset,
};
